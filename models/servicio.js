import mongoose from "mongoose";

const servicioSchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  descripcion: { type: String},
  idHotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  estado: { type: Boolean, default: 1 },
  createAT: { type: Date, default: Date.now },
});

export default mongoose.model("Servicio", servicioSchema);
