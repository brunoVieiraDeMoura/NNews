import Subcategoria from "../models/Subcategoria.js";
import Materia from "../models/Materia.js";

export const createSubcategoria = async (req, res) => {
  const { name, categoriaId } = req.body;
  try {
    const newSubcategoria = new Subcategoria({ name, categoria: categoriaId });
    await newSubcategoria.save();
    res.status(201).json(newSubcategoria);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar subcategoria" }, error);
  }
};

export const deleteSubcategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const subcategoria = await Subcategoria.findById(id);
    if (!subcategoria)
      return res.status(404).json({ message: "Subcategoria não encontrada" });

    // Excluir matérias vinculadas
    await Materia.deleteMany({ subcategoria: id });
    await Subcategoria.findByIdAndDelete(id);

    res.status(200).json({ message: "Subcategoria excluída" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir subcategoria" }, error);
  }
};
