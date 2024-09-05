import React, { useState, useContext } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "@mui/material/Link";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close";
import { AuthContext } from "../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import PropTypes from "prop-types";
const Login = ({ onItemClick }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberUser, setRememberUser] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const text = await response.text(); // Obtenha o texto da resposta

      if (!response.ok) {
        console.error("Login error response:", text);
        throw new Error(text || "Erro desconhecido");
      }

      const data = text ? JSON.parse(text) : null;

      if (data) {
        localStorage.setItem("token", data.token);
        if (data.user) {
          localStorage.setItem("userId", data.user._id);
          localStorage.setItem("userName", data.user.name);
          login(data.user, data.token);
        }

        setAlertSeverity("success");
        setAlertMessage("Login realizado com sucesso!");
      } else {
        setAlertSeverity("error");
        setAlertMessage("Ocorreu um erro ao tentar fazer login.");
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login:", error);
      setAlertSeverity("error");
      setAlertMessage(
        "Ocorreu um erro ao tentar fazer login: " + error.message,
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (response) => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/auth/google/callback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: response.credential }), // Envia o token do Google ao backend
        },
      );

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        if (data.user) {
          localStorage.setItem("userId", data.user._id);
          localStorage.setItem("userName", data.user.name);
          localStorage.setItem("userPicture", data.user.picture);
          login(data.user, data.token);
        }
      } else {
        console.error("Erro no login com Google:", data.msg);
      }
    } catch (error) {
      console.error("Erro ao tentar fazer login com Google:", error);
    }
  };

  const handleGoogleFailure = (error) => {
    console.error("Erro ao fazer login com Google", error);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        position: "relative",
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: {
            xs: "flex",
            md: "grid",
          },
          flexDirection: "Column",
          gridTemplateColumns: {
            md: "1fr 1fr",
          },
          width: "100%",
          maxWidth: "1300px",
        }}
      >
        {alertMessage && (
          <Alert
            severity={alertSeverity}
            sx={{ position: "fixed", top: 10, zIndex: 1200, width: "90%" }}
          >
            {alertMessage}
            <IconButton
              aria-label="close"
              size="small"
              onClick={() => setAlertMessage(null)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          </Alert>
        )}
        <Container className="animate__animated animate__fadeIn">
          <Box
            sx={{
              width: {
                xs: "100%",
                md: "90%",
              },
              mt: {
                xs: 1,
                md: 0,
              },
              p: 4,
              borderRadius: 1,
              background: "rgba(192,220,180,.08)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Login
            </Typography>
            <form
              onSubmit={handleSubmit}
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "Column",
                justifyContent: "center",
              }}
              noValidate
            >
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                label="Senha"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberUser}
                    onChange={(e) => setRememberUser(e.target.checked)}
                    color="primary"
                  />
                }
                label="Lembrar usuário"
                sx={{ mt: 2 }}
              />
              <Link
                href="/esqueceu-senha"
                variant="body2"
                color="textSecondary"
                sx={{ display: "block", textAlign: "right", mt: 1 }}
              >
                Esqueceu a senha?
              </Link>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "Column",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 3 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Entrar"}
                </Button>
                <Typography>ou</Typography>
                <Box
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                >
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleFailure}
                  />
                </Box>
              </Box>
            </form>
          </Box>
        </Container>
        <Box
          className="animate__animated animate__rubberBand"
          sx={{
            width: "100%",
            p: 2,
            mt: {
              xs: 2,
              md: 0,
            },
            display: "flex",
            flexDirection: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              borderRadius: 1,
              width: {
                xs: "100%",
                md: "70%",
              },
              p: {
                xs: 4,
                md: 0,
              },
              background: {
                xs: "rgba(192,220,180,.08)",
                md: "none",
              },
              textAlign: "center",
            }}
          >
            <Typography variant="h4" gutterBottom color="textPrimary">
              Não possui conta?
            </Typography>
            <Typography variant="body1">
              Cadastre-se agora na nossa newsletter e tenha acesso exclusivo a
              todos os conteúdos do nosso site. Fique por dentro das últimas
              notícias sobre escritores, explore nossos audiobooks e participe
              das discussões comentando em todas as matérias. Junte-se a nós e
              mantenha-se informado!
            </Typography>
            <Button
              sx={{ mt: 2 }}
              variant="contained"
              color="secondary"
              onClick={onItemClick}
            >
              Cadastre-se
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

Login.propTypes = {
  onItemClick: PropTypes.func,
};

export default Login;
