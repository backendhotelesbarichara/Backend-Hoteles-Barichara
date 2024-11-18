import mongoose from "mongoose";

const sitioTuristicoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  imagen: [{ url: { type: String } }],
  estado: { type: Boolean, default: 1 },
  createAT: { type: Date, default: Date.now },
});

export default mongoose.model("SitioTuristico", sitioTuristicoSchema);
