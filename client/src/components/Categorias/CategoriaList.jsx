import React, { useContext, useState } from "react";
import SubcategoriaList from "./SubcategoriaList";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { colors } from "../../styles/theme.js";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { CategoryContext } from "../../context/CategoryContext";

const CategoriaList = () => {
  const [nomeCategoria, setNomeCategoria] = useState("");
  const [editCategoriaId, setEditCategoriaId] = useState(null);
  const [categoriaEditada, setCategoriaEditada] = useState("");
  const { categorias, adicionarCategoria, editarCategoria, deletarCategoria } =
    useContext(CategoryContext);

  const theme = colors;

  const handleAdicionarCategoria = () => {
    if (nomeCategoria.trim()) {
      adicionarCategoria(nomeCategoria);
      setNomeCategoria("");
    }
  };

  const handleEditarCategoria = (id) => {
    editarCategoria(id, categoriaEditada);
    setEditCategoriaId(null);
    setCategoriaEditada("");
  };

  const handleDeletarCategoria = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta categoria?")) {
      deletarCategoria(id);
    }
  };

  const getAccordionStyle = (index) => {
    if (index % 2 === 0) {
      return {
        background: theme.light.Marrom[4],
        color: theme.light.bege[1],
      };
    } else {
      return {
        background: theme.light.claro[3],
        color: theme.light.bege[1],
      };
    }
  };

  return (
    <div>
      <Typography
        variant="h4"
        color="textPrimary"
        sx={{ textAlign: "center" }}
        gutterBottom
      >
        Gerenciamento de Categorias
      </Typography>
      <Box
        sx={{
          background: theme.light.Marrom[3],
          p: { xs: "16px 0px", md: 4 },
          mt: { xs: 2, md: 6 },
          borderRadius: 1,
        }}
      >
        <Typography
          variant="h5"
          sx={{
            ml: { xs: 2, md: 0 },
            mr: { xs: 2, md: 0 },
            color: theme.light.bege[1],
          }}
          gutterBottom
        >
          Adicionar Categorias
        </Typography>
        <Box sx={{ p: { xs: "0px 16px", md: "0px" } }}>
          <TextField
            label="Adicione aqui uma Nova Categoria"
            variant="outlined"
            value={nomeCategoria}
            onChange={(e) => setNomeCategoria(e.target.value)}
            fullWidth
            margin="normal"
            InputProps={{
              endAdornment: (
                <IconButton color="primary" onClick={handleAdicionarCategoria}>
                  <AddIcon />
                </IconButton>
              ),
            }}
          />
        </Box>

        <List
          sx={{
            width: "100%",
            p: { xs: 0, md: 2 },
            background: { xs: "", md: "rgba(19,8,1,0.3)" },
            borderRadius: 1,
          }}
        >
          <Typography
            gutterBottom
            variant="h6"
            sx={{
              ml: { xs: 2, md: 0 },
              mr: { xs: 2, md: 0 },
              color: theme.light.bege[2],
            }}
          >
            Lista de Categorias:
          </Typography>
          {categorias.map((categoria, index) => (
            <ListItem sx={{ width: "100%" }} key={categoria._id}>
              <Accordion
                sx={{ width: "100%" }}
                style={getAccordionStyle(index)}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
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
                    {editCategoriaId === categoria._id ? (
                      <TextField
                        value={categoriaEditada}
                        onChange={(e) => setCategoriaEditada(e.target.value)}
                      />
                    ) : (
                      <Typography
                        style={getAccordionStyle(index)}
                        variant="h6"
                        sx={{ flexGrow: 1 }}
                      >
                        {categoria.name}
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
                          if (editCategoriaId === categoria._id) {
                            handleEditarCategoria(categoria._id);
                          } else {
                            setEditCategoriaId(categoria._id);
                            setCategoriaEditada(categoria.name);
                          }
                        }}
                      >
                        {editCategoriaId === categoria._id ? (
                          <CheckCircleIcon />
                        ) : (
                          <EditIcon />
                        )}
                      </IconButton>
                      <IconButton
                        color="secondary"
                        onClick={() => handleDeletarCategoria(categoria._id)}
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
                  <Typography variant="h7" sx={{ color: theme.light.bege[2] }}>
                    Adicionar Subcategoria
                  </Typography>
                  <SubcategoriaList categoriaId={categoria._id} />
                </AccordionDetails>
              </Accordion>
            </ListItem>
          ))}
        </List>
      </Box>
    </div>
  );
};

export default CategoriaList;
