import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const Home = ({ onTheme }) => {
  return (
    <>
      <Grid container sx={{ p: 3 }}>
        <Typography variant="h3">
          Lula indica Gabriel Galípolo para a Presidência do Banco Central
        </Typography>
        <Typography variant="body1">
          Anúncio foi feito pelo ministro da Fazenda, Fernando Haddad, no
          Palácio do Planalto. Antes de assumir o cargo, Galípolo precisa ser
          sabatinado e receber aval do Senado.
        </Typography>
        <Button onClick={onTheme} variant="outlined" color="primary">
          Registrar
        </Button>
        <Button onClick={onTheme} variant="outlined" color="secondary">
          Registrar
        </Button>
      </Grid>
    </>
  );
};

Home.propTypes = {
  onTheme: PropTypes.func.isRequired,
};

export default Home;
