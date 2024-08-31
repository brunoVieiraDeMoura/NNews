import React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useLocation } from "react-router-dom";

const breadcrumbNameMap = {
  "/analise-literaria": "Análises Literárias",
  "/analise-literaria/aventura": "Aventura",
  "/analise-literaria/audiobooks": "AudioBooks",
  "/analise-literaria/autoajuda": "Autoajuda",
  "/analise-literaria/biografia": "Autobiografia",
  "/analise-literaria/ciencias": "Ciências",
  "/analise-literaria/distopia": "Distopia",
  "/analise-literaria/drama": "Drama",
  "/analise-literaria/dramatica": "Dramática",
  "/analise-literaria/ensaios": "Ensaios",
  "/analise-literaria/epica": "Épica",
  "/analise-literaria/fantasia": "Fantasia",
  "/analise-literaria/ficcao": "Ficção Científica",
  "/analise-literaria/guia-de-viagem": "Guia de Viagem",
  "/analise-literaria/haiku": "Haiku",
  "/analise-literaria/historia": "História",
  "/analise-literaria/jornalismo": "Jornalismo Literário",
  "/analise-literaria/lirica": "Lírica",
  "/analise-literaria/manuais": "Tutoriais",
  "/analise-literaria/memorias": "Memórias",
  "/analise-literaria/misterio": "Mistério/Policial",
  "/analise-literaria/negocios": "Empreendedorismo",
  "/analise-literaria/romance": "Romance",
  "/analise-literaria/terror": "Terror",
  "/analise-literaria/utopia": "Utopia",
  "/recomendacoes": "Recomendações",
  "/recomendacoes/livro-da-semana": "Livro da Semana",
  "/recomendacoes/nao-pode-faltar": "Não Pode Faltar",
  "/recomendacoes/achados": "Achados",
  "/textos": "Textos",
  "/textos/romance": "Romance",
  "/textos/melancolico": "Melancólico",
  "/textos/reflexivo": "Reflexivo",
  "/escritores": "Escritores",
  "/perfil": "Perfil",
  "/configuracoes": "Configurações",
};

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ padding: "20px 0", mt: -3 }}>
      <Link
        underline={pathnames.length === 0 ? "always" : "hover"}
        color={pathnames.length === 0 ? "secondary" : "textSecondary"}
        component={RouterLink}
        to="/"
      >
        {pathnames.length === 0 ? "Home" : "Home"}
      </Link>
      {pathnames.map((value, index) => {
        const last = index === pathnames.length - 1;
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;

        return last ? (
          <Typography
            sx={{ textDecoration: "underline" }}
            color="secondary"
            key={to}
          >
            {breadcrumbNameMap[to]}
          </Typography>
        ) : (
          <Link
            underline="hover"
            color="textSecondary"
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
