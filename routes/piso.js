import { Router } from "express";
import httpPiso from "../controllers/piso.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

//Get
router.get("/all", httpPiso.getTodo);

//Get by ID
router.get("/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpPiso.getById
);

router.get('/buscarPisoPorHotel/:idHotel', httpPiso.getPorHotel);

//Post
router.post(
  "/registro",
  [
    check("num_piso", "Digite la cantidad de pisos").not().isEmpty(),
    check("idHotel", "Digite el ID del huesped").isMongoId(),
    validarCampos,
  ],
  httpPiso.crearPiso
);

//Put
router.put(
  "/editar/:id",
  [
    check("num_piso", "Digite la cantidad de pisos").not().isEmpty(),
    check("idHotel", "Digite el ID del huesped").isMongoId(),
    validarCampos,
  ],
  httpPiso.editarPiso
);

router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpPiso.putInactivar
);

router.put(
  "/activar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpPiso.putActivar
);

export default router;
