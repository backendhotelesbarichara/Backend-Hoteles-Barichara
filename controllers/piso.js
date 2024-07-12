import Piso from "../models/piso.js";

const httpPiso = {
  //Get all pisos
  getTodo: async (req, res) => {
    try {
      const pisos = await Piso.find()
        .populate("idHotel")
      res.json(pisos);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Get piso by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const piso = await Piso.findById(id)
        .populate("idHotel")
      if (!piso) {
        res.status(404).json({ message: "Piso no encontrado" });
      } else {
        res.json(piso);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  getPorHotel: async (req, res) => {
    try {
      const { idHotel } = req.params;
      const piso = await Piso.find({ idHotel }).populate("idHotel");
      res.json(piso);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  //Post crear piso
  crearPiso: async (req, res) => {
    try {
      const {
        num_piso,
        idHotel,
      } = req.body;

      const piso = new Piso({
        num_piso,
        idHotel,
      });

      await piso.save();

      res.json(piso);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put editar piso
  editarPiso: async (req, res) => {
    try {
      const { id } = req.params;
      const {
        num_piso,
        idHotel,
      } = req.body;

      const piso = await Piso.findByIdAndUpdate(
        id,
        {
            num_piso,
            idHotel,
        },
        { new: true }
      );

      res.json(piso);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put activar piso
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const piso = await Piso.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      res.json(piso);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put inactivar piso
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const piso = await Piso.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      res.json(piso);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpPiso;
