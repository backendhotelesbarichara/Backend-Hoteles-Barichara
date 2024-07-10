import { Router } from "express";
import httpHotel from "../controllers/hotel.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

//Get
router.get("/all", httpHotel.getTodo);

//Post
router.post(
  "/registro",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("descripcion", "Digite la descripción").not().isEmpty(),
    check("direccion", "Digite la direccion").not().isEmpty(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    validarCampos,
  ],
  httpHotel.resgistroHotel
);

//Put

router.put(
  "/editar/:id",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("descripcion", "Digite la descripción").not().isEmpty(),
    check("direccion", "Digite la direccion").not().isEmpty(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    validarCampos,
  ],
  httpHotel.editarHotel
);

router.put(
  "/inactivar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpHotel.putInactivar
);
router.put(
  "/activar/:id",
  [
    check("id", "Ingrese un ID válido").not().isEmpty(),
    check("id", "Ingrese un ID válido").isMongoId(),
    validarCampos,
  ],
  httpHotel.putActivar
);

export default router;
