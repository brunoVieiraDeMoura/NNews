// theme.js
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red, yellow, grey } from "@mui/material/colors";

export let lightTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1600,
    },
  },
  palette: {
    primary: {
      main: yellow[500],
    },
    secondary: {
      main: grey[500],
    },
    error: {
      main: red[500],
    },
  },
  typography: {
    button: {
      textTransform: "",
      fontFamily: "",
    },
    fontFamily: "",
    h1: {
      fontFamily: "",
      fontWeight: "600",
      color: "",
    },
    h2: {
      fontFamily: "",
      fontWeight: "600",
      color: "",
    },
    h3: {
      fontFamily: "",
      fontWeight: "600",
      color: "",
    },
    h4: {
      fontFamily: "",
      fontWeight: "600",
      color: "",
    },
    h5: {
      fontFamily: "",
      color: "",
    },
    h6: {
      fontFamily: "",
      color: "",
    },
    body1: {
      fontFamily: "",
      color: "",
    },
    body2: {
      fontFamily: "",
      color: "",
    },
  },
  spacing: 8, // Define the spacing factor
});

lightTheme = responsiveFontSizes(lightTheme, {
  factor: 2,
});

export let darkTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1600,
    },
  },
  palette: {
    primary: {
      main: yellow[500],
    },
    secondary: {
      main: grey[500],
    },
    error: {
      main: red[500],
    },
  },
  typography: {
    button: {
      textTransform: "",
      fontFamily: "",
    },
    fontFamily: "",
    h1: {
      fontFamily: "",
      fontWeight: "600",
      color: "",
    },
    h2: {
      fontFamily: "",
      fontWeight: "600",
      color: "",
    },
    h3: {
      fontFamily: "",
      fontWeight: "600",
      color: "",
    },
    h4: {
      fontFamily: "",
      fontWeight: "600",
      color: "",
    },
    h5: {
      fontFamily: "",
      color: "",
    },
    h6: {
      fontFamily: "",
      color: "",
    },
    body1: {
      fontFamily: "",
      color: "",
    },
    body2: {
      fontFamily: "",
      color: "",
    },
  },
  spacing: 8, // Define the spacing factor
});

darkTheme = responsiveFontSizes(darkTheme, {
  factor: 2,
});
