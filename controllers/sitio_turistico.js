import SitioTuristico from "../models/sitio_turistico.js";

const httpSitioTuristico = {
  // Obtener todos los sitios turísticos
  getTodos: async (req, res) => {
    try {
      const sitios = await SitioTuristico.find();
      res.json(sitios);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al obtener los sitios turísticos" });
    }
  },

  // Obtener un sitio turístico por ID
  getPorId: async (req, res) => {
    try {
      const { id } = req.params;
      const sitio = await SitioTuristico.findById(id);
      if (!sitio) {
        return res.status(404).json({ error: "Sitio turístico no encontrado" });
      }
      res.json(sitio);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Error al buscar el sitio turístico" });
    }
  },

  // Crear un nuevo sitio turístico
  crearSitio: async (req, res) => {
    try {
      const { nombre, descripcion, imagen } = req.body;

      const nuevoSitio = new SitioTuristico({
        nombre,
        descripcion,
        imagen,
      });

      await nuevoSitio.save();
      res.json(nuevoSitio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear el sitio turístico" });
    }
  },

  // Editar un sitio turístico
  editarSitio: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, descripcion, imagen } = req.body;

      const sitioActualizado = await SitioTuristico.findByIdAndUpdate(
        id,
        { nombre, descripcion, imagen },
        { new: true } // Retorna el documento actualizado
      );

      if (!sitioActualizado) {
        return res
          .status(404)
          .json({ error: "Sitio turístico no encontrado para actualizar" });
      }

      res.json(sitioActualizado);
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: "Error al actualizar el sitio turístico" });
    }
  },

  // Activar un sitio turístico
  activarSitio: async (req, res) => {
    try {
      const { id } = req.params;

      const sitio = await SitioTuristico.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );

      if (!sitio) {
        return res
          .status(404)
          .json({ error: "Sitio turístico no encontrado para activar" });
      }

      res.json(sitio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al activar el sitio turístico" });
    }
  },

  // Inactivar un sitio turístico
  inactivarSitio: async (req, res) => {
    try {
      const { id } = req.params;

      const sitio = await SitioTuristico.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );

      if (!sitio) {
        return res
          .status(404)
          .json({ error: "Sitio turístico no encontrado para inactivar" });
      }

      res.json(sitio);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al inactivar el sitio turístico" });
    }
  },
};

export default httpSitioTuristico;
