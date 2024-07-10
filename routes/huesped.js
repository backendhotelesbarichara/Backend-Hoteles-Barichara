import { Router } from "express";
import httpHuesped from "../controllers/huesped.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

//Get
router.get("/all", httpHuesped.getTodo);

//Post
router.post(
  "/registro",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("apellido", "Digite el apellido").not().isEmpty(),
    check("cedula", "Digite la cédula").not().isEmpty(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    validarCampos,
  ],
  httpHuesped.crearHuesped
);

//Put
router.put(
  "/editar/:id",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("apellido", "Digite el apellido").not().isEmpty(),
    check("cedula", "Digite la cédula").not().isEmpty(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    validarCampos,
  ],
  httpHuesped.editarHuesped
);

router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpHuesped.putInactivar
);

router.put(
  "/activar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpHuesped.putActivar
);

export default router;