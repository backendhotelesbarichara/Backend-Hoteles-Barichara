import { Router } from "express";
import httpServicio from "../controllers/servicio.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

//Get
router.get("/all", httpServicio.getTodo);

//Get by ID
router.get("/:id", httpServicio.getById);

//Get servicios by hotel
router.get("/hotel/:idHotel", httpServicio.getServiciosByHotel);

//Post
router.post(
  "/registro",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("idHotel", "Seleccione un hotel").not().isEmpty(),
    check("idHotel", "Seleccione un hotel").isMongoId(),
    validarCampos,
  ],
  httpServicio.crearServicio
);

//Put
router.put(
  "/editar/:id",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("idHotel", "Seleccione un hotel").not().isEmpty(),
    check("idHotel", "Seleccione un hotel").isMongoId(),
    validarCampos,
  ],
  httpServicio.editarServicio
);

router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpServicio.putInactivar
);

router.put(
  "/activar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpServicio.putActivar
);

export default router;