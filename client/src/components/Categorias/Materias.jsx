import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { colors } from "../../styles/theme";
import { CategoryContext } from "../../context/CategoryContext";
import SendAndArchiveIcon from "@mui/icons-material/SendAndArchive";
const MateriaList = ({ subcategoriaId, subcategoriaName, categoriaId }) => {
  const { adicionarMateria, editarMateria, deletarMateria } =
    useContext(CategoryContext);

  const [materias, setMaterias] = useState([]);
  const [nomeMateria, setNomeMateria] = useState("");
  const [editMateriaId, setEditMateriaId] = useState(null);
  const [materiaEditada, setMateriaEditada] = useState("");
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchMaterias();
  }, [subcategoriaId]);

  const fetchMaterias = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/auth/materias?subcategoriaId=${subcategoriaId}`,
      );
      const data = await response.json();
      const materiasComIndex = data.map((materia, index) => ({
        ...materia,
        originalIndex: index, // Adiciona o índice do banco, começando em 1
      }));
      setMaterias(materiasComIndex);
    } catch (error) {
      console.error("Erro ao buscar matérias", error);
    }
  };

  const handleAdicionarMateria = async () => {
    if (nomeMateria.trim()) {
      await adicionarMateria(nomeMateria, subcategoriaId, categoriaId);
      setNomeMateria(""); // Limpa o campo de texto
      fetchMaterias(); // Atualiza a lista de matérias
    }
  };

  const handleEditarMateria = async (id) => {
    await editarMateria(id, materiaEditada, subcategoriaId, categoriaId);
    setEditMateriaId(null);
    setMateriaEditada("");
    fetchMaterias(); // Atualiza a lista de matérias
  };

  const handleDeletarMateria = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta matéria?")) {
      await deletarMateria(id, subcategoriaId, categoriaId);
      fetchMaterias(); // Atualiza a lista de matérias
    }
  };

  const getMateriaStyle = (index) => ({
    background: index % 2 === 0 ? colors.light.claro[1] : colors.light.claro[3],
    color: colors.light.Marrom[4],
  });

  const filteredMaterias = materias
    .filter((materia, index) => {
      const lowerSearchText = searchText.toLowerCase();
      return (
        materia.name.toLowerCase().includes(lowerSearchText) || // Filtra pelo nome
        index.toString().includes(lowerSearchText) // Filtra pelo índice
      );
    })
    .reverse();

  return (
    <div>
      <TextField
        label="Nova Matéria"
        variant="outlined"
        value={nomeMateria}
        onChange={(e) => setNomeMateria(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <IconButton color="primary" onClick={handleAdicionarMateria}>
              <AddIcon />
            </IconButton>
          ),
        }}
      />
      <List>
        <Box sx={{ p: 2, background: "rgba(19,8,1,0.5)" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h6" sx={{ color: colors.light.bege[2] }}>
              <strong>Lista de Matérias</strong> da subcategoria:{" "}
              <strong>{subcategoriaName}</strong>
            </Typography>
            <TextField
              label="Pesquisar Matéria"
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              size="small"
            />
          </Box>

          {filteredMaterias.map((materia, index) => (
            <ListItem key={materia._id} sx={getMateriaStyle(index)}>
              <Box
                sx={{
                  display: { xs: "flex", md: "grid" },
                  gridTemplateColumns: "1fr 1fr 1fr",
                  flexDirection: {
                    xs: "Column",
                    md: "none",
                  },
                  gap: { xs: 1, md: 0 },
                  mt: { xs: 1, md: 0 },
                  mb: { xs: 1, md: 0 },
                  width: "100%",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {editMateriaId === materia._id ? (
                  <TextField
                    value={materiaEditada}
                    onChange={(e) => setMateriaEditada(e.target.value)}
                  />
                ) : (
                  <Typography variant="body1">
                    <strong>{materia.name}</strong>
                  </Typography>
                )}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "start", md: "center" },
                    gap: { xs: 4 },
                  }}
                >
                  <IconButton
                    color="primary"
                    onClick={() => {
                      if (editMateriaId === materia._id) {
                        handleEditarMateria(materia._id);
                      } else {
                        setEditMateriaId(materia._id);
                        setMateriaEditada(materia.name);
                      }
                    }}
                  >
                    {editMateriaId === materia._id ? (
                      <CheckCircleIcon />
                    ) : (
                      <EditIcon />
                    )}
                  </IconButton>
                  <IconButton>
                    <SendAndArchiveIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeletarMateria(materia._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
                <Typography sx={{ textAlign: "end" }} variant="body2">
                  {materia.originalIndex}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </Box>
      </List>
    </div>
  );
};

MateriaList.propTypes = {
  subcategoriaId: PropTypes.string.isRequired,
  subcategoriaName: PropTypes.string.isRequired,
  categoriaId: PropTypes.string.isRequired,
};

export default MateriaList;
