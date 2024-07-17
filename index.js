import express from "express";
import http from "http";
import "dotenv/config";
import mongoose from "mongoose";
import Hotel from "./routes/hotel.js";
import Piso from "./routes/piso.js";
import Cliente from "./routes/cliente.js";
import Habitacion from "./routes/habitacion.js";
import Reserva from "./routes/reserva.js";
import Usuario from "./routes/usuario.js";
import Servicio from "./routes/servicio.js"

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/api/hotel", Hotel);
app.use("/api/piso", Piso);
app.use("/api/habitacion", Habitacion);
app.use("/api/cliente", Cliente);
app.use("/api/reserva", Reserva);
app.use("/api/usuario", Usuario);
app.use("/api/servicio", Servicio);

const server = http.createServer(app);

mongoose.connect(`${process.env.mongoDB}`)
.then(() => console.log("Conexión a mongoDB exitosa!"));

server.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
  console.log("hola soy mongo", process.env.mongoDB);
});
 