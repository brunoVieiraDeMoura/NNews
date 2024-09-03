import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import objectSlideList from "../../../util/objectSlideList";

const JornalismoLiterario = () => {
  const materiaId = objectSlideList[2] || {
    textos: [],
    titulo: "",
    subTitle: "",
    image: "",
  };

  // Separar textos em duas partes: os dois primeiros (texto1 e texto2) e o resto
  const [primeirosTextos, restantesTextos] = materiaId.textos.reduce(
    ([primeiros, restantes], textoObj) => {
      const novosPrimeiros = { ...primeiros };
      const novosRestantes = { ...textoObj };

      Object.entries(textoObj).forEach(([key, value]) => {
        if (key === "texto1" || key === "texto2") {
          novosPrimeiros[key] = value;
          delete novosRestantes[key];
        }
      });

      if (Object.keys(novosRestantes).length > 0) {
        restantes.push(novosRestantes);
      }

      return [novosPrimeiros, restantes];
    },
    [{}, []],
  );

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
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
          flexDirection: "column",
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
          maxWidth: {
            xl: "800px",
          },
        }}
      >
        <Typography gutterBottom variant="h4">
          {materiaId.titulo}
        </Typography>

        <Typography variant="h6">{materiaId.subTitle}</Typography>

        {/* Container para a imagem e os textos 1 e 2 */}
        <Box
          sx={{
            display: {
              xs: "block",
              md: "grid",
            },
            gridTemplateColumns: {
              md: "2fr 3fr",
            },
            gap: 2,
            mt: {
              xs: 1,
              md: 2,
            },
          }}
        >
          {/* Imagem */}
          <Box
            sx={{
              borderRadius: 1,
              width: "100%",
              height: {
                xs: "200px",
                md: "100%",
              },
              backgroundImage: `url(${materiaId.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Container para texto1 e texto2 */}
          <Box>
            {Object.entries(primeirosTextos).map(([key, value]) => (
              <Typography
                key={key}
                variant="body1"
                sx={{
                  mt: {
                    xs: 2,
                    md: 0,
                  },
                  "& + &": {
                    mt: {
                      md: 2,
                    },
                  },
                }}
              >
                {value}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* Renderiza os textos restantes, excluindo texto1 e texto2 */}
        {restantesTextos.map((textoObj, index) => (
          <Box key={index}>
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
              }
              return null;
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
