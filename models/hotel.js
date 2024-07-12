import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  descripcion: { type: String, require: true },
  imagen: { url: { type: String }, publicId: { type: String } },
  logo: { url: { type: String }, publicId: { type: String } },
  direccion: { type: String, require: true, unique: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String, required: true, unique: true },
  pisos: { type: String, required: true,},
  estado: { type: Boolean, default: 1 },
  createAT: { type: Date, default: Date.now },
});

export default mongoose.model("Hotel", hotelSchema);
