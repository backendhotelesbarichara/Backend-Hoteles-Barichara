import Habitacion from "../models/habitacion.js";
import Piso from "../models/piso.js";

const httpHabitacion = {
  //Get
  getTodo: async (req, res) => {
    try {
      const habitaciones = await Habitacion.find().populate("idPiso");
      res.json(habitaciones);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Get by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const habitacion = await Habitacion.findById(id).populate("idPiso");
      if (!habitacion) {
        res.status(404).json({ message: "Habitación no encontrada" });
      } else {
        res.json(habitacion);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getPorPiso: async (req, res) => {
    try {
      const { idPiso } = req.params;
      const habitacion = await Habitacion.find({ idPiso }).populate("idPiso");
      res.json(habitacion);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  getHabitacionesByHotel: async (req, res) => {
    const { idHotel } = req.params;
    try {
      const habitaciones = await Habitacion.find({
        idPiso: { $in: await Piso.find({ idHotel: idHotel }, { _id: 1 }) },
      });
      res.json(habitaciones);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error al obtener habitaciones" });
    }
  },

  getHabitacionesByHotelYCantidad: async (req, res) => {
    try {
      const { idHotel, cantidad_personas } = req.query; // Obtener idHotel y cantidad_personas desde query params

      // Verificar si el idHotel está presente
      if (!idHotel) {
        return res
          .status(400)
          .json({ message: "El id del hotel es requerido." });
      }

      // Obtener los pisos que pertenecen al hotel
      const pisos = await Piso.find({ idHotel }, { _id: 1 }); // Solo obtener los IDs de los pisos
      const pisoIds = pisos.map((piso) => piso._id); // Crear un array con los IDs de los pisos

      // Construir el filtro para habitaciones
      let query = {
        idPiso: { $in: pisoIds }, // Filtrar habitaciones que pertenezcan a esos pisos
      };

      // Agregar filtro por cantidad mínima de personas si está presente
      if (cantidad_personas) {
        query.cantidad_personas = { $gte: Number(cantidad_personas) }; // Filtro por cantidad mínima de personas
      }

      // Buscar las habitaciones que cumplen con los filtros
      const habitaciones = await Habitacion.find(query)
        .populate("idPiso")
        .exec();


      // Devolver las habitaciones encontradas
      res.status(200).json(habitaciones);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error al obtener habitaciones filtradas.", error });
    }
  },

  //Post registro habitación
  crearHabitacion: async (req, res) => {
    try {
      const {
        numero_habitacion,
        descripcion,
        tipo_habitacion,
        imagenes,
        cantidad_personas,
        servicio,
        precio_noche,
        idPiso,
      } = req.body;

      const habitacion = new Habitacion({
        numero_habitacion,
        descripcion,
        tipo_habitacion,
        imagenes,
        cantidad_personas,
        servicio,
        precio_noche,
        idPiso,
      });

      await habitacion.save();

      res.json(habitacion);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put editar habitación
  editarHabitacion: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        numero_habitacion,
        descripcion,
        tipo_habitacion,
        cantidad_personas,
        imagenes,
        servicio,
        precio_noche,
        idPiso,
        disponible,
      } = req.body;

      const habitacion = await Habitacion.findByIdAndUpdate(
        id,
        {
          numero_habitacion,
          descripcion,
          tipo_habitacion,
          cantidad_personas,
          imagenes,
          servicio,
          precio_noche,
          idPiso,
          disponible,
        },
        { new: true }
      ).populate("idPiso");

      res.json(habitacion);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put activar habitación
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const habitacion = await Habitacion.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      res.json(habitacion);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put inactivar habitación
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const habitacion = await Habitacion.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      res.json(habitacion);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpHabitacion;
