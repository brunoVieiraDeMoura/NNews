import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme } from "./styles/theme.js";
import { darkTheme } from "./styles/theme.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import MainContainer from "./layouts/MainContainer.jsx";
import { UserOptionsContextProvider } from "./context/userOptionsContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ScrollToTop from "./util/scrollTop";
import "animate.css";

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <GoogleOAuthProvider clientId="333111812961-i21pl4u6h20oe9egblhj8nnvc5ef6cbv.apps.googleusercontent.com">
      <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <Router>
          <ScrollToTop />
          <AuthProvider>
            <UserOptionsContextProvider>
              <MainContainer onTheme={toggleTheme}>
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
              </MainContainer>
            </UserOptionsContextProvider>
          </AuthProvider>
        </Router>
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
};

export default App;
