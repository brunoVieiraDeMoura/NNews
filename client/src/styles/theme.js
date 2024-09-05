// theme.js
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const colors = {
  light: {
    claro: {
      1: "#FEF8ED",
      2: "#F6EDDE",
      3: "#53402F",
    },
    secondary: {
      1: "#A3B5AD",
      2: "#889F95",
      3: "#729284",
      4: "#E8F1EE",
    },
    bege: {
      1: "#DDC9AC",
      2: "#C0AD90",
    },
    Marrom: {
      1: "#7D6F69",
      2: "#4F3F39",
      3: "#2D201A",
      4: "#160F0C",
    },
  },
  dark: {
    claro: {
      1: "#FEF8ED",
      2: "#F6EDDE",
    },
    secondary: {
      1: "#A3B5AD",
      2: "#889F95",
      3: "#729284",
      4: "#E8F1EE",
    },
    bege: {
      1: "#DDC9AC",
      2: "#C0AD90",
    },
    Marrom: {
      1: "#7D6F69",
      2: "#4F3F39",
      3: "#2D201A",
      4: "#160F0C",
      5: "#110B09",
    },
  },
};

export let lightTheme = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          padding: 2,
        },
        input: {
          marginLeft: "12px",
          "&::placeholder": {
            color: colors.light.bege[2],
            marginLeft: "12px", // Define a margin do placeholder
          },
          color: "",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: "rgba(221,201,172,.2)",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: colors.light.bege[2],
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            color: colors.light.secondary[2],
          },
          "& .Mui-disabled": {
            color: "#333", // Defina a cor desejada aqui
          },
          "& .MuiInputBase-root": {
            color: colors.light.Marrom[2], // Cor do texto
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: colors.light.bege[2], // Cor da borda padrão
            },
            "&:hover fieldset": {
              borderColor: colors.light.bege[1], // Cor da borda ao passar o mouse
            },
            "&.Mui-focused fieldset": {
              borderColor: "#your-focus-border-color", // Cor da borda ao focar
            },
          },
          "& .MuiInputLabel-root": {
            color: colors.light.Marrom[1], // Cor do label
          },
          "& .MuiFormHelperText-root": {
            color: "#your-helper-text-color", // Cor do texto de ajuda
          },
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: colors.light.bege[1], // Define a cor para as setas ExpandLess e ExpandMore
        },
      },
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1100,
      xl: 1280,
    },
  },
  palette: {
    primary: {
      main: colors.light.Marrom[3],
      light: colors.light.Marrom[2],
      dark: colors.light.Marrom[4],
      contrastText: colors.light.claro[2],
      superLight: colors.light.Marrom[2],
      mediumLight: colors.light.Marrom[1],
    },
    secondary: {
      main: colors.light.secondary[2],
      light: colors.light.secondary[1],
      dark: colors.light.secondary[3],
      contrastText: colors.light.secondary[4],
    },
    error: {
      main: red[500],
    },
    background: {
      default: colors.light.claro[1],
      paper: colors.light.claro[2],
    },
    text: {
      primary: colors.light.Marrom[2], // Cor do textPrimary
      secondary: colors.light.Marrom[1], // Nova cor para textSecondary
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
      color: colors.light.Marrom[3],
      lineHeight: "1.125",
    },
    h2: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: colors.light.Marrom[3],
      lineHeight: "1.125",
    },
    h3: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: colors.light.Marrom[3],
      lineHeight: "1.125",
    },
    h4: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: colors.light.Marrom[3],
      lineHeight: "1.125",
    },
    h5: {
      fontFamily: "Lora",
      color: colors.light.Marrom[3],
      fontWeight: "600",
      lineHeight: "1.125",
    },
    h6: {
      fontFamily: "Lora",
      color: colors.light.Marrom[3],
      lineHeight: "1.125",
      fontWeight: "500",
    },
    body1: {
      fontFamily: "Open Sans",
      color: colors.light.Marrom[1],
      lineHeight: "1.4",
    },
    body2: {
      fontFamily: "Open Sans",
      color: colors.light.Marrom[1],
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
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            color: colors.dark.secondary[2],
          },
          "& .MuiInputBase-root": {
            color: "red", // Cor do texto
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: colors.dark.bege[2], // Cor da borda padrão
            },
            "&:hover fieldset": {
              borderColor: colors.dark.bege[2], // Cor da borda ao passar o mouse
            },
            "&.Mui-focused fieldset": {
              borderColor: "#your-focus-border-color", // Cor da borda ao focar
            },
          },
          "& .MuiInputLabel-root": {
            color: colors.dark.bege[1], // Cor do label
          },
          "& .MuiFormHelperText-root": {
            color: colors.dark.bege[1], // Cor do texto de ajuda
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          padding: 2,
        },
        input: {
          marginLeft: "12px",
          "&::placeholder": {
            color: colors.dark.bege[2],
            marginLeft: "12px", // Define a margin do placeholder
          },
          color: colors.dark.bege[2],
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          background: "rgba(221,201,172,.2)",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: colors.dark.claro[2], // Define a cor para as setas ExpandLess e ExpandMore
        },
      },
    },
  },

  MuiBox: {
    styleOverrides: {
      root: {
        background: {
          default: colors.dark.Marrom[4],
          paper: colors.dark.Marrom[5],
        },
      },
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1100,
      xl: 1280,
    },
  },
  palette: {
    primary: {
      main: colors.dark.Marrom[3],
      light: colors.dark.claro[2],
      dark: colors.dark.bege[2],
      contrastText: colors.dark.Marrom[1],
      superLight: colors.dark.Marrom[2],
      mediumLight: colors.light.Marrom[1],
    },
    secondary: {
      main: colors.dark.secondary[2],
      light: colors.dark.secondary[1],
      dark: colors.dark.secondary[3],
      contrastText: colors.dark.Marrom[3],
    },
    error: {
      main: red[500],
    },
    background: {
      default: colors.dark.Marrom[4],
      paper: colors.dark.Marrom[5],
    },
    text: {
      primary: colors.dark.bege[2], // Cor do textPrimary
      secondary: colors.dark.Marrom[1], // Nova cor para textSecondary
    },
  },
  typography: {
    button: {
      textTransform: "",
      fontFamily: "Open Sans",
      color: colors.dark.bege[1],
      fontWeight: "600",
    },
    fontFamily: "Lora",
    h1: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: colors.dark.claro[2],
      lineHeight: "1.125",
    },
    h2: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: colors.dark.claro[2],
      lineHeight: "1.125",
    },
    h3: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: colors.dark.claro[2],
      lineHeight: "1.125",
    },
    h4: {
      fontFamily: "Lora",
      fontWeight: "600",
      color: colors.dark.claro[2],
      lineHeight: "1.125",
    },
    h5: {
      fontFamily: "Lora",
      color: colors.dark.claro[2],
      lineHeight: "1.125",
    },
    h6: {
      fontFamily: "Lora",
      color: colors.dark.bege[1],
    },
    body1: {
      fontFamily: "Open Sans",
      color: colors.dark.bege[1],
      lineHeight: "1.4",
    },
    body2: {
      fontFamily: "Open Sans",
      color: colors.dark.bege[2],
      lineHeight: "1.4",
    },
  },
  spacing: 8, // Define the spacing factor
});

darkTheme = responsiveFontSizes(darkTheme, {
  factor: 2,
});
