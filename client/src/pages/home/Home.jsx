import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import objectSlideList from "../../util/objectSlideList";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slides = objectSlideList;
  const materiaMaisRecente = objectSlideList[0];
  const navigate = useNavigate();

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "Column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          p: {
            xs: 0,
            md: 3,
          },
          maxWidth: "1300px",
        }}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            width: "100%",
            height: "400px",
          }}
        >
          <Box
            sx={{
              display: {
                xs: "block",
                md: "none",
              },
            }}
          >
            {slides.map((slide, index) => (
              <Box
                key={index}
                component="a"
                onClick={() => {
                  navigate(slide.linkMateria);
                }}
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  transition: "opacity 1s ease-in-out",
                  opacity: activeIndex === index ? 1 : 0,
                  zIndex: activeIndex === index ? 1 : 0,
                  textDecoration: "none",
                  color: "inherit", // Mantém o estilo dos textos
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(120deg, rgba(19,8,1,.6), rgba(19,8,1,0.4) 70.71%)",
                  }}
                />
                <Box sx={{ position: "absolute", top: 16, left: 16 }}>
                  <Typography
                    sx={{
                      width: "80%",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      color: "#F0E3CF",
                      fontWeight: "bold",
                    }}
                    variant="body2"
                  >
                    {slide.subTitle}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 80,
                    left: 16,
                    mb: {
                      xs: -2,
                      md: -4,
                    },
                  }}
                >
                  <Typography
                    sx={{
                      flexGrow: 1,
                      width: "90%",
                      display: "-webkit-box",
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      mb: 1,
                      mt: 2,
                      color: "#F6EDDE",
                    }}
                    variant="h3"
                  >
                    {slide.titulo}
                  </Typography>
                  <Typography
                    sx={{
                      flexGrow: 1,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      width: "90%",
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      color: "#F6EDDE",
                    }}
                    variant="h5"
                  >
                    {slide.textos[0].texto1}
                  </Typography>
                </Box>
              </Box>
            ))}
            <IconButton
              onClick={handlePrev}
              sx={{
                position: "absolute",
                top: "50%",
                left: 16,
                transform: "translateY(-50%)",
                zIndex: 10, // Garante que o botão fique acima dos slides
              }}
            >
              <ArrowBackIosNewIcon sx={{ color: "#F0E3CF" }} />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: "absolute",
                top: "50%",
                right: 16,
                transform: "translateY(-50%)",
                zIndex: 10, // Garante que o botão fique acima dos slides
              }}
            >
              <ArrowForwardIosIcon sx={{ color: "#F0E3CF" }} />
            </IconButton>
            <Box
              sx={{
                position: "absolute",
                bottom: 16,
                width: "100%",
                display: "flex",
                justifyContent: "center",
                zIndex: 10, // Garante que os indicadores fiquem acima dos slides
              }}
            >
              {slides.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: 12,
                    height: 4,
                    backgroundColor:
                      activeIndex === index ? "#FEF8ED" : "#C6BDB8",
                    marginX: 0.5,
                    borderRadius: 2,
                  }}
                />
              ))}
            </Box>
          </Box>
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
            }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
                width: "100%",
                height: "100%",
                background: "rgba(192,173,144,.05)",
                borderRadius: 1,
              }}
            >
              <Box
                key={materiaMaisRecente.index}
                component="a"
                onClick={() => {
                  navigate(materiaMaisRecente.linkMateria);
                }}
                sx={{
                  borderRadius: 1,
                  width: "100%",
                  height: "400px",
                  backgroundImage: `url(${materiaMaisRecente.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              ></Box>
              <Box
                sx={{
                  p: 2,

                  width: {
                    md: "95%",
                    lg: "90%",
                    xl: "85%",
                  },
                  display: "flex",
                  flexDirection: "Column",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <img
                    src={materiaMaisRecente.imgEscritora}
                    alt="Logo"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      border: "4px solid #4B322E",
                      transform: "rotate(90deg)",
                    }}
                  />
                  <Box
                    component="a"
                    href="/"
                    sx={{
                      textDecoration: "none",
                      display: "flex",
                      justifyContent: "center",
                      gap: 1,
                    }}
                  >
                    <Typography variant="body1">
                      {materiaMaisRecente.nomeEscritora}
                    </Typography>
                    <ShareIcon />
                  </Box>
                </Box>
                <Box>
                  <Typography gutterBottom variant="h3">
                    {materiaMaisRecente.titulo}
                  </Typography>
                  <Typography
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                    variant="body1"
                  >
                    {materiaMaisRecente.textos[0].texto1}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Box
                    component="a"
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => {
                      navigate(materiaMaisRecente.linkTheme);
                    }}
                  >
                    <Typography variant="body1">
                      {materiaMaisRecente.theme}
                    </Typography>
                  </Box>
                  <ImportContactsIcon />
                  <Typography variant="body1">
                    {materiaMaisRecente.data}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            p: {
              xs: 2,
              md: 0,
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "end",
            }}
          >
            <Typography
              sx={{ mt: 4, fontWeight: "bold" }}
              variant="body1"
              color="textSecondary"
            >
              Mais recentes
            </Typography>
            <Button
              component="a"
              onClick={() => {
                navigate("/");
              }}
              sx={{
                mb: 0.2,
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
              }}
            >
              <Typography variant="body2" color="textSecondary">
                Veja Todos
              </Typography>
              <ArrowForwardIosIcon sx={{ fontSize: "1rem" }} />
            </Button>
          </Box>

          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              width: "100%",
              display: "flex",
              gap: 2,
              mt: 2,
              flexWrap: "wrap",
              flexDirection: {
                xs: "Column",
                md: "row",
              },
              justifyContent: {
                xs: "center",
                md: "space-between",
              },
              alignItems: {
                xs: "center",
              },
            }}
          >
            {slides.map((slide, index) => (
              <Card
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxWidth: {
                    xs: "100%",
                    md: "290px",
                    lg: "320px",
                    xl: "380px",
                  },
                }}
              >
                {/* Foto */}
                <Box style={{ position: "relative" }}>
                  <Box
                    component="a"
                    onClick={() => {
                      navigate(slide.linkMateria);
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={slide.image}
                      alt="Notícia"
                    />
                  </Box>
                  <Box
                    style={{
                      position: "absolute",
                      bottom: "-32px",
                      left: "8px",
                    }}
                  >
                    <img
                      src={slide.imgEscritora}
                      alt="Logo"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                        border: "4px solid #4B322E",
                        transform: "rotate(90deg)",
                      }}
                    />
                  </Box>
                </Box>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Links pequenos à esquerda */}
                  <Box sx={{ display: "flex", gap: 1, ml: 6, mt: -1.5 }}>
                    <Link
                      href="#"
                      variant="body2"
                      underline="hover"
                      color="textSecondary"
                    >
                      {slide.nomeEscritora}
                    </Link>
                    <Link
                      href="#"
                      variant="body2"
                      underline="hover"
                      color="textSecondary"
                    >
                      <ShareIcon sx={{ fontSize: "18px" }} />
                    </Link>
                  </Box>

                  {/* Título */}
                  <Box
                    component="a"
                    onClick={() => {
                      navigate(slide.linkMateria);
                    }}
                    sx={{ textDecoration: "none" }}
                  >
                    <Typography
                      variant="h5"
                      component="div"
                      sx={{
                        mt: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                      gutterBottom
                    >
                      {slide.titulo}
                    </Typography>

                    {/* Texto */}
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{
                        flexGrow: 1,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {slide.textos[0].texto1}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      mt: 2,
                      // alignSelf: "end",
                      width: "100%",
                      mb: -1,
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body1">{slide.data}</Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <ImportContactsIcon />
                      <Box
                        component="a"
                        onClick={() => {
                          navigate(materiaMaisRecente.linkTheme);
                        }}
                        sx={{ textDecoration: "underline", cursor: "pointer" }}
                      >
                        <Typography variant="body1">{slide.theme}</Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
