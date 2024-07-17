import { Router } from "express";
import httpHabitacion from "../controllers/habitacion.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

//Get
router.get("/all", httpHabitacion.getTodo);

router.get("/buscarPiso/:idPiso", httpHabitacion.getPorPiso);

//Post
router.post(
  "/registro",
  [
    check("numero_habitacion", "Digite el número de habitación").not().isEmpty(),
    check("descripcion", "Digite la descripción").not().isEmpty(),
    check("cantidad_personas", "Digite el máximo de personas").not().isEmpty(),
    check("servicio", "Digite el servicio").not().isEmpty(),
    check("precio_noche", "Digite el precio por noche").not().isEmpty(),
    check("idPiso", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpHabitacion.crearHabitacion
);

//Put
router.put(
  "/editar/:id",
  [
    check("numero_habitacion", "Digite el número de habitación").not().isEmpty(),
    check("descripcion", "Digite la descripción").not().isEmpty(),
    check("cantidad_personas", "Digite el máximo de personas").not().isEmpty(),
    check("servicio", "Digite el servicio").not().isEmpty(),
    check("precio_noche", "Digite el precio por noche").not().isEmpty(),
    check("idPiso", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpHabitacion.editarHabitacion
);

router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpHabitacion.putInactivar
);

router.put(
  "/activar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpHabitacion.putActivar
);

export default router;