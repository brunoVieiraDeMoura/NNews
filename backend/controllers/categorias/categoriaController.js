import Categoria from "../../models/Categoria.js";
import Subcategoria from "../../models/Subcategoria.js";
import Materia from "../../models/Materia.js";

export const createCategoria = async (req, res) => {
  const { name } = req.body;
  try {
    const newCategoria = new Categoria({ name });
    await newCategoria.save();
    return res.status(201).json(newCategoria);
  } catch (error) {
    return res.status(500).json({ message: "Erro ao criar categoria" }, error);
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

export const getCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find(); // Busca todas as categorias
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar categorias", error });
  }
};

export const getCategoriaById = async (req, res) => {
  try {
    const categoria = await Categoria.findById(req.params.id); // Busca categoria pelo ID
    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }
    res.status(200).json(categoria);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar categoria", error });
  }
};

export const updateCategoria = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const categoria = await Categoria.findById(id);

    if (!categoria) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    categoria.name = name;
    await categoria.save();

    return res.status(200).json(categoria);
  } catch (error) {
    console.error("Erro ao atualizar categoria", error);
    return res.status(500).json({ message: "Erro ao atualizar categoria" });
  }
};

export const getCategoriasPopulated = async (req, res) => {
  try {
    const categorias = await Categoria.find().populate({
      path: "subcategorias",
      populate: {
        path: "materias", // Popula as matérias dentro das subcategorias
      },
    });

    res.status(200).json(categorias);
  } catch (error) {
    console.error("Erro ao buscar categorias populadas", error);
    res.status(500).json({ message: "Erro ao buscar categoria", error });
  }
};
