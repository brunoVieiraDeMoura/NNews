import Materia from "../../models/Materia.js";
import Subcategoria from "../../models/Subcategoria.js";

export const createMateria = async (req, res) => {
  const { name, subcategoriaId } = req.body;
  try {
    const newMateria = new Materia({ name, subcategoria: subcategoriaId });
    await newMateria.save();

    // Adiciona a matéria à lista de matérias da subcategoria
    const subcategoria = await Subcategoria.findById(subcategoriaId);
    subcategoria.materias.push(newMateria._id);
    await subcategoria.save();

    res.status(201).json(newMateria);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar matéria", error });
  }
};

export const deleteMateria = async (req, res) => {
  try {
    const materia = await Materia.findById(req.params.id);

    if (!materia) {
      return res.status(404).json({ message: "Matéria não encontrada" });
    }

    await Materia.findByIdAndDelete(req.params.id);

    res
      .status(200)
      .json({ message: "Matéria deletada com sucesso", id: req.params.id });
  } catch (error) {
    console.error("Erro ao deletar matéria", error);
    res.status(500).json({ message: "Erro ao deletar matéria", error });
  }
};

export const getMaterias = async (req, res) => {
  const { subcategoriaId } = req.query;

  try {
    // Filtrando matérias pela subcategoria correta
    const materias = await Materia.find({ subcategoria: subcategoriaId });
    res.status(200).json(materias);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar matérias", error });
  }
};

export const getMateriaById = async (req, res) => {
  try {
    const materia = await Materia.findById(req.params.id); // Busca matéria pelo ID
    if (!materia) {
      return res.status(404).json({ message: "Matéria não encontrada" });
    }
    res.status(200).json(materia);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar matéria", error });
  }
};

export const updateMateria = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  try {
    const materia = await Materia.findById(id);

    if (!materia) {
      return res.status(404).json({ message: "Matéria não encontrada" });
    }

    materia.name = name;
    await materia.save();

    return res.status(200).json(materia);
  } catch (error) {
    console.error("Erro ao atualizar matéria", error);
    return res.status(500).json({ message: "Erro ao atualizar matéria" });
  }
};
