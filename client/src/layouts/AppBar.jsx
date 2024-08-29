import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { Link as RouterLink } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import LogoLight from "../assets/LogoLight.png";
import PropTypes from "prop-types";
import useNavigation from "../hooks/useNavigation";

const AppBarComponent = ({ onTheme }) => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [openSubList, setOpenSubList] = useState(null);
  const [onThemeColor, setOnThemeColor] = useState(false);
  const [nameTheme, setNameTheme] = useState("Modo Escuro");
  const { goToHome } = useNavigation();
  const toggleTheme = () => {
    setOnThemeColor((onThemeColor) => !onThemeColor);
    setNameTheme(onThemeColor ? "Modo Escuro" : "Modo Claro");
    onTheme();
  };

  const toggleLeftDrawer = (open) => () => {
    setLeftDrawerOpen(open);
  };

  const toggleRightDrawer = (open) => () => {
    setRightDrawerOpen(open);
  };

  const handleClick = (index) => {
    setOpenSubList(openSubList === index ? null : index);
  };

  const tabs = [
    {
      label: "Análises Literárias",
      path: "/artigos",
      hasSubList: true,
      subLists: [
        { label: "Aventura", path: "/artigos/aventura" },
        { label: "AudioBooks", path: "/documentacao/calculo-metalico" },
        {
          label: "Autoajuda",
          path: "/documentacao/calculo-concreto",
        },
        {
          label: "Biografia/Autobiografia",
          path: "/documentacao/calculo-metalico",
        },
        { label: "Ciências", path: "/documentacao/calculo-metalico" },
        { label: "Distopia/Utopia", path: "/documentacao/calculo-metalico" },
        { label: "Dramática", path: "/documentacao/calculo-metalico" },
        { label: "Drama", path: "/documentacao/calculo-metalico" },
        { label: "Ensaios", path: "/documentacao/calculo-metalico" },
        { label: "Épica", path: "/documentacao/calculo-metalico" },
        { label: "Fantasia", path: "/documentacao/calculo-metalico" },
        { label: "Ficção Científica", path: "/documentacao/calculo-metalico" },
        { label: "Guia de Viagem", path: "/documentacao/calculo-metalico" },
        { label: "Haiku", path: "/documentacao/calculo-metalico" },
        { label: "História", path: "/documentacao/calculo-metalico" },
        {
          label: "Jornalismo Literário",
          path: "/documentacao/calculo-metalico",
        },
        { label: "Lírica", path: "/documentacao/calculo-metalico" },
        { label: "Manuais/Tutoriais", path: "/documentacao/calculo-metalico" },
        { label: "Memórias", path: "/documentacao/calculo-metalico" },
        { label: "Mistério/Policial", path: "/documentacao/calculo-metalico" },
        {
          label: "Negócios/Empreendedorismo",
          path: "/documentacao/calculo-metalico",
        },
        { label: "Romance", path: "/documentacao/calculo-metalico" },
        { label: "Terror", path: "/documentacao/calculo-metalico" },
      ],
    },
    {
      label: "Recomendações",
      path: "/construcao-civil",
      hasSubList: true,
      subLists: [
        { label: "Livro da semana", path: "/construcao-civil/residencial" },
        { label: "Não pode faltar", path: "/construcao-civil/comercial" },
        { label: "Achados", path: "/construcao-civil/industrial" },
      ],
    },
    {
      label: "Textos",
      path: "/construcao-civil",
      hasSubList: true,
      subLists: [
        { label: "Romance", path: "/construcao-civil/residencial" },
        { label: "Melancolico", path: "/construcao-civil/comercial" },
        { label: "Reflexivo", path: "/construcao-civil/industrial" },
      ],
    },
    { label: "Escritores", path: "/perfil", hasSubList: false },
  ];

  const userOptions = [
    { label: "Profile", path: "/profile" },
    { label: "Settings", path: "/settings" },
    {
      label: nameTheme,
      path: null,
    },
    { label: "Logout", path: "/logout" },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleLeftDrawer(true)}
          >
            <MenuIcon sx={{ fontSize: "28px" }} />
          </IconButton>
          <IconButton
            sx={{ flex: 1 }}
            edge="start"
            color="inherit"
            aria-label="logo"
            onClick={goToHome}
          >
            <img src={LogoLight} alt="Logo" style={{ width: "28px" }} />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            onClick={toggleRightDrawer(true)}
          >
            <AccountCircleIcon sx={{ fontSize: "28px" }} />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Left Drawer */}
      <Drawer
        anchor="left"
        open={leftDrawerOpen}
        onClose={toggleLeftDrawer(false)}
      >
        <List sx={{ zIndex: 1200, width: "280px" }}>
          {tabs.map((tab, index) => (
            <div key={index}>
              <ListItemButton
                component={RouterLink}
                to={tab.path}
                onClick={() => handleClick(index)}
              >
                <ListItemText primary={tab.label} />
                {tab.hasSubList ? (
                  openSubList === index ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </ListItemButton>
              {tab.hasSubList && (
                <Collapse
                  in={openSubList === index}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {tab.subLists.map((subItem, subIndex) => (
                      <ListItemButton
                        key={subIndex}
                        component={RouterLink}
                        to={subItem.path}
                        sx={{ pl: 4 }}
                      >
                        <ListItemText primary={subItem.label} />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              )}
              <Divider />
            </div>
          ))}
        </List>
      </Drawer>

      {/* Right Drawer for User Options */}
      <Drawer
        sx={{ zIndex: 1200 }}
        anchor="right"
        open={rightDrawerOpen}
        onClose={toggleRightDrawer(false)}
      >
        <List sx={{ width: "200px" }}>
          {userOptions.map((option, index) => (
            <div key={index}>
              <ListItemButton
                onClick={
                  userOptions[index].label === nameTheme ? toggleTheme : null
                }
                component={RouterLink}
                to={option.path}
              >
                <ListItemText primary={option.label} />
              </ListItemButton>
              {index < userOptions.length - 1 && <Divider />}
            </div>
          ))}
        </List>
      </Drawer>
    </>
  );
};

AppBarComponent.propTypes = {
  onTheme: PropTypes.func,
};

export default AppBarComponent;
