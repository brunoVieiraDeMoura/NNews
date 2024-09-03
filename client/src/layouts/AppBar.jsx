import React, { useState, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItemButton from "@mui/material/ListItemButton";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import ListItemText from "@mui/material/ListItemText";
import LogoLight from "../assets/LogoLight.png";
import PropTypes from "prop-types";
import useNavigation from "../hooks/useNavigation";
import routeTabList from "../util/objectTabList";
import Typography from "@mui/material/Typography";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { UserOptionsContext } from "../context/UserOptionsContext.jsx";
import { AuthContext } from "../context/AuthContext";

const AppBarComponent = ({ onTheme }) => {
  const [leftDrawerOpen, setLeftDrawerOpen] = useState(false);
  const [rightDrawerOpen, setRightDrawerOpen] = useState(false);
  const [openSubList, setOpenSubList] = useState(null);
  const [onThemeColor, setOnThemeColor] = useState(false);
  const navigate = useNavigate();
  const {
    nameTheme,
    setNameTheme,
    userOptionsList,
    iconTheme,
    setColorIcon,
    setIconTheme,
  } = useContext(UserOptionsContext);
  const { goToHome } = useNavigation();
  const { user } = useContext(AuthContext);
  const toggleTheme = () => {
    setOnThemeColor((onThemeColor) => !onThemeColor);
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

  const tabs = routeTabList;
  const userOptions = userOptionsList;
  function formatName(fullName) {
    const nameParts = fullName.trim().split(" ");
    // Se só tem um nome, retorna apenas ele
    if (nameParts.length === 1) {
      return nameParts[0];
    }
    // Se tem mais de um nome, retorna o primeiro e o último
    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];

    // Evita o caso de repetir o mesmo nome
    if (firstName.toLowerCase() === lastName.toLowerCase()) {
      return firstName;
    }
    return `${firstName} ${lastName}`;
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
              width: {
                xs: "100px",
                md: "250px",
              },
              height: "35px",
              borderRadius: 0,
            }}
            edge="start"
            color="inherit"
            aria-label="logo"
            onClick={goToHome}
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
                  width: {
                    xs: "32px",
                    md: "40px",
                  },
                  height: {
                    xs: "32px",
                    md: "40px",
                  },
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
        <List
          sx={{
            zIndex: 1200,
            width: {
              xs: "280px",
              md: "300px",
            },
          }}
        >
          {tabs.map((tab, index) => (
            <div key={index}>
              <ListItemButton
                sx={{ mt: 1, mb: 1 }}
                component={RouterLink}
                // to={tab.path}
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
                      <Box key={subIndex}>
                        <ListItemButton
                          key={subIndex}
                          component={RouterLink}
                          to={subItem.path}
                          sx={{ pl: 4 }}
                        >
                          <ListItemText
                            primary={subItem.label}
                            onClick={() => {
                              navigate(RouterLink);
                              setLeftDrawerOpen(false);
                              setOpenSubList(false);
                            }}
                          />
                        </ListItemButton>
                        <Divider
                          sx={{ background: "rgba(254,248,237,0.1)" }}
                          variant="middle"
                        />
                      </Box>
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
        <List
          sx={{
            width: {
              xs: "200px",
              md: "300px",
            },
          }}
        >
          {userOptions.map((option, index) => (
            <div key={index}>
              <ListItemButton
                sx={{ mt: 1, mb: 1 }}
                onClick={
                  userOptions[index].label === nameTheme ? toggleTheme : null
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
                    {userOptions[index].label === nameTheme
                      ? iconTheme
                      : option.icon}
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
