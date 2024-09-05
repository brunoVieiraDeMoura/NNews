import React, { useState, useContext, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Button from "@mui/material/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../../context/AuthContext";
import { formatName } from "../../util/formatNameUtils";
const AcordionSobrePerfil = () => {
  const { updateUser } = useContext(AuthContext);

  const [profileData, setProfileData] = useState({
    description: "",
    favoriteBooks: ["", "", ""],
    readingRecommendations: ["", "", ""],
    socialLinks: {
      facebook: "",
      linkedin: "",
      twitter: "",
    },
  });

  const [editingState, setEditingState] = useState({
    description: false,
    favoriteBooks: false,
    readingRecommendations: false,
    socialLinks: false,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/profile", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData({
            description: data.description || "",
            favoriteBooks: data.favoriteBooks || ["", "", ""],
            readingRecommendations: data.readingRecommendations || [""],
            socialLinks: data.socialLinks || {
              facebook: "",
              linkedin: "",
              twitter: "",
            },
          });

          setEditingState({
            description: data.description.trim() === "",
            favoriteBooks: data.favoriteBooks.some(
              (book) => book.trim() === "",
            ),
            readingRecommendations: data.readingRecommendations.some(
              (rec) => rec.trim() === "",
            ),
            socialLinks: Object.values(data.socialLinks).some(
              (link) => link.trim() === "",
            ),
          });
        } else {
          console.error("Erro ao buscar perfil:", await response.text());
        }
      } catch (error) {
        console.error("Erro na solicitação:", error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = (section) => {
    setEditingState((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };

  const handleSave = async (section) => {
    setEditingState((prevState) => ({
      ...prevState,
      [section]: false,
    }));

    try {
      const response = await fetch("http://localhost:3000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      if (response.ok) {
        updateUser(data);
        setProfileData(data);
      } else {
        console.error("Erro ao atualizar perfil:", await response.text());
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  };
  const handleAddBook = () => {
    setProfileData((prevData) => ({
      ...prevData,
      favoriteBooks: [...prevData.favoriteBooks, ""],
    }));
  };
  const handleAddRecommendation = () => {
    setProfileData((prevData) => ({
      ...prevData,
      readingRecommendations: [...prevData.readingRecommendations, ""],
    }));
  };

  const handleDelete = async (section, index = null) => {
    try {
      const updatedData = { ...profileData };

      if (section === "description") {
        updatedData.description = " ";
      } else if (section === "favoriteBooks" && index !== null) {
        updatedData.favoriteBooks = updatedData.favoriteBooks.filter(
          (_, i) => i !== index,
        );
      } else if (section === "readingRecommendations" && index !== null) {
        // Deletar a recomendação de leitura no índice especificado
        updatedData.readingRecommendations =
          updatedData.readingRecommendations.filter((_, i) => i !== index);
      } else if (section === "socialLinks") {
        updatedData.socialLinks = {
          facebook: "",
          linkedin: "",
          twitter: "",
        };
      }

      const response = await fetch("http://localhost:3000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.description === " ") data.description = "";
        updateUser(data);
        setProfileData(data);
      } else {
        console.error("Erro ao atualizar perfil:", await response.text());
      }
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  };

  const handleChange = (section, index, event) => {
    const { name, value } = event.target;

    if (section === "description") {
      setProfileData((prevData) => ({
        ...prevData,
        description: value === " " ? "" : value,
      }));
    } else if (section === "favoriteBooks") {
      setProfileData((prevData) => {
        const updatedBooks = [...prevData.favoriteBooks];
        updatedBooks[index] = value;
        return {
          ...prevData,
          favoriteBooks: updatedBooks,
        };
      });
    } else if (section === "readingRecommendations") {
      setProfileData((prevData) => {
        const updatedRecommendations = [...prevData.readingRecommendations];
        updatedRecommendations[index] = value;
        return {
          ...prevData,
          readingRecommendations: updatedRecommendations,
        };
      });
    } else if (section === "socialLinks") {
      setProfileData((prevData) => ({
        ...prevData,
        socialLinks: {
          ...prevData.socialLinks,
          [name]: value,
        },
      }));
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      {/* Descrição */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Descrição do Perfil</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={profileData.description}
            onChange={(event) => handleChange("description", null, event)}
            placeholder="Digite sua descrição aqui..."
            label="Digite sua descrição aqui..."
            disabled={!editingState.description}
            inputProps={{ maxLength: 1000 }}
            sx={{
              background: editingState.description ? "rgba(0,0,0,.1)" : "",
              borderRadius: 1,
            }}
          />
          <Stack direction="row" spacing={1} mt={2}>
            <Button
              variant="contained"
              color={editingState.description ? "secondary" : "primary"}
              startIcon={
                editingState.description ? <CheckIcon /> : <EditIcon />
              }
              onClick={() =>
                editingState.description
                  ? handleSave("description")
                  : handleEditToggle("description")
              }
            >
              {editingState.description ? "Salvar" : "Editar"}
            </Button>
            {editingState.description && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleEditToggle("description")}
              >
                Cancelar
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              startIcon={!editingState.description ? null : <DeleteIcon />}
              onClick={() => handleDelete("description")}
              sx={{ display: !editingState.description ? "none" : "" }}
            >
              Deletar
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Top 3 Livros */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Ranking de Livros</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {profileData.favoriteBooks.map((book, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <TextField
                label={`${index} - Livro`}
                value={book}
                onChange={(event) =>
                  handleChange("favoriteBooks", index, event)
                }
                placeholder={`Livro ${index + 1}`}
                fullWidth
                disabled={!editingState.favoriteBooks}
                sx={{
                  mb: 1,
                  background: editingState.favoriteBooks
                    ? "rgba(0,0,0,.1)"
                    : "",
                  borderRadius: 1,
                }}
              />
              {editingState.favoriteBooks && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete("favoriteBooks", index)}
                >
                  Deletar Livro : {formatName(profileData.favoriteBooks[index])}
                </Button>
              )}
            </Box>
          ))}
          <Stack direction="row" spacing={1} mt={2}>
            <Button
              variant="contained"
              color={editingState.favoriteBooks ? "secondary" : "primary"}
              startIcon={
                editingState.favoriteBooks ? <CheckIcon /> : <EditIcon />
              }
              onClick={() =>
                editingState.favoriteBooks
                  ? handleSave("favoriteBooks")
                  : handleEditToggle("favoriteBooks")
              }
            >
              {editingState.favoriteBooks ? "Salvar" : "Editar"}
            </Button>
            {editingState.favoriteBooks && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleEditToggle("favoriteBooks")}
              >
                Cancelar
              </Button>
            )}
            {editingState.favoriteBooks && (
              <Button
                variant="outlined"
                color="success.light"
                onClick={handleAddBook} // Botão para adicionar novo livro
                sx={{ mt: 2 }}
              >
                Adicionar Livro
              </Button>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Recomendações de Leitura */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Recomendações de Leitura</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {profileData.readingRecommendations.map((rec, index) => (
            <Box key={index} sx={{ mb: 1 }}>
              <TextField
                label={`${index} - Recomendação`}
                value={rec}
                onChange={(event) =>
                  handleChange("readingRecommendations", index, event)
                }
                placeholder={`Recomendação ${index + 1}`}
                fullWidth
                disabled={!editingState.readingRecommendations}
                sx={{
                  mb: 1,
                  background: editingState.readingRecommendations
                    ? "rgba(0,0,0,.1)"
                    : "",
                  borderRadius: 1,
                }}
              />
              {editingState.readingRecommendations && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete("readingRecommendations", index)}
                >
                  Deletar Recomendação :{" "}
                  {formatName(profileData.readingRecommendations[index])}
                </Button>
              )}
            </Box>
          ))}
          <Stack direction="row" spacing={1} mt={2}>
            <Button
              variant="contained"
              color={
                editingState.readingRecommendations ? "secondary" : "primary"
              }
              startIcon={
                editingState.readingRecommendations ? (
                  <CheckIcon />
                ) : (
                  <EditIcon />
                )
              }
              onClick={() =>
                editingState.readingRecommendations
                  ? handleSave("readingRecommendations")
                  : handleEditToggle("readingRecommendations")
              }
            >
              {editingState.readingRecommendations ? "Salvar" : "Editar"}
            </Button>
            {editingState.readingRecommendations && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleEditToggle("readingRecommendations")}
              >
                Cancelar
              </Button>
            )}
            {editingState.readingRecommendations && (
              <Button
                variant="outlined"
                color=""
                onClick={handleAddRecommendation} // Botão para adicionar nova recomendação
                sx={{ mt: 2 }}
              >
                Adicionar Recomendação
              </Button>
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>

      {/* Links Sociais */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Links Sociais</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {Object.entries(profileData.socialLinks).map(([key, link]) => (
            <TextField
              key={key}
              name={key}
              value={link}
              label={`Link do ${key}`}
              onChange={(event) => handleChange("socialLinks", null, event)}
              placeholder={`Link para ${key}`}
              fullWidth
              disabled={!editingState.socialLinks}
              sx={{
                mb: 1,
                background: editingState.socialLinks ? "rgba(0,0,0,.1)" : "",
                borderRadius: 1,
              }}
            />
          ))}
          <Stack direction="row" spacing={1} mt={2}>
            <Button
              variant="contained"
              color={editingState.socialLinks ? "secondary" : "primary"}
              startIcon={
                editingState.socialLinks ? <CheckIcon /> : <EditIcon />
              }
              onClick={() =>
                editingState.socialLinks
                  ? handleSave("socialLinks")
                  : handleEditToggle("socialLinks")
              }
            >
              {editingState.socialLinks ? "Salvar" : "Editar"}
            </Button>
            {editingState.socialLinks && (
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => handleEditToggle("socialLinks")}
              >
                Cancelar
              </Button>
            )}
            <Button
              variant="outlined"
              color="error"
              startIcon={!editingState.socialLinks ? null : <DeleteIcon />}
              onClick={() => handleDelete("socialLinks")}
              disabled={!editingState.socialLinks}
              sx={{ display: !editingState.socialLinks ? "none" : "" }}
            >
              Deletar
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default AcordionSobrePerfil;
