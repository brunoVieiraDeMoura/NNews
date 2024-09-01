import React from "react";
import { useLocation } from "react-router-dom";
import AppBar from "./AppBar";
import SubAppBar from "./SubAppBar";
import Footer from "./Footer";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import routeComponentMap from "../components/routes/routeComponentMap";
import NotFound from "../components/ListLeft/NotFound";
import Home from "./../pages/home/Home";

const MainContainer = ({ onTheme }) => {
  const location = useLocation();
  const Component = routeComponentMap[location.pathname] || Home || NotFound;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "Column",
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          width: "100%",
        }}
      >
        <AppBar onTheme={onTheme} />
        <SubAppBar />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Breadcrumb />
        <Component />
      </Box>
      <Footer sx={{ width: "100%" }} />
    </Box>
  );
};
MainContainer.propTypes = {
  onTheme: PropTypes.func,
};

export default MainContainer;
