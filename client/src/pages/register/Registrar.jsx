import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CloseIcon from "@mui/icons-material/Close"; // Ícone de fechar
import useForm from "../../hooks/useForm";
import useFetchIn from "../../hooks/useFetchIn";
import PropTypes from "prop-types";

const Registrar = ({ onItemClick }) => {
  const name = useForm();
  const email = useForm("email");
  const password = useForm("password");
  const confirmPassword = useForm("password");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertSeverity, setAlertSeverity] = useState("success");
  const [nameTouched, setNameTouched] = useState(false);

  const { loading, status, fetchData } = useFetchIn();

  // useEffect para verificar se as senhas coincidem ao atualizar os valores de password ou confirmPassword
  useEffect(() => {
    if (password.value && confirmPassword.value) {
      if (password.value !== confirmPassword.value) {
        setPasswordError("As senhas não coincidem.");
      } else {
        setPasswordError("");
      }
    } else {
      setPasswordError("");
    }
  }, [password.value, confirmPassword.value]);

  // Mostrar alert por 8 segundos
  useEffect(() => {
    if (alertMessage) {
      const timer = setTimeout(() => {
        setAlertMessage(null);
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [alertMessage]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid =
      name.validate() &&
      email.validate() &&
      password.validate() &&
      confirmPassword.validate() &&
      password.value === confirmPassword.value;

    if (!isValid) {
      setAlertSeverity("error");
      setAlertMessage("Por favor, preencha todos os campos corretamente.");
      return;
    }

    fetchData("/register", "POST", {
      name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value,
    });
  };

  useEffect(() => {
    if (status === 201) {
      setAlertSeverity("success");
      setAlertMessage("Sucesso! Usuário registrado com sucesso!");
      name.setValue("");
      email.setValue("");
      password.setValue("");
      confirmPassword.setValue("");
      setNameTouched(false); // Resetar o estado de touched
    } else if (status && status !== 201) {
      setAlertSeverity("error");
      setAlertMessage("Ocorreu um erro ao tentar registrar o usuário.");
    }
  }, [status]);

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
      {/* Alert no topo da tela */}
      {alertMessage && (
        <Alert
          severity={alertSeverity}
          sx={{
            position: "fixed",

            top: 10,
            left: "auto",
            right: "auto",
            borderRadius: 1,
            zIndex: 1200,
            width: {
              xs: "90%",
              md: "42%",
            },
          }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setAlertMessage(null)}
            >
              <CloseIcon
                sx={{
                  color: "#a7a7a7a7",
                }}
                fontSize="inherit"
              />
            </IconButton>
          }
        >
          {alertMessage}
        </Alert>
      )}
      <Box
        sx={{
          display: {
            xs: "flex",
            md: "grid",
          },
          flexDirection: {
            xs: "Column",
            md: "none",
          },
          gridTemplateColumns: {
            md: "1fr 1fr",
          },
          width: "100%",
          maxWidth: "1300px",
        }}
      >
        <Box
          className="animate__animated animate__rubberBand"
          sx={{
            mt: {
              xs: 2,
              md: 0,
            },

            width: "100%",
            p: 2,
            display: "flex",
            flexDirection: "center",
            justifyContent: "center",
            alignItems: "center",
            order: {
              xs: "2",
              md: "0",
            },
          }}
        >
          <Box
            sx={{
              background: {
                xs: "rgba(192,220,180,.06)",
                md: "none",
              },
              p: {
                xs: 4,
                md: 0,
              },
              borderRadius: 1,
              width: {
                xs: "100%",
                md: "70%",
              },
              textAlign: "center",
            }}
          >
            <Typography variant="h4" gutterBottom color="textPrimary">
              Já Possui conta?
            </Typography>
            <Typography variant="body1">
              Faça login agora para acessar todo o conteúdo exclusivo do nosso
              site. Continue acompanhando as últimas notícias sobre escritores,
              explore nossos audiobooks e participe das discussões nos
              comentários. Estamos ansiosos para tê-lo de volta!
            </Typography>
            <Button
              sx={{ mt: 2, width: "60%" }}
              variant="contained"
              color="secondary"
              onClick={onItemClick}
            >
              Entrar Agora
            </Button>
          </Box>
        </Box>

        <Container
          className="animate__animated animate__fadeIn"
          sx={{
            display: {
              xs: "flex",
            },
            mt: {
              xs: 1,
              md: 0,
            },
            order: {
              xs: "1",
              md: "0",
            },
          }}
        >
          <Box
            sx={{
              width: {
                xs: "100%",
                md: '"90%"',
              },
              p: 4,
              borderRadius: 1,
              background: "rgba(192,220,180,.06)",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              Cadastre-se
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 2 }}
            >
              <TextField
                label="Nome"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name.value}
                onChange={(e) => {
                  name.onChange(e);
                  if (!nameTouched) setNameTouched(true);
                }}
                onBlur={(e) => {
                  name.onBlur(e);
                  setNameTouched(true);
                }}
                error={!!name.error || (nameTouched && !name.value)}
                helperText={
                  name.error ||
                  (nameTouched && !name.value && "O nome é obrigatório")
                }
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email.value}
                onChange={email.onChange}
                onBlur={email.onBlur}
                error={!!email.error}
                helperText={email.error}
              />
              <TextField
                label="Senha"
                type={showPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="normal"
                value={password.value}
                onChange={password.onChange}
                onBlur={password.onBlur}
                error={!!password.error}
                helperText={password.error}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Confirmar Senha"
                type={showConfirmPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                margin="normal"
                value={confirmPassword.value}
                onChange={confirmPassword.onChange}
                onBlur={confirmPassword.onBlur}
                error={!!confirmPassword.error || !!passwordError}
                helperText={confirmPassword.error || passwordError}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle confirm password visibility"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                sx={{ mt: 3 }}
                disabled={loading || !!passwordError} // Desabilita o botão se houver erro nas senhas
              >
                {loading ? <CircularProgress size={24} /> : "Cadastrar"}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

Registrar.propTypes = {
  onItemClick: PropTypes.func,
};

export default Registrar;
