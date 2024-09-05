import mongoose from "mongoose";

const MateriaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategoria: { type: mongoose.Schema.Types.ObjectId, ref: "Subcategoria" }, // Referência à subcategoria
});

const Materia = mongoose.model("Materia", MateriaSchema);
export default Materia;
