// theme.js
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export let lightTheme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            color: "#D2BC99",
          },
          color: "#DDC9AC",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(240,227,207,1)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: "#C0AD90",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#DDC9AC", // Define a cor para as setas ExpandLess e ExpandMore
        },
      },
    },
  },
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
      main: "#2D201A",
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
    text: {
      primary: "#634843", // Cor do textPrimary
      secondary: "#796558", // Nova cor para textSecondary
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
      color: "#2D201A",
      lineHeight: "1.125",
    },
    h2: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: "#2D201A",
      lineHeight: "1.125",
    },
    h3: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: "#2D201A",
      lineHeight: "1.125",
    },
    h4: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: "#2D201A",
      lineHeight: "1.125",
    },
    h5: {
      fontFamily: "Lora",
      color: "#2D201A",
      fontWeight: "600",
      lineHeight: "1.125",
    },
    h6: {
      fontFamily: "Lora",
      color: "#DDC9AC",
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
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          "&::placeholder": {
            color: "#F0E3CF",
          },
          color: "#2D201A",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "#D2BC99",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#F0E3CF", // Define a cor para as setas ExpandLess e ExpandMore
        },
      },
    },
  },
  MuiBox: {
    styleOverrides: {
      root: {
        background: {
          default: "#2D201A",
          paper: "#1D1410",
        },
      },
    },
  },
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
      main: "#2D201A",
      light: "#F6EDDE",
      dark: "#D2BC99",
      contrastText: "#2D201A",
    },
    secondary: {
      main: "#889F95",
      light: "#A3B5AD",
      dark: "#729284",
      contrastText: "#2D201A",
    },
    error: {
      main: red[500],
    },
    background: {
      default: "#1D1410",
      paper: "#110B09",
    },
    text: {
      primary: "#C0AD90", // Cor do textPrimary
      secondary: "#796558", // Nova cor para textSecondary
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
      color: "#D2BC99",
    },
    body1: {
      fontFamily: "Open Sans",
      color: "#DDC9AC",
      lineHeight: "1.4",
    },
    body2: {
      fontFamily: "Open Sans",
      color: "#C0AD90",
      lineHeight: "1.4",
    },
  },
  spacing: 8, // Define the spacing factor
});

darkTheme = responsiveFontSizes(darkTheme, {
  factor: 2,
});
