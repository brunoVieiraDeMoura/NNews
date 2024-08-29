import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme } from "./styles/theme.js";
import { darkTheme } from "./styles/theme.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import MainContainer from "./layouts/MainContainer.jsx";
import { UserOptionsContextProvider } from "./context/userOptionsContext.jsx";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <CssBaseline />

      <Router>
        <UserOptionsContextProvider>
          <MainContainer onTheme={toggleTheme}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </MainContainer>
        </UserOptionsContextProvider>
      </Router>
    </ThemeProvider>
  );
};

export default App;
