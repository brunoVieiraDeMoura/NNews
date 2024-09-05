import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import Collapse from "@mui/material/Collapse";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { CategoryContext } from "../context/CategoryContext";
import Typography from "@mui/material/Typography";
import { UserOptionsContext } from "../context/UserOptionsContext.jsx";
import { AuthContext } from "../context/AuthContext";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import PropTypes from "prop-types";
import LogoLight from "../assets/LogoLight.png";

const AppBarComponent = ({ onTheme }) => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [openSubList, setOpenSubList] = useState(null);
  const [onThemeColor, setOnThemeColor] = useState(false);
  const { categorias } = useContext(CategoryContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    nameTheme,
    userOptionsList,
    iconTheme,
    setNameTheme,
    setColorIcon,
    setIconTheme,
  } = useContext(UserOptionsContext);

  const toggleTheme = () => {
    setOnThemeColor((prev) => !prev);
    setNameTheme(onThemeColor ? "Modo Escuro" : "Modo Claro");
    setColorIcon(onThemeColor ? "#2D201A" : "#DDC9AC");
    setIconTheme(
      onThemeColor ? (
        <DarkModeIcon sx={{ color: "#2D201A" }} />
      ) : (
        <LightModeIcon sx={{ color: "#DDC9AC" }} />
      ),
    );
    onTheme();
  };

  const toggleLeftDrawer = (open) => () => {
    if (!open) {
      setOpenSubList(null);
    }
    setLeftDrawerOpen(open);
  };

  const toggleRightDrawer = (open) => () => {
    setRightDrawerOpen(open);
  };

  const handleClick = (index) => {
    setOpenSubList(openSubList === index ? null : index);
  };

  const userOptions = userOptionsList;

  function formatName(fullName) {
    const nameParts = fullName.trim().split(" ");
    if (nameParts.length === 1) {
      return nameParts[0];
    }

    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
    return firstName.toLowerCase() === lastName.toLowerCase()
      ? firstName
      : `${firstName} ${lastName}`;
  }

  return (
    <>
      <AppBar
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        position="static"
      >
        <Toolbar
          sx={{
            width: "100%",
            maxWidth: "1300px",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            onClick={toggleLeftDrawer(true)}
          >
            <MenuIcon sx={{ fontSize: "32px" }} />
          </IconButton>
          <IconButton
            sx={{
              p: 2,
              width: { xs: "100px", md: "250px" },
              height: "35px",
              borderRadius: 0,
            }}
            edge="start"
            color="inherit"
            aria-label="logo"
            onClick={() => navigate("/")}
          >
            <img src={LogoLight} alt="Logo" style={{ width: "32px" }} />
          </IconButton>
          <IconButton
            edge="end"
            color="inherit"
            onClick={toggleRightDrawer(true)}
          >
            {user ? (
              <Box
                sx={{
                  borderRadius: "50%",
                  width: { xs: "32px", md: "40px" },
                  height: { xs: "32px", md: "40px" },
                  backgroundImage: `url(${user.picture})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ) : (
              <AccountCircleIcon sx={{ fontSize: "32px" }} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Left Drawer */}
      <Drawer
        anchor="left"
        open={leftDrawerOpen}
        onClose={toggleLeftDrawer(false)}
      >
        <Typography sx={{ p: 2 }} variant="h4" color="primary.light">
          Categorias
        </Typography>
        <List sx={{ zIndex: 1200, width: { xs: "280px", md: "300px" } }}>
          {categorias.map((categoria, index) => (
            <div key={categoria._id}>
              <ListItemButton onClick={() => handleClick(index)}>
                <ListItemText primary={categoria.name} />
                {openSubList === index ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={openSubList === index} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {categoria.subcategorias.map((subcategoria) => (
                    <Box key={subcategoria._id}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary={subcategoria.name} />
                      </ListItemButton>
                      <Divider />
                    </Box>
                  ))}
                </List>
              </Collapse>
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
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="h4" color="primary.light">
            Perfil
          </Typography>
          {user ? (
            <Typography variant="h5" color="textSecondary">
              {formatName(user.name)}
            </Typography>
          ) : (
            <></>
          )}
        </Box>
        <List sx={{ width: { xs: "200px", md: "300px" } }}>
          {userOptions.map((option, index) => (
            <div key={index}>
              <ListItemButton
                sx={{ mt: 1, mb: 1 }}
                onClick={
                  option.label === nameTheme
                    ? toggleTheme
                    : () => setRightDrawerOpen(false)
                }
                component={RouterLink}
                to={option.path}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box>
                    {option.label === nameTheme ? iconTheme : option.icon}
                  </Box>
                  <Box>
                    <ListItemText primary={option.label} />
                  </Box>
                </Box>
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
