import mongoose from "mongoose";

const proveedorSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  foto: { type: String },
  idSitioTuristico: { type: mongoose.Schema.Types.ObjectId, ref: "SitioTuristico", required: true },
  estado: { type: Boolean, default: 1 },
  createAT: { type: Date, default: Date.now },
});

export default mongoose.model("Proveedor", proveedorSchema);
