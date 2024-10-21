import mongoose from "mongoose";

const habitacionSchema = new mongoose.Schema({
  numero_habitacion: { type: String, required: true },
  descripcion: { type: String, required: true },
  tipo_habitacion: [{ type: String }],
  cantidad_personas: { type: Number, required: true },
  imagenes: [{ url: { type: String }, publicId: { type: String } }],
  servicio: [{ type: String, required: true }],
  precio_noche: { type: Number, required: true },
  idPiso: { type: mongoose.Schema.Types.ObjectId, ref: "Piso", required: true },
  disponible: { type: Boolean, default: 1 },
  estado: { type: Boolean, default: 1 },
  createAT: { type: Date, default: Date.now },
});

export default mongoose.model("Habitacion", habitacionSchema);
