import { Router } from "express";
import httpCliente from "../controllers/cliente.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

//Get
router.get("/all", httpCliente.getTodo);

//Post
router.post(
  "/registro",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("apellido", "Digite el apellido").not().isEmpty(),
    check("cedula", "Digite la cédula").not().isEmpty(),
    check("correo", "Digite la cédula").not().isEmpty(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    validarCampos,
  ],
  httpCliente.crearCliente
);

//Put
router.put(
  "/editar/:id",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("apellido", "Digite el apellido").not().isEmpty(),
    check("cedula", "Digite la cédula").not().isEmpty(),
    check("correo", "Digite la cédula").not().isEmpty(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    validarCampos,
  ],
  httpCliente.editarCliente
);

router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpCliente.putInactivar
);

router.put(
  "/activar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpCliente.putActivar
);

export default router;