import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
  nombre_cliente: { type: String, require: true },
  cedula_cliente: { type: String, require: true },
  telefono_cliente: { type: String, require: true },
  correo_cliente: { type: String, require: true },
  fecha_entrada: { type: Date, required: true },
  fecha_salida: { type: Date, required: true },
  cantidad_noches: { type: Number, required: true },
  cantidad_adulto: { type: Number, required: true },
  cantidad_nino: { type: Number },
  costo_total: { type: Number, required: true },
  mensaje: { type: String },
  idHabitacion: { type: mongoose.Schema.Types.ObjectId, ref: "Habitacion", required: true },
  aprobado: { type: Boolean, default: 0 },
  estado: { type: Boolean, default: 1 },
  createAT: { type: Date, default: Date.now },
});

export default mongoose.model("Reserva", reservaSchema);