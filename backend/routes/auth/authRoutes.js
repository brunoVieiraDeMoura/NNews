import express from "express";
import passport from "../../config/passport.js";
import {
  registerUser,
  loginUser,
  googleLogin,
  validateToken,
  updateProfile,
  getUserProfile,
  updateUser,
} from "../../controllers/auth/authController.js";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";
import { OAuth2Client } from "google-auth-library";
import {
  createCategoria,
  deleteCategoria,
  getCategoriaById,
  getCategorias,
  getCategoriasPopulated,
  updateCategoria,
} from "./../../controllers/categorias/categoriaController.js";
import {
  createSubcategoria,
  deleteSubcategoria,
  getSubcategoriaById,
  getSubcategorias,
  updateSubcategoria,
} from "./../../controllers/categorias/subcategoriaController.js";
import {
  createMateria,
  deleteMateria,
  getMateriaById,
  getMaterias,
  updateMateria,
} from "./../../controllers/categorias/materiaController.js";

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

// Rota Put Perfil para adicionar textos e informações do Perfil
router.put(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  updateProfile,
);
// Rota get Perfil para puxar textos e informações do Perfil
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getUserProfile, // Utilize a função getUserProfile
);
// Rota Put Perfil para alterar os dados do Perfil
router.put(
  "/update-profile",
  passport.authenticate("jwt", { session: false }),
  updateUser, // Função que vamos criar para atualizar os dados do usuário
);

// Categorias
router.post("/categorias", createCategoria);
router.get("/categorias/populated", getCategoriasPopulated);
router.delete("/categorias/:id", deleteCategoria);
router.get("/categorias", getCategorias);
router.get("/categorias/:id", getCategoriaById);
router.put("/categorias/:id", updateCategoria);

// Subcategorias
router.post("/subcategorias", createSubcategoria);
router.delete("/subcategorias/:id", deleteSubcategoria);
router.get("/subcategorias", getSubcategorias);
router.get("/subcategorias/:id", getSubcategoriaById);
router.put("/subcategorias/:id", updateSubcategoria);

// Matérias
router.post("/materias", createMateria);
router.delete("/materias/:id", deleteMateria);
router.get("/materias", getMaterias);
router.get("/materias/:id", getMateriaById);
router.put("/materias/:id", updateMateria);

export default router;
