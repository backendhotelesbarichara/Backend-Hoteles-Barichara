import Reserva from "../models/reserva.js";
import Hotel from "../models/hotel.js";
import Piso from "../models/piso.js";
import Habitacion from "../models/habitacion.js";
import Usuario from "../models/usuario.js";
import nodemailer from "nodemailer";
import dayjs from "dayjs";

const httpReserva = {
  //Get all reservas
  getTodo: async (req, res) => {
    try {
      const reservas = await Reserva.find().populate("idHabitacion");
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error });
      console.log(error);
    }
  },

  getReservasByHotelId: async (req, res) => {
    try {
      const HotelId = req.params.idHotel;
      const reservas = await Reserva.find().populate({
        path: "idHabitacion",
        populate: {
          path: "idPiso",
          model: "Piso",
          match: { idHotel: HotelId },
        },
      });
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error });
      console.log(error);
    }
  },

  getHabitacionesDisponibles: async (req, res) => {
    try {
      const { fecha_entrada, fecha_salida } = req.params;

      const fechaEntrada = dayjs(fecha_entrada);
      const fechaSalida = dayjs(fecha_salida);

      // Formatear fechas
      const fechaEntradaFormateada = fechaEntrada.format("YYYY-MM-DD");
      const fechaSalidaFormateada = fechaSalida.format("YYYY-MM-DD");

      const reservasIds = await Reserva.find({
        $or: [
          {
            fecha_entrada: { $lte: fechaSalidaFormateada },
            fecha_salida: { $gte: fechaEntradaFormateada },
          },
          {
            fecha_entrada: { $lte: fechaEntradaFormateada },
            fecha_salida: { $gte: fechaSalidaFormateada },
          },
        ],
      }).select("_id");

      const habitacionesDisponibles = await Habitacion.find({
        disponible: true,
        _id: { $not: { $in: reservasIds.map((id) => id._id) } },
      });

      res.json(habitacionesDisponibles);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findById(id).populate("idHabitacion");
      if (!reserva) {
        res.status(404).json({ message: "Reserva no encontrada" });
      } else {
        res.json(reserva);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getReservasByUser: async (req, res) => {
    try {
      // Obtener ID del usuario desde los parámetros de la solicitud
      const userId = req.params.idUsuario;

      // Paso 1: Buscar los hoteles asociados al usuario
      const hoteles = await Hotel.find({ idUsuario: userId });
      if (!hoteles.length) {
        return res.status(404).json({ message: "No se encontraron hoteles para el usuario." });
      }

      // Paso 2: Obtener los IDs de los hoteles
      const hotelIds = hoteles.map(hotel => hotel._id);

      // Paso 3: Buscar habitaciones asociadas a los pisos de los hoteles del usuario
      const habitaciones = await Habitacion.find({
        idPiso: {
          $in: await Piso.find({ idHotel: { $in: hotelIds } }).distinct('_id')
        }
      });

      // Paso 4: Obtener los IDs de las habitaciones
      const habitacionIds = habitaciones.map(habitacion => habitacion._id);

      // Paso 5: Buscar reservas asociadas a las habitaciones filtradas
      const reservas = await Reserva.find({ idHabitacion: { $in: habitacionIds } })
        .populate({
          path: 'idHabitacion',
          populate: {
            path: 'idPiso',
            populate: {
              path: 'idHotel', // Para incluir el detalle del hotel
              select: 'nombre'  // Opcional: seleccionar campos específicos del hotel
            }
          }
        });

      // Enviar la lista de reservas filtradas
      res.json(reservas);
    } catch (error) {
      console.error("Error al obtener reservas por usuario:", error);
      res.status(500).json({ error: "Error al obtener reservas" });
    }
  },

  //Post crear reserva
  crearReserva: async (req, res) => {
    try {
      const {
        nombre_cliente,
        cedula_cliente,
        telefono_cliente,
        correo_cliente,
        fecha_entrada,
        fecha_salida,
        cantidad_noches,
        cantidad_adulto,
        cantidad_nino,
        costo_total,
        mensaje,
        idHabitacion,
      } = req.body;

      const fechaEntrada = dayjs(fecha_entrada);
      const fechaSalida = dayjs(fecha_salida);

      // Formatear fechas
      const fechaEntradaFormateada = fechaEntrada.format("YYYY-MM-DD");
      const fechaSalidaFormateada = fechaSalida.format("YYYY-MM-DD");

      // Crear la reserva
      const reserva = new Reserva({
        nombre_cliente,
        cedula_cliente,
        telefono_cliente,
        correo_cliente,
        fecha_entrada: fechaEntradaFormateada,
        fecha_salida: fechaSalidaFormateada,
        cantidad_noches,
        cantidad_adulto,
        cantidad_nino,
        mensaje,
        costo_total,
        idHabitacion,
      });

      await reserva.save();

      // Obtener detalles de la habitación, hotel, y usuario de contacto
      const habitacion = await Habitacion.findById(idHabitacion).populate({
        path: "idPiso",
        populate: {
          path: "idHotel",
          populate: {
            path: "idUsuario", // Contact information for the hotel
          },
        },
      });

      if (
        !habitacion ||
        !habitacion.idPiso ||
        !habitacion.idPiso.idHotel ||
        !habitacion.idPiso.idHotel.idUsuario
      ) {
        return res.status(404).json({
          error:
            "No se encontró la habitación o los detalles del contacto del hotel",
        });
      }

      // Obtener correo del contacto del hotel (idUsuario)
      const contactoHotel = habitacion.idPiso.idHotel.idUsuario;
      const correoContactoHotel = contactoHotel.correo;

      // Configurar el transporte de nodemailer
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.userEmail,
          pass: process.env.password,
        },
      });

      // Correo al cliente
      const enviarCorreoCliente = {
        from: process.env.userEmail,
        to: correo_cliente,
        subject: `Confirmación de reserva - ${habitacion.idPiso.idHotel.nombre}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
            <div style="border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px; display: flex; align-items: center;">
            <h2 style="color: #E53935;">Confirmación de Reserva</h2>
          <div style="position: relative;">
            <div style="margin-left: 50px;">
            <img src="${
              habitacion.imagenes[0]?.url
            }" alt="Imagen de la habitación" 
             style="width: 150px; height: auto; border-radius: 8px; object-fit: cover;" />
           </div>
             </div>
          </div>
            <p>Gracias por reservar en nuestro hotel, ${nombre_cliente}.</p>
            <p>Detalles de tu reserva:</p>
            <ul>
              <li><strong>Fecha Entrada:</strong> ${fechaEntradaFormateada}</li>
              <li><strong>Fecha Salida:</strong> ${fechaSalidaFormateada}</li>
              <li><strong>Cantidad de Noches:</strong> ${cantidad_noches}</li>
              <li><strong>Adultos:</strong> ${cantidad_adulto}</li>
              <li><strong>Niños:</strong> ${cantidad_nino || "N/A"}</li>
              <li><strong>Mensaje:</strong> ${mensaje || "N/A"}</li>
              <li><strong>Costo Total:</strong> ${costo_total} COP</li>
            </ul>
            <p>En breves nos contactaremos contigo.</p>
          </div>
            </div>
        `,
      };

      // Correo al contacto del hotel
      const enviarCorreoContactoHotel = {
        from: process.env.userEmail,
        to: correoContactoHotel,
        subject: "Nueva reserva confirmada",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
            <div style="border-bottom: 1px solid #ddd; padding-bottom: 10px; margin-bottom: 20px; display: flex; align-items: center;">
            <h2 style="color: #E53935;">Nueva reserva confirmada para la ${
              habitacion.tipo_habitacion[0]
            }</h2>
              <div style="position: relative;">
                   <div style="margin-left: 50px;">
                  <img src="${
                    habitacion.imagenes[0]?.url
                  }" alt="Imagen de la habitación" 
                 style="width: 150px; height: auto; border-radius: 8px; object-fit: cover;" />
                 </div>
              </div>
                 </div>   
            <p>Detalles del cliente:</p>
            <ul>
              <li><strong>Nombre:</strong> ${nombre_cliente}</li>
              <li><strong>Cédula:</strong> ${cedula_cliente}</li>
              <li><strong>Teléfono:</strong> ${telefono_cliente}</li>
              <li><strong>Correo:</strong> ${correo_cliente}</li>
              <li><strong>Fecha Entrada:</strong> ${fechaEntradaFormateada}</li>
              <li><strong>Fecha Salida:</strong> ${fechaSalidaFormateada}</li>
              <li><strong>Cantidad de Noches:</strong> ${cantidad_noches}</li>
              <li><strong>Adultos:</strong> ${cantidad_adulto}</li>
              <li><strong>Niños:</strong> ${cantidad_nino || "N/A"}</li>
              <li><strong>Mensaje del cliente:</strong> ${mensaje || "N/A"}</li>
              <li><strong>Costo Total:</strong> ${costo_total} COP</li>
              <li><strong>Número Habitación:</strong> ${
                habitacion.numero_habitacion
              }</li>
            </ul>
          </div>
            </div>
        `,
      };

      // Enviar correos de forma asíncrona
      await Promise.all([
        transporter.sendMail(enviarCorreoCliente),
        transporter.sendMail(enviarCorreoContactoHotel),
      ]);

      // Devolver la reserva creada
      res.json(reserva);
    } catch (error) {
      console.error("Error al crear la reserva:", error);
      res.status(500).json({ error: error.message });
    }
  },

  //Put editar reserva
  editarReserva: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        nombre_cliente,
        cedula_cliente,
        telefono_cliente,
        correo_cliente,
        fecha_entrada,
        fecha_salida,
        cantidad_noches,
        cantidad_adulto,
        cantidad_nino,
        costo_total,
        mensaje,
        idHabitacion,
      } = req.body;

      const reserva = await Reserva.findByIdAndUpdate(
        id,
        {
          nombre_cliente,
          cedula_cliente,
          telefono_cliente,
          correo_cliente,
          fecha_entrada,
          fecha_salida,
          cantidad_noches,
          cantidad_adulto,
          cantidad_nino,
          costo_total,
          mensaje,
          idHabitacion,
        },
        { new: true }
      ).populate("idHabitacion");

      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put activar reserva
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put inactivar reserva
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpReserva;
