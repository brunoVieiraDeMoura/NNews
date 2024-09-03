import express from "express";
import passport from "../../config/passport.js";
import {
  registerUser,
  loginUser,
  googleLogin,
  validateToken,
} from "../../controllers/auth/authController.js";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { OAuth2Client } from "google-auth-library";

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Rota para registro de novo usuário
router.post("/register", registerUser);

// Rota para login com email e senha
router.post("/login", loginUser);

// Rota para validar token JWT
router.post("/validate-token", validateToken);

// Inicia o processo de autenticação com Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// Callback do Google após a autenticação, com redirecionamento
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleLogin,
);

// Rota POST para verificar o token ID do Google e gerar JWT
router.post("/google/callback", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { sub: googleId, name, email, picture } = payload;

    // Primeiro, procure por um usuário com este `googleId`
    let user = await User.findOne({ googleId });

    if (user) {
      // Se o usuário já existe com este Google ID, faça login
      console.log("Usuário encontrado com Google ID");
    } else {
      // Se o Google ID não for encontrado, procure por um usuário com o mesmo email
      user = await User.findOne({ email });

      if (user) {
        // Se um usuário com o mesmo email existir, associe o Google ID a esse usuário
        console.log(
          "Usuário existente encontrado com o mesmo email, associando Google ID",
        );
        user.googleId = googleId;
        user.picture = picture; // Atualize a foto de perfil se necessário
      } else {
        // Caso contrário, crie um novo usuário
        console.log(
          "Nenhum usuário encontrado, criando um novo usuário com Google ID",
        );
        user = new User({
          googleId,
          name,
          email,
          picture,
        });
      }

      await user.save();
    }

    const jwtToken = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return res.status(200).json({ token: jwtToken, user });
  } catch (err) {
    console.error("Erro no login com Google:", err);
    return res.status(500).json({ msg: "Erro no login com Google" });
  }
});

export default router;
