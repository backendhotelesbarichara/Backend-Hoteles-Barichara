import mongoose from "mongoose";

const habitacionSchema = new mongoose.Schema({
  numero_habitacion: { type: String, require: true },
  descripcion: { type: String, require: true },
  tipo_habitacion: [{ type: String }],
  cantidad_personas: { type: Number, required: true },
  imagen_principal: { url: { type: String }, publicId: { type: String } },
  imagenes: [{ url: { type: String }, publicId: { type: String } }],
  servicio: [{ type: String, require: true }],
  precio_noche: { type: Number, required: true },
  idPiso: { type: mongoose.Schema.Types.ObjectId, ref: "Piso", require: true },
  disponible: { type: Boolean, default: 1 },
  estado: { type: Boolean, default: 1 },
  createAT: { type: Date, default: Date.now },
});

export default mongoose.model("Habitacion", habitacionSchema);
