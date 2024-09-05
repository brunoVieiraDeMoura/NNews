import React from "react";
import CategoriaList from "../../components/Categorias/CategoriaList";
import Box from "@mui/material/Box";

const ListDashBoard = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "Column",
      }}
    >
      <Box
        sx={{
          p: {
            xs: 0,
            md: 3,
          },
          mt: 2,
          width: "100%",
          maxWidth: "1300px",
        }}
      >
        <CategoriaList />
      </Box>
    </Box>
  );
};

export default ListDashBoard;
