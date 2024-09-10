import Servicio from "../models/servicio.js";

const httpServicio = {
  //Get
  getTodo: async (req, res) => {
    try {
      const servicios = await Servicio.find().populate("idHotel");
      res.json(servicios);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Get by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const servicio = await Servicio.findById(id).populate("idHotel");
      if (!servicio) {
        res.status(404).json({ message: "Servicio no encontrado" });
      } else {
        res.json(servicio);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Get servicios by hotel
  getServiciosByHotel: async (req, res) => {
    try {
      const { idHotel } = req.params;
      const servicios = await Servicio.find({ idHotel }).populate("idHotel");
      res.json(servicios);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Post registro servicio
  crearServicio: async (req, res) => {
    try {
      const { nombre, idHotel } = req.body;

      const servicio = new Servicio({
        nombre,
        idHotel,
      });

      await servicio.save();

      res.json(servicio);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put editar servicio
  editarServicio: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, idHotel } = req.body;

      const servicio = await Servicio.findByIdAndUpdate(
        id,
        {
          nombre,
          idHotel,
        },
        { new: true }
      );

      res.json(servicio);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put activar servicio
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const servicio = await Servicio.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      res.json(servicio);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put inactivar servicio
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const servicio = await Servicio.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      res.json(servicio);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpServicio;
