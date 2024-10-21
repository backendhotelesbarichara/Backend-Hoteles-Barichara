import mongoose from "mongoose";

const pisoSchema = new mongoose.Schema({
  num_piso: { type: String, required: true },
  idHotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  estado: { type: Boolean, default: 1 },
  createAT: { type: Date, default: Date.now },
});

export default mongoose.model("Piso", pisoSchema);
