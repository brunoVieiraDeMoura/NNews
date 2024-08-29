import React, { useState, createContext, useEffect } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PropTypes from "prop-types";

export const UserOptionsContext = createContext();

export const UserOptionsContextProvider = ({ children }) => {
  const [nameTheme, setNameTheme] = useState("Modo Escuro");
  const [iconTheme, setIconTheme] = useState(
    <DarkModeIcon sx={{ color: "#2D201A" }} />,
  );

  const [colorIcon, setColorIcon] = useState("#2D201A");

  const userOptionsList = [
    {
      label: "Perfil",
      icon: <AccountBoxIcon sx={{ color: colorIcon }} />,
      path: "/perfil",
    },
    {
      label: "Configurações",
      icon: <SettingsIcon sx={{ color: colorIcon }} />,
      path: "/configuracoes",
    },
    {
      label: nameTheme,
      icon: null,
      path: null,
    },
    {
      label: "Logout",
      icon: <LogoutIcon sx={{ color: colorIcon }} />,
      path: null,
    },
  ];
  useEffect(() => {}, [nameTheme, iconTheme, colorIcon, userOptionsList]);

  return (
    <UserOptionsContext.Provider
      value={{
        nameTheme,
        setNameTheme,
        userOptionsList,
        setIconTheme,
        iconTheme,
        setColorIcon,
        colorIcon,
      }}
    >
      {children}
    </UserOptionsContext.Provider>
  );
};

UserOptionsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
