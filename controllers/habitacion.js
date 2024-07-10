import Habitacion from "../models/habitacion.js";

const httpHabitacion = {
  //Get
  getTodo: async (req, res) => {
    try {
      const habitaciones = await Habitacion.find().populate("idHotel");
      res.json(habitaciones);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Get by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const habitacion = await Habitacion.findById(id).populate("idHotel");
      if (!habitacion) {
        res.status(404).json({ message: "Habitación no encontrada" });
      } else {
        res.json(habitacion);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Post registro habitación
  crearHabitacion: async (req, res) => {
    try {
      const {
        numero_habitacion,
        descripcion,
        tipo_habitacion,
        servicio,
        precio_noche,
        idHotel,
      } = req.body;

      const habitacion = new Habitacion({
        numero_habitacion,
        descripcion,
        tipo_habitacion,
        servicio,
        precio_noche,
        idHotel,
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
        servicio,
        precio_noche,
        idHotel,
      } = req.body;

      const habitacion = await Habitacion.findByIdAndUpdate(
        id,
        {
          numero_habitacion,
          descripcion,
          tipo_habitacion,
          servicio,
          precio_noche,
          idHotel,
        },
        { new: true }
      );

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
