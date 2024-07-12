import Cliente from "../models/cliente.js";

const httpCliente = {
  //Get
  getTodo: async (req, res) => {
    try {
      const cliente = await Cliente.find();
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Get by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findById(id);
      if (!cliente) {
        res.status(404).json({ message: "Cliente no encontrado" });
      } else {
        res.json(cliente);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Post registro cliente
  crearCliente: async (req, res) => {
    try {
      const { nombre, apellido, cedula, telefono } = req.body;

      const cliente = new Cliente({
        nombre,
        apellido,
        cedula,
        telefono,
      });

      await cliente.save();

      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put editar cliente
  editarCliente: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, apellido, cedula, telefono } = req.body;

      const cliente = await Cliente.findByIdAndUpdate(
        id,
        {
          nombre,
          apellido,
          cedula,
          telefono,
        },
        { new: true }
      );

      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put activar cliente
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put inactivar cliente
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      res.json(cliente);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpCliente;
