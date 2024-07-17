import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
  fecha_entrada: { type: Date, required: true },
  fecha_salida: { type: Date, required: true },
  cantidad_noches: { type: Number, required: true },
  cantidad_adulto: { type: Number, required: true },
  cantidad_nino: { type: Number },
  costo_total: { type: Number, required: true },
  idHabitacion: { type: mongoose.Schema.Types.ObjectId, ref: "Habitacion", required: true },
  idCliente: { type: mongoose.Schema.Types.ObjectId, ref: "Cliente", required: true },
  aprobado: { type: Boolean, default: 0 },
  estado: { type: Boolean, default: 1 },
  createAT: { type: Date, default: Date.now },
});

export default mongoose.model("Reserva", reservaSchema);