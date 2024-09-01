import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import objectSlideList from "../../../util/objectSlideList";

const JornalismoLiterario = () => {
  // Obtém o primeiro objeto de objectSlideList ou um objeto padrão
  const materiaId = objectSlideList[1] || {
    textos: [],
    titulo: "",
    subTitle: "",
    image: "",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "Column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        background: {
          xs: "rgba(192,173,144,.08)",
          md: "none",
        },
        mt: 2,
        p: {
          xs: 2,
          md: 3,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "Column",
          p: {
            xs: 0,
            md: 3,
          },
          justifyContent: "center",
          background: {
            xs: "none",
            md: "rgba(192,173,144,.08)",
          },
          width: {
            xs: "100%",
            md: "80%",
            lg: "70%",
            xl: "60%",
          },
        }}
      >
        {/* Título da matéria */}
        <Typography gutterBottom variant="h4">
          {materiaId.titulo}
        </Typography>

        {/* Subtítulo da matéria */}
        <Typography variant="h6">{materiaId.subTitle}</Typography>

        {/* Imagem de fundo da matéria */}
        <Box>
          <Box
            key={materiaId.index}
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 2fr",
              borderRadius: 1,
              width: "100%",
              mt: 1,
              height: {
                xs: "200px",
                md: "400px",
              },
              backgroundImage: `url(${materiaId.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <Typography>{materiaId.textos[0].texto1}</Typography>
        </Box>
        {/* Renderiza os textos da matéria */}
        {materiaId.textos &&
          Array.isArray(materiaId.textos) &&
          materiaId.textos.map((textoObj, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              {Object.entries(textoObj).map(([key, value]) => {
                if (key.startsWith("texto")) {
                  return (
                    <Typography key={key} variant="body1" sx={{ mt: 2 }}>
                      {value}
                    </Typography>
                  );
                } else if (key.startsWith("comment")) {
                  return (
                    <Typography
                      key={key}
                      variant="body2"
                      sx={{ mt: 2, fontStyle: "italic", textAlign: "center" }}
                    >
                      {value}
                    </Typography>
                  );
                } else if (key.startsWith("subText")) {
                  return (
                    <Typography key={key} variant="h6" sx={{ mt: 2 }}>
                      {value}
                    </Typography>
                  );
                } else {
                  return null;
                }
              })}
            </Box>
          ))}

        {/* Exibe a dica ao final */}
        {materiaId.textos &&
          materiaId.textos.map(
            (textoObj, index) =>
              textoObj.dica && (
                <Box key={`dica-${index}`} sx={{ mt: 4 }}>
                  <Typography variant="body1">
                    {textoObj.dicaTexto} :{" "}
                    <a
                      href={textoObj.dicaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {textoObj.dica}
                    </a>
                  </Typography>
                </Box>
              ),
          )}
      </Box>
    </Box>
  );
};

export default JornalismoLiterario;
