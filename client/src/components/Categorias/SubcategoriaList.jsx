import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { colors } from "./../../styles/theme";
import MateriaList from "./Materias";
import { CategoryContext } from "../../context/CategoryContext";

const SubcategoriaList = ({ categoriaId }) => {
  const {
    categorias,
    adicionarSubcategoria,
    editarSubcategoria,
    deletarSubcategoria,
    fetchCategorias,
  } = useContext(CategoryContext);
  const [subcategorias, setSubcategorias] = useState([]);
  const [nomeSubcategoria, setNomeSubcategoria] = useState("");
  const [editSubcategoriaId, setEditSubcategoriaId] = useState(null);
  const [subcategoriaEditada, setSubcategoriaEditada] = useState("");

  useEffect(() => {
    const categoria = categorias.find((cat) => cat._id === categoriaId);
    if (categoria) {
      setSubcategorias(categoria.subcategorias);
    }
  }, [categorias, categoriaId]);

  const handleAdicionarSubcategoria = async () => {
    if (nomeSubcategoria.trim()) {
      await adicionarSubcategoria(nomeSubcategoria, categoriaId);
      setNomeSubcategoria(""); // Limpar o campo após adicionar
      fetchCategorias(); // Atualiza o contexto com as novas subcategorias
    }
  };
  useEffect(() => {
    console.log("editSubcategoriaId atualizado: ", editSubcategoriaId);
  }, [editSubcategoriaId]);

  const handleEditarSubcategoria = async (id) => {
    console.log(
      "Editando subcategoria ID: ",
      id,
      "com nome: ",
      subcategoriaEditada,
    );
    await editarSubcategoria(id, subcategoriaEditada, categoriaId);
    console.log(
      "Editando subcategoria ID: ",
      id,
      "com nome: ",
      subcategoriaEditada,
    );
    setEditSubcategoriaId(null);
    setSubcategoriaEditada("");
    fetchCategorias(); // Atualiza o contexto após edição
  };

  const handleDeletarSubcategoria = async (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta subcategoria?")) {
      await deletarSubcategoria(id, categoriaId);
      fetchCategorias(); // Atualiza o contexto após exclusão
    }
  };

  const getSubcategoriaStyle = (index) => ({
    background:
      index % 2 === 0 ? colors.light.Marrom[3] : colors.light.Marrom[3],
    color: colors.light.bege[1],
  });

  return (
    <div>
      <TextField
        label="Nova Subcategoria"
        variant="outlined"
        value={nomeSubcategoria}
        onChange={(e) => setNomeSubcategoria(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          endAdornment: (
            <IconButton color="primary" onClick={handleAdicionarSubcategoria}>
              <AddIcon />
            </IconButton>
          ),
        }}
      />

      <List
        sx={{
          p: {
            xs: 0,
            md: 2,
          },
          background: "rgba(19,8,1,0.2)",
          borderRadius: 1,
        }}
      >
        <Typography
          gutterBottom
          variant="h6"
          sx={{ color: colors.light.bege[2] }}
        >
          Lista de Subcategorias:
        </Typography>

        {Array.isArray(subcategorias) && subcategorias.length > 0 ? (
          subcategorias.map((subcategoria, index) => (
            <ListItem key={subcategoria._id}>
              <Accordion
                sx={{ width: "100%" }}
                style={getSubcategoriaStyle(index)}
              >
                <AccordionSummary
                  sx={{ width: "100%" }}
                  expandIcon={<ExpandMoreIcon />}
                >
                  <Box
                    sx={{
                      display: {
                        xs: "flex",
                        md: "grid",
                      },
                      gridTemplateColumns: "1fr 1fr 1fr",
                      flexDirection: {
                        xs: "Column",
                        md: "row",
                      },
                      gap: { xs: 1, md: 0 },
                      mt: { xs: 1, md: 0 },
                      mb: { xs: 1, md: 0 },
                      width: "100%",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {editSubcategoriaId === subcategoria._id ? (
                      <TextField
                        value={subcategoriaEditada}
                        onChange={(e) => setSubcategoriaEditada(e.target.value)}
                      />
                    ) : (
                      <Typography variant="h5" sx={getSubcategoriaStyle(index)}>
                        {subcategoria.name}
                      </Typography>
                    )}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: {
                          xs: "start",
                          md: "center",
                        },
                        gap: {
                          xs: 4,
                        },
                      }}
                    >
                      <IconButton
                        color="primary"
                        onClick={() => {
                          console.log("Subcategoria Name: ", subcategoria.name);
                          console.log("Subcategoria ID: ", subcategoria._id); // Verifique o ID
                          if (editSubcategoriaId === subcategoria._id) {
                            handleEditarSubcategoria(subcategoria._id); // Salvar a edição
                          } else {
                            setEditSubcategoriaId(subcategoria._id); // Entrar no modo de edição
                            setSubcategoriaEditada(subcategoria.name);
                          }
                        }}
                      >
                        {editSubcategoriaId === subcategoria._id ? (
                          <CheckCircleIcon /> // Mostrar ícone de salvar
                        ) : (
                          <EditIcon />
                        )}
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() =>
                          handleDeletarSubcategoria(subcategoria._id)
                        }
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Typography
                      sx={{ textAlign: { xs: "start", md: "end" } }}
                      variant="body2"
                    >
                      Categoria de número {index}
                    </Typography>
                  </Box>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography
                    variant="body1"
                    sx={{ color: colors.light.bege[2] }}
                  >
                    Adicione uma nova matéria a {subcategoria.name}
                  </Typography>
                  <MateriaList
                    subcategoriaId={subcategoria._id}
                    subcategoriaName={subcategoria.name}
                    categoriaId={categoriaId}
                  />
                </AccordionDetails>
              </Accordion>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" sx={{ color: colors.light.bege[2] }}>
            Nenhuma subcategoria encontrada.
          </Typography>
        )}
      </List>
    </div>
  );
};

SubcategoriaList.propTypes = {
  categoriaId: PropTypes.string.isRequired,
};

export default SubcategoriaList;
