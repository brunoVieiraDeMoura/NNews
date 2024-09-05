import Subcategoria from "../../models/Subcategoria.js";
import Materia from "../../models/Materia.js";
import Categoria from "../../models/Categoria.js";

export const createSubcategoria = async (req, res) => {
  const { name, categoriaId } = req.body;
  try {
    const newSubcategoria = new Subcategoria({ name, categoria: categoriaId });
    await newSubcategoria.save();

    // Adiciona a subcategoria à lista de subcategorias da categoria
    const categoria = await Categoria.findById(categoriaId);
    categoria.subcategorias.push(newSubcategoria._id);
    await categoria.save();

    res.status(201).json(newSubcategoria);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar subcategoria", error });
  }
};

export const deleteSubcategoria = async (req, res) => {
  const { id } = req.params;
  try {
    const subcategoria = await Subcategoria.findById(id).populate("materias");
    if (!subcategoria)
      return res.status(404).json({ message: "Subcategoria não encontrada" });

    // Excluir matérias vinculadas
    await Materia.deleteMany({ subcategoria: id });
    await Subcategoria.findByIdAndDelete(id);

    res.status(200).json({ message: "Subcategoria excluída" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao excluir subcategoria", error });
  }
};

export const getSubcategorias = async (req, res) => {
  try {
    // Popula as matérias relacionadas à subcategoria
    const subcategorias = await Subcategoria.find({
      categoria: req.query.categoriaId,
    }).populate("materias");
    res.status(200).json(subcategorias);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar subcategorias", error });
  }
};

export const getSubcategoriaById = async (req, res) => {
  try {
    const subcategoria = await Subcategoria.findById(req.params.id).populate(
      "materias",
    );
    if (!subcategoria) {
      return res.status(404).json({ message: "Subcategoria não encontrada" });
    }
    res.status(200).json(subcategoria);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar subcategoria", error });
  }
};

export const updateSubcategoria = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const subcategoria = await Subcategoria.findById(id);

    if (!subcategoria) {
      return res.status(404).json({ message: "Subcategoria não encontrada" });
    }

    subcategoria.name = name;
    await subcategoria.save();

    return res.status(200).json(subcategoria);
  } catch (error) {
    console.error("Erro ao atualizar subcategoria", error);
    return res.status(500).json({ message: "Erro ao atualizar subcategoria" });
  }
};
