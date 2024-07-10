import Huesped from "../models/huesped.js";

const httpHuesped = {
  //Get
  getTodo: async (req, res) => {
    try {
      const huespedes = await Huesped.find();
      res.json(huespedes);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Get by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const huesped = await Huesped.findById(id);
      if (!huesped) {
        res.status(404).json({ message: "Huesped no encontrado" });
      } else {
        res.json(huesped);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Post registro huesped
  crearHuesped: async (req, res) => {
    try {
      const { nombre, apellido, cedula, telefono } = req.body;

      const huesped = new Huesped({
        nombre,
        apellido,
        cedula,
        telefono,
      });

      await huesped.save();

      res.json(huesped);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put editar huesped
  editarHuesped: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, apellido, cedula, telefono } = req.body;

      const huesped = await Huesped.findByIdAndUpdate(
        id,
        {
          nombre,
          apellido,
          cedula,
          telefono,
        },
        { new: true }
      );

      res.json(huesped);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put activar huesped
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const huesped = await Huesped.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      res.json(huesped);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put inactivar huesped
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const huesped = await Huesped.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      res.json(huesped);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpHuesped;
