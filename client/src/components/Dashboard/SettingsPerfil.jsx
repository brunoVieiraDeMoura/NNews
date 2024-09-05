import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AuthContext } from "../../context/AuthContext";

const SettingsPerfil = () => {
  const { user, updateUser } = useContext(AuthContext);

  // Estados para armazenar os dados a serem alterados
  const [openDialog, setOpenDialog] = useState(null);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
  });

  // Estado para o Snackbar de feedback
  const [openSnackbar, setOpenSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Função para abrir o diálogo correto (nome, email ou senha)
  const handleOpenDialog = (field) => {
    setOpenDialog(field);
  };

  // Função para fechar o diálogo
  const handleCloseDialog = () => {
    setOpenDialog(null);
  };

  // Função para lidar com as mudanças no TextField
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Função para fechar o Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar({ ...openSnackbar, open: false });
  };

  // Função de envio para atualizar o perfil
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Exemplo de requisição para o backend
    try {
      const res = await fetch("http://localhost:3000/api/auth/update-profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        updateUser(data.user); // Atualiza o usuário no contexto
        setOpenSnackbar({
          open: true,
          message: "Perfil atualizado com sucesso!",
          severity: "success",
        });
      } else {
        setOpenSnackbar({
          open: true,
          message: data.msg || "Erro ao atualizar perfil.",
          severity: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setOpenSnackbar({
        open: true,
        message: "Erro ao tentar atualizar perfil.",
        severity: "error",
      });
    }

    handleCloseDialog();
  };

  return (
    <Box
      sx={{
        maxWidth: 500,
        margin: "auto",
        display: "flex",
        flexDirection: "Column",
        background: "rgba(255,176,80,.01)",
        borderRadius: 1,
        p: 2,
        width: "100%",
        height: "100%",
        gap: 2,
      }}
    >
      <Typography color="textPrimary" variant="h5" mb={2}>
        Alterar Dados
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "Column",
          gap: 3,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              overflow: {
                xs: "hidden",
                md: "visible",
              },
              textOverflow: {
                xs: "ellipsis",
                md: "none",
              },
              whiteSpace: {
                xs: "nowrap",
                md: "none",
              },
              maxWidth: {
                xs: "200px",
                md: "auto",
              },
            }}
          >
            <span style={{ fontWeight: "bold" }}>Alterar Nome</span>
            <br></br> {user.name}
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleOpenDialog("name")}
          >
            Editar Nome
          </Button>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              overflow: {
                xs: "hidden",
                md: "visible",
              },
              textOverflow: {
                xs: "ellipsis",
                md: "none",
              },
              whiteSpace: {
                xs: "nowrap",
                md: "none",
              },
              maxWidth: {
                xs: "200px",
                md: "auto",
              },
            }}
          >
            <span style={{ fontWeight: "bold" }}>Alterar Email</span>
            <br></br> {user.email}
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleOpenDialog("email")}
          >
            Editar Email
          </Button>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "3fr 2fr",
            gap: 1,
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              overflow: {
                xs: "hidden",
                md: "visible",
              },
              textOverflow: {
                xs: "ellipsis",
                md: "none",
              },
              whiteSpace: {
                xs: "nowrap",
                md: "none",
              },
              maxWidth: {
                xs: "200px",
                md: "auto",
              },
            }}
          >
            <span style={{ fontWeight: "bold" }}>Alterar Senha</span>
          </Typography>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleOpenDialog("password")}
          >
            Editar Senha
          </Button>
        </Box>
      </Box>

      {/* Diálogo para Alterar Nome */}
      <Dialog open={openDialog === "name"} onClose={handleCloseDialog}>
        <DialogTitle color="textPrimary">Alterar Nome</DialogTitle>
        <DialogContent>
          <Typography mb={2}>
            Essa ação irá{" "}
            <span style={{ fontWeight: "bold" }}>
              modificar o seu nome de usuário
            </span>
            . Tem certeza de que deseja prosseguir com a alteração?
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Novo Nome"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} color="secondary" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para Alterar Email */}
      <Dialog open={openDialog === "email"} onClose={handleCloseDialog}>
        <DialogTitle color="textPrimary">Alterar Email</DialogTitle>
        <DialogContent>
          <Typography mb={2}>
            Essa ação irá{" "}
            <span style={{ fontWeight: "bold" }}>modificar o seu email</span>.
            Tem certeza de que deseja prosseguir com a alteração?
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Novo Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} color="secondary" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para Alterar Senha */}
      <Dialog open={openDialog === "password"} onClose={handleCloseDialog}>
        <DialogTitle color="textPrimary">Alterar Senha</DialogTitle>
        <DialogContent>
          <Typography mb={2}>
            Essa ação irá{" "}
            <span style={{ fontWeight: "bold" }}>
              modificar o sua senha de acesso
            </span>
            . Tem certeza de que deseja prosseguir com a alteração?
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Senha Atual"
            name="currentPassword"
            type="password"
            value={formData.currentPassword}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Nova Senha"
            name="newPassword"
            type="password"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} color="secondary" variant="contained">
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar para feedback */}
      <Snackbar
        open={openSnackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={openSnackbar.severity}
          sx={{ width: "100%" }}
        >
          {openSnackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPerfil;
