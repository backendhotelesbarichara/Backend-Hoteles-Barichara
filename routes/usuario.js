import { Router } from "express";
import httpUsuario from "../controllers/usuario.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import helpersUsuario from "../helpers/usuario.js";

const router = new Router();

//Get
router.get("/all", httpUsuario.getTodo);

//Get by ID
router.get("/:id", httpUsuario.getById);

router.get(
  "/codigo-recuperar/:correo",
  [
    check("correo", "Por favor ingrese el correo").not().isEmpty(),
    check("correo").custom(helpersUsuario.existeCorreo),
    validarCampos,
  ],
  httpUsuario.codigoRecuperar
);

router.get(
  "/confirmar-codigo/:codigo",
  [check("codigo", "Ingrese el código").not().isEmpty(), validarCampos],
  httpUsuario.confirmarCodigo
);

//Post
router.post(
  "/registro",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("apellido", "Digite el apellido").not().isEmpty(),
    check("cedula", "Digite la cédula").not().isEmpty(),
    check("rol", "Digite el rol").not().isEmpty(),
    check("correo", "Digite el correo").not().isEmpty(),
    check("correo", "Dirección de correo no válida").isEmail(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    check("password", "Digite la contraseña").not().isEmpty(),
    validarCampos,
  ],
  httpUsuario.crearUsuario
);

router.post(
  "/login",
  [
    check("cedula", "Digite su identificacion").not().isEmpty(),
    check("password", "Digite la contraseña").not().isEmpty(),
  ],
  httpUsuario.login
);

//Put
router.put(
  "/editar/:id",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("apellido", "Digite el apellido").not().isEmpty(),
    check("cedula", "Digite la cédula").not().isEmpty(),
    check("rol", "Digite el rol").not().isEmpty(),
    check("correo", "Digite el correo :V").not().isEmpty(),
    check("correo", "Dirección de correo no válida").isEmail(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    validarCampos,
  ],
  httpUsuario.editarUsuario
);

router.put(
  "/nueva-password",
  [
    check("correo", "Por favor ingrese el correo").not().isEmpty(),
    check("correo").custom(helpersUsuario.existeCorreoNewPass),
    check("codigo", "Ingrese el código").not().isEmpty(),
    check("password", "Ingrese la password").not().isEmpty(),
    validarCampos,
  ],
  httpUsuario.nuevaPassword
);

router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpUsuario.putInactivar
);

router.put(
  "/activar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpUsuario.putActivar
);

export default router;