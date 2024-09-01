import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";

// import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import useFetchOut from "./../hooks/useFetchOut";

const SubAppBar = () => {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const apiCLimaTempo = "da047aaa6450570108abd963b0d88757";
  const cidade = "Rio de Janeiro";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiCLimaTempo}&units=metric&lang=pt_br`;

  const { data, loading: loadingClima, error: errorClima } = useFetchOut(url);

  if (loadingClima) return <p>Carregando...</p>;

  if (errorClima) return <p> Error: {errorClima} </p>;

  const handleSearchClick = () => {
    setSearchOpen(true);
  };

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
    if (event.target.value !== "") {
      setSearchOpen(true);
    } else {
      setSearchOpen(false);
    }
  };

  const handleClose = () => {
    setSearchOpen(false);
  };

  return (
    <>
      <AppBar position="relative">
        <Box sx={{ boxShadow: 1, p: 1 }}>
          <Toolbar
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                width: {
                  xs: "50%",
                  md: "auto",
                },
              }}
            >
              <IconButton color="inherit" onClick={handleSearchClick}>
                <SearchIcon />
              </IconButton>
              <InputBase
                placeholder="Pesquisar..."
                value={searchText}
                onChange={handleSearchChange}
                sx={{
                  marginLeft: 1,
                  borderRadius: 1,
                  background: {
                    xs: "rgba(19,8,1,0.3)",
                    md: "rgba(19,8,1,0.2)",
                  },
                  maxWidth: {
                    xs: "60%",
                    md: "80%",
                  },
                  width: {
                    xs: "60%",
                    md: "300px",
                  },
                }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                flexwrap: "wrap",
                justifyContent: "center",
                flexDirection: "Column",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography color="#A3947F" sx={{ fontSize: "14px" }}>
                  {data.name}
                </Typography>
                <Typography color="#A3947F" sx={{ mt: 0.5, fontSize: "12px" }}>
                  {Math.ceil(data.main.temp)}°C
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="#84755E"
                sx={{
                  fontSize: "9px",
                  textAlign: "center",
                }}
              >
                O clima de hoje é de {data.weather[0].description}.
              </Typography>
            </Box>
          </Toolbar>
        </Box>
      </AppBar>

      {searchOpen && (
        <ClickAwayListener onClickAway={handleClose}>
          <Box
            sx={{
              position: "absolute",
              top: "120px",
              left: 0,
              right: 0,
              zIndex: 1200,
              bgcolor: "background.paper",
              borderRadius: 1,
              boxShadow: 3,
              p: 2,
            }}
          >
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
              sx={{ position: "absolute", right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
            {/* Resultados da pesquisa */}
            <Typography variant="h6">Procurando resultados...</Typography>
            <Box>
              <Box sx={{ mt: 2 }}>
                <Skeleton
                  sx={{ borderRadius: 1 }}
                  variant="rectangular"
                  width="100%"
                  height={120}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Skeleton
                    sx={{ mt: 1, borderRadius: 1 }}
                    variant="rectangular"
                    width="10%"
                    height={16}
                  />
                  <Skeleton
                    sx={{ mt: 1, borderRadius: 1 }}
                    variant="rectangular"
                    width="10%"
                    height={16}
                  />
                </Box>
                <Skeleton
                  sx={{ mt: 1, borderRadius: 1 }}
                  variant="rectangular"
                  width="100%"
                  height={16}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Skeleton
                    sx={{ mt: 1, borderRadius: 1 }}
                    variant="rectangular"
                    width="100%"
                    height={32}
                  />
                  <Skeleton
                    sx={{ mt: 1, borderRadius: 1 }}
                    variant="rectangular"
                    width="10%"
                    height={32}
                  />
                </Box>
              </Box>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Box sx={{}}>
                <Skeleton
                  sx={{ borderRadius: 1 }}
                  variant="rectangular"
                  width="100%"
                  height={120}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Skeleton
                    sx={{ mt: 1, borderRadius: 1 }}
                    variant="rectangular"
                    width="10%"
                    height={16}
                  />
                  <Skeleton
                    sx={{ mt: 1, borderRadius: 1 }}
                    variant="rectangular"
                    width="10%"
                    height={16}
                  />
                </Box>
                <Skeleton
                  sx={{ mt: 1, borderRadius: 1 }}
                  variant="rectangular"
                  width="100%"
                  height={16}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Skeleton
                    sx={{ mt: 1, borderRadius: 1 }}
                    variant="rectangular"
                    width="100%"
                    height={32}
                  />
                  <Skeleton
                    sx={{ mt: 1, borderRadius: 1 }}
                    variant="rectangular"
                    width="10%"
                    height={32}
                  />
                </Box>
              </Box>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Box sx={{}}>
                <Skeleton
                  sx={{ borderRadius: 1 }}
                  variant="rectangular"
                  width="100%"
                  height={120}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Skeleton
                    sx={{ mt: 1, borderRadius: 1 }}
                    variant="rectangular"
                    width="10%"
                    height={16}
                  />
                  <Skeleton
                    sx={{ mt: 1, borderRadius: 1 }}
                    variant="rectangular"
                    width="10%"
                    height={16}
                  />
                </Box>
                <Skeleton
                  sx={{ mt: 1, borderRadius: 1 }}
                  variant="rectangular"
                  width="100%"
                  height={16}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Skeleton
                    sx={{ mt: 1, borderRadius: 1 }}
                    variant="rectangular"
                    width="100%"
                    height={32}
                  />
                  <Skeleton
                    sx={{ mt: 1, borderRadius: 1 }}
                    variant="rectangular"
                    width="10%"
                    height={32}
                  />
                </Box>
              </Box>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <Box sx={{}}>
                <Skeleton
                  sx={{ borderRadius: 1 }}
                  variant="rectangular"
                  width="100%"
                  height={120}
                />
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Skeleton
                    sx={{ mt: 1, borderRadius: 1 }}
                    variant="rectangular"
                    width="10%"
                    height={16}
                  />
                  <Skeleton
                    sx={{ mt: 1, borderRadius: 1 }}
                    variant="rectangular"
                    width="10%"
                    height={16}
                  />
                </Box>
                <Skeleton
                  sx={{ mt: 1, borderRadius: 1 }}
                  variant="rectangular"
                  width="100%"
                  height={16}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Skeleton
                    sx={{ mt: 1, borderRadius: 1 }}
                    variant="rectangular"
                    width="100%"
                    height={32}
                  />
                  <Skeleton
                    sx={{ mt: 1, borderRadius: 1 }}
                    variant="rectangular"
                    width="10%"
                    height={32}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </ClickAwayListener>
      )}
    </>
  );
};

export default SubAppBar;
