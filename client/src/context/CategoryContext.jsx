import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);

  const fetchCategorias = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/categorias/populated",
      );
      const data = await response.json();
      setCategorias(data);
    } catch (error) {
      console.error("Erro ao buscar categorias populadas:", error);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  // Funções para manipular categorias
  const adicionarCategoria = async (nomeCategoria) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/categorias",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: nomeCategoria }),
        },
      );
      const novaCategoria = await response.json();
      setCategorias((prevCategorias) => [...prevCategorias, novaCategoria]);
    } catch (error) {
      console.error("Erro ao adicionar categoria", error);
    }
  };

  const editarCategoria = async (id, categoriaEditada) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/categorias/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: categoriaEditada }),
        },
      );
      const categoriaAtualizada = await response.json();
      setCategorias((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria._id === id ? categoriaAtualizada : categoria,
        ),
      );
    } catch (error) {
      console.error("Erro ao editar categoria", error);
    }
  };

  const deletarCategoria = async (id) => {
    try {
      await fetch(`http://localhost:3000/api/auth/categorias/${id}`, {
        method: "DELETE",
      });
      setCategorias((prevCategorias) =>
        prevCategorias.filter((categoria) => categoria._id !== id),
      );
    } catch (error) {
      console.error("Erro ao deletar categoria", error);
    }
  };

  // Funções para manipular subcategorias
  const adicionarSubcategoria = async (nomeSubcategoria, categoriaId) => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/auth/subcategorias",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: nomeSubcategoria, categoriaId }),
        },
      );
      const novaSubcategoria = await response.json();
      setCategorias((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria._id === categoriaId
            ? {
                ...categoria,
                subcategorias: [...categoria.subcategorias, novaSubcategoria],
              }
            : categoria,
        ),
      );
    } catch (error) {
      console.error("Erro ao adicionar subcategoria", error);
    }
  };

  const editarSubcategoria = async (id, subcategoriaEditada, categoriaId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/subcategorias/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: subcategoriaEditada }),
        },
      );
      const subcategoriaAtualizada = await response.json();
      setCategorias((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria._id === categoriaId
            ? {
                ...categoria,
                subcategorias: categoria.subcategorias.map((subcategoria) =>
                  subcategoria._id === id
                    ? subcategoriaAtualizada
                    : subcategoria,
                ),
              }
            : categoria,
        ),
      );
    } catch (error) {
      console.error("Erro ao editar subcategoria", error);
    }
  };

  const deletarSubcategoria = async (id, categoriaId) => {
    try {
      await fetch(`http://localhost:3000/api/auth/subcategorias/${id}`, {
        method: "DELETE",
      });
      setCategorias((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria._id === categoriaId
            ? {
                ...categoria,
                subcategorias: categoria.subcategorias.filter(
                  (subcategoria) => subcategoria._id !== id,
                ),
              }
            : categoria,
        ),
      );
    } catch (error) {
      console.error("Erro ao deletar subcategoria", error);
    }
  };

  // Funções para manipular matérias
  const adicionarMateria = async (nomeMateria, subcategoriaId, categoriaId) => {
    try {
      const response = await fetch("http://localhost:3000/api/auth/materias", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: nomeMateria, subcategoriaId }),
      });
      const novaMateria = await response.json();
      setCategorias((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria._id === categoriaId
            ? {
                ...categoria,
                subcategorias: categoria.subcategorias.map((subcategoria) =>
                  subcategoria._id === subcategoriaId
                    ? {
                        ...subcategoria,
                        materias: [...subcategoria.materias, novaMateria],
                      }
                    : subcategoria,
                ),
              }
            : categoria,
        ),
      );
    } catch (error) {
      console.error("Erro ao adicionar matéria", error);
    }
  };

  const editarMateria = async (
    id,
    materiaEditada,
    subcategoriaId,
    categoriaId,
  ) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/materias/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: materiaEditada }),
        },
      );
      const materiaAtualizada = await response.json();
      setCategorias((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria._id === categoriaId
            ? {
                ...categoria,
                subcategorias: categoria.subcategorias.map((subcategoria) =>
                  subcategoria._id === subcategoriaId
                    ? {
                        ...subcategoria,
                        materias: subcategoria.materias.map((materia) =>
                          materia._id === id ? materiaAtualizada : materia,
                        ),
                      }
                    : subcategoria,
                ),
              }
            : categoria,
        ),
      );
    } catch (error) {
      console.error("Erro ao editar matéria", error);
    }
  };

  const deletarMateria = async (id, subcategoriaId, categoriaId) => {
    try {
      await fetch(`http://localhost:3000/api/auth/materias/${id}`, {
        method: "DELETE",
      });
      setCategorias((prevCategorias) =>
        prevCategorias.map((categoria) =>
          categoria._id === categoriaId
            ? {
                ...categoria,
                subcategorias: categoria.subcategorias.map((subcategoria) =>
                  subcategoria._id === subcategoriaId
                    ? {
                        ...subcategoria,
                        materias: subcategoria.materias.filter(
                          (materia) => materia._id !== id,
                        ),
                      }
                    : subcategoria,
                ),
              }
            : categoria,
        ),
      );
    } catch (error) {
      console.error("Erro ao deletar matéria", error);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categorias,
        fetchCategorias,
        adicionarCategoria,
        editarCategoria,
        deletarCategoria,
        adicionarSubcategoria,
        editarSubcategoria,
        deletarSubcategoria,
        adicionarMateria,
        editarMateria,
        deletarMateria,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

CategoryProvider.propTypes = {
  children: PropTypes.node,
};
