import { Router } from "express";
import httpReserva from "../controllers/reserva.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

//Get
router.get("/all", httpReserva.getAll);

//Get by ID
router.get("/:id", httpReserva.getById);

//Post
router.post(
  "/registro",
  [
    check("fecha_entrada", "Digite la fecha de entrada").not().isEmpty(),
    check("fecha_salida", "Digite la fecha de salida").not().isEmpty(),
    check("cantidad_dias", "Digite la cantidad de días").not().isEmpty(),
    check("costo_total", "Digite el costo total").not().isEmpty(),
    check("idHabitacion", "Digite el ID de la habitación").isMongoId(),
    check("idHuesped", "Digite el ID del huesped").isMongoId(),
    validarCampos,
  ],
  httpReserva.crearReserva
);

//Put
router.put(
  "/editar/:id",
  [
    check("fecha_entrada", "Digite la fecha de entrada").not().isEmpty(),
    check("fecha_salida", "Digite la fecha de salida").not().isEmpty(),
    check("cantidad_dias", "Digite la cantidad de días").not().isEmpty(),
    check("costo_total", "Digite el costo total").not().isEmpty(),
    check("idHabitacion", "Digite el ID de la habitación").isMongoId(),
    check("idHuesped", "Digite el ID del huesped").isMongoId(),
    validarCampos,
  ],
  httpReserva.editarReserva
);

router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpReserva.putInactivar
);

router.put(
  "/activar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpReserva.putActivar
);

export default router;