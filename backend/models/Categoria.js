import mongoose from "mongoose";

const CategoriaSchema = new mongoose.Schema({
  name: { type: String, required: true },
  subcategorias: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Subcategoria" },
  ],
});

const Categoria = mongoose.model("Categoria", CategoriaSchema);
export default Categoria;
