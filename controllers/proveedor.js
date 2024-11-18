import Proveedor from "../models/proveedor.js";

const httpProveedor = {
  // Obtener todos los proveedores
  getTodos: async (req, res) => {
    try {
      const proveedores = await Proveedor.find().populate("idSitioTuristico");
      res.json(proveedores);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los proveedores" });
    }
  },

  // Obtener un proveedor por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const proveedor = await Proveedor.findById(id).populate("idSitioTuristico");
      if (!proveedor) {
        return res.status(404).json({ error: "Proveedor no encontrado" });
      }
      res.json(proveedor);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Error al buscar el proveedor" });
    }
  },

  getPorSitioTuristico: async (req, res) => {
    try {
      const { idSitioTuristico } = req.params;
      const proveedor = await Proveedor.find({ idSitioTuristico }).populate("idSitioTuristico");
      res.json(proveedor);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Error en el servidor" });
    }
  },

  // Crear un nuevo proveedor
  crearProveedor: async (req, res) => {
    try {
      const { nombre, telefono, foto, idSitioTuristico } = req.body;

      const nuevoProveedor = new Proveedor({
        nombre,
        telefono,
        foto,
        idSitioTuristico,
      });

      await nuevoProveedor.save();
      res.json(nuevoProveedor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear el proveedor" });
    }
  },

  // Editar un proveedor
  editarProveedor: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, telefono, foto, idSitioTuristico } = req.body;

      const proveedorActualizado = await Proveedor.findByIdAndUpdate(
        id,
        { nombre, telefono, foto, idSitioTuristico },
        { new: true } // Retorna el documento actualizado
      ).populate("idSitioTuristico");

      if (!proveedorActualizado) {
        return res
          .status(404)
          .json({ error: "Proveedor no encontrado para actualizar" });
      }

      res.json(proveedorActualizado);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Error al actualizar el proveedor" });
    }
  },

  // Activar un proveedor
  activarProveedor: async (req, res) => {
    try {
      const { id } = req.params;

      const proveedor = await Proveedor.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );

      if (!proveedor) {
        return res
          .status(404)
          .json({ error: "Proveedor no encontrado para activar" });
      }

      res.json(proveedor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al activar el proveedor" });
    }
  },

  // Inactivar un proveedor
  inactivarProveedor: async (req, res) => {
    try {
      const { id } = req.params;

      const proveedor = await Proveedor.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );

      if (!proveedor) {
        return res
          .status(404)
          .json({ error: "Proveedor no encontrado para inactivar" });
      }

      res.json(proveedor);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al inactivar el proveedor" });
    }
  },
};

export default httpProveedor;
