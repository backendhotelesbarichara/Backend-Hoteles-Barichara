import Reserva from "../models/reserva.js";
import Habitacion from "../models/habitacion.js";
import dayjs from "dayjs";

const httpReserva = {
  //Get all reservas
  getTodo: async (req, res) => {
    try {
      const reservas = await Reserva.find()
        .populate("idHabitacion")
        .populate("idCliente");
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error });
      console.log(error);
    }
  },

  getReservasByHotelId: async (req, res) => {
    try {
      const HotelId = req.params.idHotel;
      const reservas = await Reserva.find()
        .populate({
          path: "idHabitacion",
          populate: {
            path: "idPiso",
            model: "Piso",
            match: { idHotel: HotelId },
          },
        })
        .populate("idCliente");
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

  //Get reserva by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const reserva = await Reserva.findById(id)
        .populate("idHabitacion")
        .populate("idCliente");
      if (!reserva) {
        res.status(404).json({ message: "Reserva no encontrada" });
      } else {
        res.json(reserva);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Post crear reserva
  crearReserva: async (req, res) => {
    try {
      const {
        fecha_entrada,
        fecha_salida,
        cantidad_noches,
        cantidad_adulto,
        cantidad_nino,
        costo_total,
        idHabitacion,
        idCliente,
      } = req.body;

      const reserva = new Reserva({
        fecha_entrada,
        fecha_salida,
        cantidad_noches,
        cantidad_adulto,
        cantidad_nino,
        costo_total,
        idHabitacion,
        idCliente,
      });

      await reserva.save();

      // Actualizar el atributo disponible de la habitación
      await Habitacion.findByIdAndUpdate(idHabitacion, { disponible: false });

      res.json(reserva);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put editar reserva
  editarReserva: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        fecha_entrada,
        fecha_salida,
        cantidad_noches,
        cantidad_adulto,
        cantidad_nino,
        edad_nino,
        costo_total,
        idHabitacion,
        idCliente,
      } = req.body;

      const reserva = await Reserva.findByIdAndUpdate(
        id,
        {
          fecha_entrada,
          fecha_salida,
          cantidad_noches,
          cantidad_adulto,
          cantidad_nino,
          edad_nino,
          costo_total,
          idHabitacion,
          idCliente,
        },
        { new: true }
      );

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
