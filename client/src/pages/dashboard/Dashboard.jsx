import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Dialog from "@mui/material/Dialog";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { handleImageChange } from "../../util/ImageUtils";
import ImageCropper from "../../components/ImageEdits/ImageCropper";
import { formatName } from "../../util/formatNameUtils";
import AcordionSobrePerfil from "./../../components/Dashboard/AcordionSobrePerfil";
import SettingsPerfil from "../../components/Dashboard/SettingsPerfil";

const Dashboard = () => {
  const { user, loading, setUser } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cropperOpen, setCropperOpen] = useState(false);
  const [imageToCrop, setImageToCrop] = useState(null);

  const navigate = useNavigate();
  console.log(user);
  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/");
    } else {
      setSelectedImage(user.picture || null);
    }
  }, [user, loading]);

  const handleFileChange = (event) => {
    handleImageChange(
      event,
      (image) => {
        setImageToCrop(image);
        setCropperOpen(true);
      },
      { type: "avatar" },
    );
  };

  const handleCropComplete = (croppedImage) => {
    setSelectedImage(croppedImage);
    setUser((prevUser) => ({ ...prevUser, picture: croppedImage }));
    setCropperOpen(false);
  };

  if (loading) return <Typography variant="h6">Carregando...</Typography>;
  if (!user)
    return <Typography variant="h6">Usuário não encontrado.</Typography>;

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          p: { xs: 2, md: 3 },
          width: "100%",
          maxWidth: "1300px",
        }}
      >
        <Box
          sx={{
            display: { xs: "flex", md: "grid" },
            flexDirection: { xs: "Column", md: "none" },
            gridTemplateColumns: { md: "1fr 1fr" },
          }}
        >
          {/* Box do Perfil */}
          <Box>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Stack
                sx={{
                  position: "relative",
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                }}
                direction="column"
                alignItems="center"
                spacing={2}
              >
                <Avatar
                  alt={user.name || "User Avatar"}
                  src={selectedImage || user.picture}
                  sx={{ width: 112, height: 112 }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: {
                      xs: "0px",
                      md: "-8px",
                      lg: "0px",
                    },
                    left: {
                      xs: "0px",
                      md: "-10px",
                      lg: "-12px",
                    },
                  }}
                >
                  <label htmlFor="icon-button-file">
                    <input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera
                        sx={{
                          fontSize: "40px",
                        }}
                      />
                    </IconButton>
                  </label>
                </Box>

                <Dialog
                  open={cropperOpen}
                  onClose={() => setCropperOpen(false)}
                  maxWidth="xs"
                  fullWidth
                >
                  <ImageCropper
                    imageSrc={imageToCrop}
                    onCropComplete={handleCropComplete}
                  />
                </Dialog>
              </Stack>
              <Stack
                sx={{
                  position: "relative",
                  display: {
                    xs: "flex",
                    md: "none",
                  },
                }}
                direction="column"
                alignItems="center"
                spacing={2}
              >
                <Avatar
                  alt={user.name || "User Avatar"}
                  src={selectedImage || user.picture}
                  sx={{ width: 64, height: 64 }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    bottom: {
                      xs: "6px",
                    },
                    left: {
                      xs: "-10px",
                    },
                  }}
                >
                  <label htmlFor="icon-button-file">
                    <input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera sx={{ fontSize: "32px" }} />
                    </IconButton>
                  </label>
                </Box>
                <Dialog
                  open={cropperOpen}
                  onClose={() => setCropperOpen(false)}
                  maxWidth="sm"
                  fullWidth
                >
                  <ImageCropper
                    imageSrc={imageToCrop}
                    onCropComplete={handleCropComplete}
                  />
                </Dialog>
              </Stack>

              <Box>
                <Typography variant="h3" gutterBottom>
                  Bem-vindo, {formatName(user.name)}!
                </Typography>
              </Box>
            </Box>
            <Typography sx={{ mt: 0 }} variant="body1" gutterBottom>
              Aqui é o seu painel de controle, onde você pode ajustar suas
              configurações para uma experiência de interação ainda mais
              dinâmica.
            </Typography>
            <AcordionSobrePerfil />
          </Box>

          {/* Box de Configurações */}
          <Box
            sx={{
              mt: {
                xs: 4,
                md: 0,
              },
            }}
          >
            <SettingsPerfil />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
