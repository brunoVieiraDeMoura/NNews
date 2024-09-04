import Materia from "../models/Materia.js";

export const createMateria = async (req, res) => {
  const { name, subcategoriaId } = req.body;
  try {
    const newMateria = new Materia({ name, subcategoria: subcategoriaId });
    await newMateria.save();
    res.status(201).json(newMateria);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar matéria" }, error);
  }
};
