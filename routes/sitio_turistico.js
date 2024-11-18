import { Router } from "express";
import httpSitioTuristico from "../controllers/sitio_turistico.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todos los sitios turísticos
router.get("/all", httpSitioTuristico.getTodos);

// Obtener sitio turístico por ID
router.get(
  "/buscarId/:id",
  [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "El id es inválido").isMongoId(),
    validarCampos,
  ],
  httpSitioTuristico.getPorId
);

// Crear un sitio turístico
router.post(
  "/registro",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("descripcion", "Digite la descripción").not().isEmpty(),
    validarCampos,
  ],
  httpSitioTuristico.crearSitio
);

// Editar un sitio turístico
router.put(
  "/editar/:id",
  [
    check("id", "El id es inválido").isMongoId(),
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("descripcion", "Digite la descripción").not().isEmpty(),
    validarCampos,
  ],
  httpSitioTuristico.editarSitio
);

// Activar un sitio turístico
router.put(
  "/activar/:id",
  [
    check("id", "El id es inválido").isMongoId(),
    validarCampos,
  ],
  httpSitioTuristico.activarSitio
);

// Inactivar un sitio turístico
router.put(
  "/inactivar/:id",
  [
    check("id", "El id es inválido").isMongoId(),
    validarCampos,
  ],
  httpSitioTuristico.inactivarSitio
);

export default router;
