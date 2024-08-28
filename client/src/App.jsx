import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme } from "./styles/theme.js";
import { darkTheme } from "./styles/theme.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  console.log(isDarkMode);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home onTheme={toggleTheme} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
