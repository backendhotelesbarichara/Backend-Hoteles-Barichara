import { Router } from "express";
import httpProveedor from "../controllers/proveedor.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

// Obtener todos los proveedores
router.get("/all", httpProveedor.getTodos);

// Obtener proveedor por ID
router.get(
  "/buscarId/:id",
  [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "El id es inválido").isMongoId(),
    validarCampos,
  ],
  httpProveedor.getPorId
);

router.get('/buscar-por-sitio/:idSitioTuristico', httpProveedor.getPorSitioTuristico);

// Crear un proveedor
router.post(
  "/registro",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("telefono", "Digite el teléfono").not().isEmpty(),
    check("idSitioTuristico", "Digite el ID del sitio turístico").not().isEmpty(),
    check("idSitioTuristico", "El ID del sitio turístico es inválido").isMongoId(),
    validarCampos,
  ],
  httpProveedor.crearProveedor
);

// Editar un proveedor
router.put(
  "/editar/:id",
  [
    check("id", "El id es inválido").isMongoId(),
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("telefono", "Digite el teléfono").not().isEmpty(),
    check("idSitioTuristico", "Digite el ID del sitio turístico").not().isEmpty(),
    check("idSitioTuristico", "El ID del sitio turístico es inválido").isMongoId(),
    validarCampos,
  ],
  httpProveedor.editarProveedor
);

// Activar un proveedor
router.put(
  "/activar/:id",
  [
    check("id", "El id es inválido").isMongoId(),
    validarCampos,
  ],
  httpProveedor.activarProveedor
);

// Inactivar un proveedor
router.put(
  "/inactivar/:id",
  [
    check("id", "El id es inválido").isMongoId(),
    validarCampos,
  ],
  httpProveedor.inactivarProveedor
);

export default router;
