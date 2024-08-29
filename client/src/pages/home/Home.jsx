import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import prometeuImg from "../../assets/images/prometeomoderno.jpg";
import NathIcon from "../../assets/icons/nath.png";
import ShareIcon from "@mui/icons-material/Share";
const Home = () => {
  return (
    <>
      <Typography
        sx={{ mb: 1, fontWeight: "bold" }}
        variant="body1"
        color="textSecondary"
      >
        Mais recentes
      </Typography>
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          maxWidth: {
            xs: "100%",
            sm: "340px",
          },
        }}
      >
        {/* Foto */}
        <div style={{ position: "relative" }}>
          <CardMedia
            component="img"
            height="140"
            image={prometeuImg}
            alt="Notícia"
          />
          <div
            style={{
              position: "absolute",
              bottom: "-32px",
              left: "8px",
            }}
          >
            <img
              src={NathIcon}
              alt="Logo"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                border: "4px solid #4B322E",
                transform: "rotate(90deg)",
              }}
            />
          </div>
        </div>
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
              Nathalia Orlando
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
          <Typography variant="h5" component="div" sx={{ mt: 1 }} gutterBottom>
            Frankenstein ou o Prometeu Moderno, de Mary Shelley
          </Typography>

          {/* Texto */}
          <Box></Box>
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
            <strong>
              A mulher que desafiou as leis da criação.<br></br>
            </strong>{" "}
            No início do século XIX, uma jovem escritora britânica ousou
            transgredir os limites impostos pela sociedade e pelas crenças
            religiosas de sua época. Mary Shelley concebeu uma obra que viria a
            se tornar um dos marcos da literatura mundial: Frankenstein, ou o
            Prometeu Moderno. Nesse romance, Shelley não apenas criou um conto
            de terror gótico, mas também lançou um olhar crítico sobre o poder
            da ciência, a ambição desmedida e as implicações éticas de desafiar
            as leis da criação.
          </Typography>

          {/* Ícone de favoritar */}
        </CardContent>
      </Card>
    </>
  );
};

export default Home;
