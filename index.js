import express from "express";
import http from "http";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import Hotel from "./routes/hotel.js";
import Piso from "./routes/piso.js";
import Habitacion from "./routes/habitacion.js";
import Reserva from "./routes/reserva.js";
import Usuario from "./routes/usuario.js";
import SitioTuristico from "./routes/sitio_turistico.js";
import Proveedor from "./routes/proveedor.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

app.use("/api/hotel", Hotel);
app.use("/api/piso", Piso);
app.use("/api/habitacion", Habitacion);
app.use("/api/reserva", Reserva);
app.use("/api/usuario", Usuario);
app.use("/api/sitio-turistico", SitioTuristico);
app.use("/api/proveedor", Proveedor);

const server = http.createServer(app);

mongoose
  .connect(`${process.env.mongoDB}`)
  .then(() => console.log("Conexión a mongoDB exitosa!"));

server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
