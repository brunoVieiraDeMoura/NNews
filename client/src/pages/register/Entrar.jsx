import React, { useState } from "react";
import Box from "@mui/material/Box";
import Login from "./Login";
import PropTypes from "prop-types";
import Registrar from "./Registrar";

const Entrar = ({ onItemClick: onItemClickProp }) => {
  const [possuiConta, setPossuiConta] = useState(false);

  const onItemClick = (e) => {
    e.preventDefault();
    setPossuiConta(!possuiConta);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    if (onItemClickProp) {
      onItemClickProp(e);
    }
  };

  console.log(possuiConta);

  return (
    <Box
      sx={{
        width: "100%",
        height: {
          xs: "auto",
          md: "600px",
        },
        display: {
          xs: "block",
          md: "flex",
        },
        alignItems: {
          xs: "none",
          md: "center",
        },
      }}
    >
      {possuiConta ? (
        <Registrar onItemClick={onItemClick} />
      ) : (
        <Login onItemClick={onItemClick} />
      )}
    </Box>
  );
};

Entrar.propTypes = {
  onItemClick: PropTypes.func,
};

export default Entrar;
