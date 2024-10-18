import { Router } from "express";
import httpHotel from "../controllers/hotel.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";

const router = new Router();

//Get
router.get("/all", httpHotel.getTodo);

router.get(
  "/buscarId/:id",
  [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "El id es invalido").isMongoId(),
  ],
  httpHotel.getPorId
);

router.get("/buscarHotel/:idUsuario", httpHotel.getPorUsuario);

//Post
router.post(
  "/registro",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("descripcion", "Digite la descripción").not().isEmpty(),
    check("direccion", "Digite la direccion").not().isEmpty(),
    check("correo", "Digite el correo").not().isEmpty(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    check("servicio", "Digite por lo menos un servicio del hotel").not().isEmpty(),
    check("pisos", "Digite la cantidad de pisos").not().isEmpty(),
    check("idUsuario", "Digite el usuario").not().isEmpty(),
    validarCampos,
  ],
  httpHotel.crearHotel
);

//Put

router.put(
  "/editar/:id",
  [
    check("nombre", "Digite el nombre").not().isEmpty(),
    check("descripcion", "Digite la descripción").not().isEmpty(),
    check("direccion", "Digite la direccion").not().isEmpty(),
    check("correo", "Digite el correo").not().isEmpty(),
    check("telefono", "Digite el telefono").not().isEmpty(),
    check("servicio", "Digite por lo menos un servicio del hotel").not().isEmpty(),
    check("pisos", "Digite la cantidad de pisos").not().isEmpty(),
    check("idUsuario", "Digite el usuario").not().isEmpty(),
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
