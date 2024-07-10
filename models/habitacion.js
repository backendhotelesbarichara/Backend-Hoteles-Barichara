import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
  numero_habitacion: { type: String, require: true },
  descripcion: { type: String, require: true },
  tipo_habitacion: { url: { type: String }, publicId: { type: String } },
  imagenes: [{ url: { type: String }, publicId: { type: String } }],
  servicio: [{ type: String }],
  precio_noche: { type: String, required: true, unique: true },
  idHotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", require: true },
  estado: { type: Boolean, default: 1 },
  createAT: { type: Date, default: Date.now },
});

export default mongoose.model("Usuario", usuarioSchema);
