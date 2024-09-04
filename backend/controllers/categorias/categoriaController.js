import Categoria from "../models/Categoria.js";
import Subcategoria from "../models/Subcategoria.js";
import Materia from "../models/Materia.js";

export const createCategoria = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategoria = new Categoria({ name });
    await newCategoria.save();
    res.status(201).json(newCategoria);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar categoria" }, error);
  }
};

export const deleteCategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findById(id);
    if (!categoria)
      return res.status(404).json({ message: "Categoria não encontrada" });

    // Excluir subcategorias e matérias vinculadas
    await Subcategoria.deleteMany({ categoria: id });
    await Materia.deleteMany({
      subcategoria: { $in: categoria.subcategorias },
    });

    await Categoria.findByIdAndDelete(id);
    res.status(200).json({ message: "Categoria excluída" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir categoria" }, error);
  }
};
