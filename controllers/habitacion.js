import habitacion from "../models/habitacion.js";
import Habitacion from "../models/habitacion.js";

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

  //Post registro habitación
  crearHabitacion: async (req, res) => {
    try {
      const {
        numero_habitacion,
        descripcion,
        tipo_habitacion,
        imagen_principal,
        cantidad_personas,
        servicio,
        precio_noche,
        idPiso,
      } = req.body;

      const habitacion = new Habitacion({
        numero_habitacion,
        descripcion,
        tipo_habitacion,
        imagen_principal,
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
        imagen_principal,
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
          imagen_principal,
          imagenes,
          servicio,
          precio_noche,
          idPiso,
          disponible,
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
