import React from "react";
import AppBar from "./AppBar";
import SubAppBar from "./SubAppBar";
import Footer from "./Footer";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";

const MainContainer = ({ children, onTheme }) => {
  return (
    <Box>
      <AppBar onTheme={onTheme} />
      <SubAppBar />
      <Box sx={{ padding: "20px" }}>
        <Breadcrumb />
        {children}
      </Box>
      <Footer />
    </Box>
  );
};
MainContainer.propTypes = {
  children: PropTypes.node.isRequired,
  onTheme: PropTypes.func,
};

export default MainContainer;
