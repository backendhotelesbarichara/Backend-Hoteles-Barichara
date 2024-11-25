import bcryptjs from "bcryptjs";
import Usuario from "../models/usuario.js";
import helpersGeneral from "../helpers/generales.js";
import nodemailer from "nodemailer";
import { generarJWT } from "../middlewares/validar-jwt.js";

let codigoEnviado = {};

function generarNumeroAleatorio() {
  let primerDigito = Math.floor(Math.random() * 9) + 1;

  let restoNumero = Math.floor(Math.random() * 100000)
    .toString()
    .padStart(5, "0");

  let numero = primerDigito + restoNumero;

  let fechaCreacion = new Date();
  codigoEnviado = { codigo: numero, fechaCreacion };

  return numero;
}

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
      const mayusApellido = await helpersGeneral.mayusAllPalabras(
        apellido.trim()
      );

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
      console.log(error);
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
      const { nombre, apellido, cedula, rol, correo, telefono, password } =
        req.body;

      const updateFields = {};

      if (nombre) {
        updateFields.nombre = await helpersGeneral.mayusAllPalabras(
          nombre.trim()
        );
      }

      if (apellido) {
        updateFields.apellido = await helpersGeneral.mayusAllPalabras(
          apellido.trim()
        );
      }

      if (cedula) {
        updateFields.cedula = cedula;
      }

      if (rol) {
        updateFields.rol = rol;
      }

      if (correo) {
        updateFields.correo = correo;
      }

      if (telefono) {
        updateFields.telefono = telefono;
      }

      if (password) {
        const salt = bcryptjs.genSaltSync();
        updateFields.password = bcryptjs.hashSync(password, salt);
      }

      const usuario = await Usuario.findByIdAndUpdate(id, updateFields, {
        new: true,
      });

      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      res.json(usuario);
    } catch (error) {
      res.status(500).json({ error });
      console.error(error);
    }
  },

  codigoRecuperar: async (req, res) => {
    try {
      const { correo } = req.params;

      const codigo = generarNumeroAleatorio();

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.userEmail,
          pass: process.env.password,
        },
      });

      const mailOptions = {
        from: process.env.userEmail,
        to: correo,
        subject: "Recuperación de Contraseña",
        text: "Tu código para restablecer tu contraseña es: " + codigo,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(error);
          res.status(500).json({
            success: false,
            error: "Error al enviar el correo electrónico.",
          });
        } else {
          console.log("Correo electrónico enviado: " + info.response);
          res.json({
            success: true,
            msg: "Correo electrónico enviado con éxito.",
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error });
    }
  },

  confirmarCodigo: async (req, res) => {
    try {
      const { codigo } = req.params;

      if (!codigoEnviado) {
        return res.status(400).json({ error: "Código no generado" });
      }

      const { codigo: codigoGuardado, fechaCreacion } = codigoEnviado;
      const tiempoExpiracion = 30; // Tiempo de expiración en minutos

      const tiempoActual = new Date();
      const tiempoDiferencia = tiempoActual - new Date(fechaCreacion);
      const minutosDiferencia = tiempoDiferencia / (1000 * 60);

      if (minutosDiferencia > tiempoExpiracion) {
        return res.status(400).json({ error: "El código ha expirado" });
      }

      if (codigo == codigoGuardado) {
        return res.json({ msg: "Código correcto" });
      }

      return res.status(400).json({ error: "Código incorrecto" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Error, hable con el WebMaster",
      });
    }
  },

  nuevaPassword: async (req, res) => {
    try {
      const { codigo, password } = req.body;

      const { codigo: codigoGuardado, fechaCreacion } = codigoEnviado;
      const tiempoExpiracion = 30; // Tiempo de expiración en minutos

      const tiempoActual = new Date();
      const tiempoDiferencia = tiempoActual - new Date(fechaCreacion);
      const minutosDiferencia = tiempoDiferencia / (1000 * 60);

      if (minutosDiferencia > tiempoExpiracion) {
        return res.status(400).json({ error: "El código ha expirado" });
      }

      if (codigo == codigoGuardado) {
        codigoEnviado = {};

        const administrador = req.AdministradorUpdate;

        const salt = bcryptjs.genSaltSync();
        const newPassword = bcryptjs.hashSync(password, salt);

        await Usuario.findByIdAndUpdate(
          administrador.id,
          { password: newPassword },
          { new: true }
        );

        return res
          .status(200)
          .json({ msg: "Contraseña actualizada con éxito" });
      }

      return res.status(400).json({ error: "Código incorrecto" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        error: "Error, hable con el WebMaster",
      });
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
