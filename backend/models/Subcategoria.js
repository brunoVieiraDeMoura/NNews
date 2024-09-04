import mongoose from "mongoose";

const SubcategoriaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" },
  materias: [{ type: mongoose.Schema.Types.ObjectId, ref: "Materia" }],
});

const Subcategoria = mongoose.model("Subcategoria", SubcategoriaSchema);
export default Subcategoria;
