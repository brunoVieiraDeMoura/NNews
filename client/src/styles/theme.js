// theme.js
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

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
      main: "#4B322E",
      light: "#634843",
      dark: "#2E1A16",
      contrastText: "#F6EDDE",
    },
    secondary: {
      main: "#889F95",
      light: "#A3B5AD",
      dark: "#729284",
      contrastText: "#E8F1EE",
    },
    error: {
      main: red[500],
    },
    background: {
      default: "#FEF8ED",
      paper: "#F6EDDE",
    },
  },
  typography: {
    button: {
      textTransform: "",
      fontFamily: "Open Sans",
      fontWeight: "600",
    },
    h1: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: "#4B322E",
      lineHeight: "1.125",
    },
    h2: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: "#4B322E",
      lineHeight: "1.125",
    },
    h3: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: "#4B322E",
      lineHeight: "1.125",
    },
    h4: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: "#4B322E",
      lineHeight: "1.125",
    },
    h5: {
      fontFamily: "Lora",
      color: "#4B322E",
      lineHeight: "1.125",
    },
    h6: {
      fontFamily: "Lora",
      color: "#4B322E",
    },
    body1: {
      fontFamily: "Open Sans",
      color: "#796558",
      lineHeight: "1.4",
    },
    body2: {
      fontFamily: "Open Sans",
      color: "#796558",
      lineHeight: "1.4",
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
      main: "#F0E3CF",
      light: "#F6EDDE",
      dark: "#E5D6BE",
      contrastText: "#4B322E",
    },
    secondary: {
      main: "#889F95",
      light: "#A3B5AD",
      dark: "#729284",
      contrastText: "#4B322E",
    },
    error: {
      main: red[500],
    },
    background: {
      default: "#4B322E",
      paper: "#2E1A16",
    },
  },
  typography: {
    button: {
      textTransform: "",
      fontFamily: "Open Sans",
      fontWeight: "600",
    },
    fontFamily: "Lora",
    h1: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: "#F0E3CF",
      lineHeight: "1.125",
    },
    h2: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: "#F0E3CF",
      lineHeight: "1.125",
    },
    h3: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: "#F0E3CF",
      lineHeight: "1.125",
    },
    h4: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: "#F0E3CF",
      lineHeight: "1.125",
    },
    h5: {
      fontFamily: "Lora",
      color: "#F0E3CF",
      lineHeight: "1.125",
    },
    h6: {
      fontFamily: "Lora",
      color: "#F0E3CF",
    },
    body1: {
      fontFamily: "Open Sans",
      color: "#DDC9AC",
      lineHeight: "1.4",
    },
    body2: {
      fontFamily: "Open Sans",
      color: "#DDC9AC",
      lineHeight: "1.4",
    },
  },
  spacing: 8, // Define the spacing factor
});

darkTheme = responsiveFontSizes(darkTheme, {
  factor: 2,
});
