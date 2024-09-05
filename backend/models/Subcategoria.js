import mongoose from "mongoose";

const SubcategoriaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: "Categoria" }, // Referência à categoria
  materias: [{ type: mongoose.Schema.Types.ObjectId, ref: "Materia" }], // Referência às matérias
});

const Subcategoria = mongoose.model("Subcategoria", SubcategoriaSchema);
export default Subcategoria;
