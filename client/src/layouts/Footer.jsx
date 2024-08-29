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
    <Box component="footer" mt={5} py={3} bgcolor="primary.main">
      <Divider />
      <Box display="flex" justifyContent="space-between" py={3} sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "Column",
            // background: "red",
          }}
        >
          <Typography variant="h6">Atendimento</Typography>
          <Box sx={{ display: "flex", flexDirection: "Column", gap: 2, mt: 2 }}>
            <Link
              href="#"
              variant="body1"
              underline="hover"
              color="textPrimary"
            >
              Correções
            </Link>
            <Link
              href="#"
              variant="body1"
              underline="hover"
              color="textPrimary"
            >
              Fale Conosco
            </Link>
            <Link
              href="#"
              variant="body1"
              underline="hover"
              color="textPrimary"
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
          <Typography variant="h6">Contato</Typography>

          <Box sx={{ display: "flex", flexDirection: "Column", gap: 2, mt: 2 }}>
            <Link
              href="#"
              variant="body1"
              underline="hover"
              color="textPrimary"
            >
              Correções
            </Link>
            <Link
              href="#"
              variant="body1"
              underline="hover"
              color="textPrimary"
            >
              Fale Conosco
            </Link>
            <Link
              href="#"
              variant="body1"
              underline="hover"
              color="textPrimary"
            >
              Portal do Assinante
            </Link>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        py={2}
        sx={{ p: 2 }}
      >
        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          <img src={LogoLight} alt="Logo" style={{ width: "28px" }} />
          <Typography variant="body1" color="textSecondary">
            <span style={{ color: "#FEF8ED" }}>N</span>ath
            <span style={{ color: "#FEF8ED" }}>N</span>ews
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
      <Divider />
      <Typography variant="body2" align="center" py={2} mb={-2.5}>
        &copy; 2024 Nath News Company. Direitos reservados.
      </Typography>
    </Box>
  );
};

export default Footer;
