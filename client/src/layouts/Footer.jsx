import React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LogoLight from "../assets/LogoLight.png";
const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        flexDirection: "Column",
      }}
    >
      <Box
        component="footer"
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "Column",
        }}
        mt={5}
        py={3}
        bgcolor="primary.main"
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "Column",
            alignItems: "center",
          }}
        >
          <Divider
            sx={{
              width: "100%",
            }}
          />
          <Box
            display="flex"
            py={3}
            sx={{
              p: 2,
              // background: "red",
              width: "100%",
              maxWidth: "1300px",

              justifyContent: {
                xs: "space-between",
                md: "space-between",
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "Column",
                // background: "red",
              }}
            >
              <Typography variant="h6" color="#C0AD90">
                Atendimento
              </Typography>
              <Box
                sx={{ display: "flex", flexDirection: "Column", gap: 2, mt: 2 }}
              >
                <Link
                  href="#"
                  variant="body1"
                  underline="hover"
                  color="#C0AD90"
                >
                  Correções
                </Link>
                <Link
                  href="#"
                  variant="body1"
                  underline="hover"
                  color="#C0AD90"
                >
                  Fale Conosco
                </Link>
                <Link
                  href="#"
                  variant="body1"
                  underline="hover"
                  color="#C0AD90"
                >
                  Portal do Assinante
                </Link>
              </Box>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "Column",
              }}
            >
              <Typography variant="h6" color="#C0AD90">
                Institucional
              </Typography>

              <Box
                sx={{ display: "flex", flexDirection: "Column", gap: 2, mt: 2 }}
              >
                <Link
                  href="#"
                  variant="body1"
                  underline="hover"
                  color="#C0AD90"
                >
                  Código de ética
                </Link>
                <Link
                  href="#"
                  variant="body1"
                  underline="hover"
                  color="#C0AD90"
                >
                  Princípios Editoriais
                </Link>
                <Link
                  href="#"
                  variant="body1"
                  underline="hover"
                  color="#C0AD90"
                >
                  Termo de uso
                </Link>
              </Box>
            </Box>
          </Box>
          <Divider
            sx={{
              width: "100%",
            }}
          />
          <Box
            display="flex"
            alignItems="center"
            py={2}
            sx={{
              p: 2,
              justifyContent: "space-between",
              width: "100%",
              maxWidth: "1300px",
            }}
          >
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <img src={LogoLight} alt="Logo" style={{ width: "28px" }} />
              <Typography variant="body1" color="textSecondary">
                <span style={{ color: "#C0AD90" }}>N</span>
                <span style={{ color: "#C0AD90" }}>N</span>ews
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <WhatsAppIcon />
              </IconButton>
              <IconButton>
                <InstagramIcon />
              </IconButton>
              <IconButton>
                <TwitterIcon />
              </IconButton>
              <IconButton>
                <PinterestIcon />
              </IconButton>
            </Box>
          </Box>

          <Divider
            sx={{
              width: "100%",
            }}
          />
          <Typography variant="body2" align="center" py={2} mb={-2.5}>
            &copy; 2024 NNews Company. Direitos reservados.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
