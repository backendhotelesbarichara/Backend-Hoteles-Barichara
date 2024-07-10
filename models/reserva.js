import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema({
  fecha_entrada: { type: Date, required: true },
  fecha_salida: { type: Date, required: true },
  cantidad_dias: { type: Number, required: true },
  costo_total: { type: Number, required: true },
  idHabitacion: { type: mongoose.Schema.Types.ObjectId, ref: "Habitacion", required: true },
  idHuesped: { type: mongoose.Schema.Types.ObjectId, ref: "Huesped", required: true },
  estado: { type: Boolean, default: 1 },
  createAT: { type: Date, default: Date.now },
});

export default mongoose.model("Reserva", reservaSchema);