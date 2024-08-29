import React, { useState } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import SettingsIcon from "@mui/icons-material/Settings";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LogoutIcon from "@mui/icons-material/Logout";

const userOptionsListRoute = () => {
  const [nameTheme, setNameTheme] = useState("Modo Escuro");
  const [iconTheme, setIconTheme] = useState(<DarkModeIcon />);
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
      icon: iconTheme,
      path: null,
    },
    {
      label: "Logout",
      icon: <LogoutIcon sx={{ color: colorIcon }} />,
      path: null,
    },
  ];

  return {
    nameTheme,
    setNameTheme,
    userOptionsList,
    setIconTheme,
    iconTheme,
    setColorIcon,
    colorIcon,
  };
};

export default userOptionsListRoute;
