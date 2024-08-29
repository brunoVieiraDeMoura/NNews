import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useLocation } from "react-router-dom";

const breadcrumbNameMap = {
  "/artigos": "Artigos",
  "/artigos/inicio": "Início",
  "/artigos/calculo-concreto": "Cálculo de Concreto",
  "/artigos/calculo-metalico": "Cálculo Metálico",
  "/construcao-civil": "Construção Civil",
  "/construcao-civil/residencial": "Residencial",
  "/construcao-civil/comercial": "Comercial",
  "/construcao-civil/industrial": "Industrial",
  "/perfil": "Perfil",
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  console.log(pathnames);
  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "20px 0" }}>
      <Link underline="hover" color="textPrimary" component={RouterLink} to="/">
        {pathnames.length === 0 ? null : "Home"}
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography color="primary" key={to}>
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="primary.dark"
            component={RouterLink}
            to={to}
            key={to}
          >
            {breadcrumbNameMap[to]}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
