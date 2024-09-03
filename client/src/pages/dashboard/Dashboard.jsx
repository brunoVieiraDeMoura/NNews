import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (user) {
      setUserName(user.name); // Atualiza o nome do usuário quando ele estiver disponível
    } else {
      navigate("/");
    }
  }, [user]);

  if (loading) {
    return <Typography variant="h6">Carregando...</Typography>; // Exibe um carregando enquanto valida o token
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Bem-vindo, {userName}!
      </Typography>
      <Box
        sx={{
          borderRadius: "50%",
          width: "40px",
          height: {
            xs: "40px",
          },
          backgroundImage: `url(${user.picture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Typography variant="body1" gutterBottom>
        Este é o seu painel de controle.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={logout}
        sx={{ mt: 2 }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Dashboard;
