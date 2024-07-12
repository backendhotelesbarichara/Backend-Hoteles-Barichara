import bcryptjs from "bcryptjs";
import Usuario from "../models/usuario.js";
import helpersGeneral from "../helpers/generales.js"

const httpUsuario = {
  //Get all usuarios
  getTodo: async (req, res) => {
    try {
      const usuarios = await Usuario.find();
      res.json(usuarios);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Get usuario by ID
  getById: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findById(id);
      if (!usuario) {
        res.status(404).json({ message: "Usuario no encontrado" });
      } else {
        res.json(usuario);
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Post crear usuario
  crearUsuario: async (req, res) => {
    try {
      const { nombre, apellido, cedula, rol, correo, telefono, password } =
        req.body;

      const mayusNombre = await helpersGeneral.mayusAllPalabras(nombre.trim());
      const mayusApellido = await helpersGeneral.mayusAllPalabras(apellido.trim());
      
      const usuario = new Usuario({
        nombre: mayusNombre,
        apellido: mayusApellido,
        cedula,
        rol,
        correo,
        telefono,
        password,
      });

      const salt = bcryptjs.genSaltSync();
      usuario.password = bcryptjs.hashSync(password, salt);

      await usuario.save();

      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error });
      console.log(error)
    }
  },

  //Put editar usuario
  editarUsuario: async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, apellido, cedula, rol, correo, telefono } = req.body;

      const mayusNombre = await helpersGeneral.mayusAllPalabras(nombre.trim());
      const mayusApellido = await helpersGeneral.mayusAllPalabras(apellido.trim());

      const usuario = await Usuario.findByIdAndUpdate(
        id,
        {
          nombre: mayusNombre,
          apellido: mayusApellido,
          cedula,
          rol,
          correo,
          telefono,
        },
        { new: true }
      );

      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put activar usuario
  putActivar: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
      );
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error });
    }
  },

  //Put inactivar usuario
  putInactivar: async (req, res) => {
    try {
      const { id } = req.params;
      const usuario = await Usuario.findByIdAndUpdate(
        id,
        { estado: false },
        { new: true }
      );
      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default httpUsuario;
