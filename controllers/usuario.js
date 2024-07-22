import bcryptjs from "bcryptjs";
import Usuario from "../models/usuario.js";
import helpersGeneral from "../helpers/generales.js"
import { generarJWT } from "../middlewares/validar-jwt.js";

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

  login: async (req, res) => {
    const { cedula, password } = req.body;

    try {
      const usuario = await Usuario.findOne({ cedula });
      console.log("a", usuario);

      if (!usuario) {
        return res.status(400).json({
          error: "Identificación o Contraseña no son correctos",
        });
      }
      if (usuario.estado == false) {
        return res.status(400).json({
          error: "Usuario Inactivo",
        });
      }
      const validPassword = bcryptjs.compareSync(password, usuario.password);
      if (!validPassword) {
        return res.status(401).json({
          error: "Identificación o Contraseña no son correctos",
        });
      }
      const token = await generarJWT(usuario.id);
      res.json({ usuario, token });
    } catch (error) {
      return res.status(500).json({
        error: "Hable con el WebMaster",
      });
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
