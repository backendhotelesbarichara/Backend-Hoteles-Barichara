import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  descripcion: { type: String, require: true },
  logo: { url: { type: String }, publicId: { type: String } },
  fotos: [{ url: { type: String }, publicId: { type: String } }],
  direccion: { type: String, require: true, unique: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String, required: true, unique: true },
  servicio: [{ descrip: { type: String, _id: false } }],
  pisos: { type: String, required: true,},
  idUsuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  estado: { type: Boolean, default: 1 },
  createAT: { type: Date, default: Date.now },
});

export default mongoose.model("Hotel", hotelSchema);
