// controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, name: user.name, email: user.email, picture: user.picture },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    },
  );
};

export const registerUser = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ msg: "Passwords não são iguais." });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Usuário já existente." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({ name, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user);
    return res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Erro ao tentar registrar o usuário.");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.password)
      return res.status(400).json({ msg: "Usuário ou senha inválidos." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ msg: "Usuário ou senha inválidos." });

    const token = generateToken(user);
    return res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Erro ao tentar logar o usuário.");
  }
};

export const googleLogin = async (req, res) => {
  try {
    const { id, displayName, emails, photos } = req.user;

    let user = await User.findOne({ googleId: id });
    if (!user) {
      user = new User({
        googleId: id,
        name: displayName,
        email: emails[0].value,
        picture: photos[0].value,
      });
      await user.save();
    }

    const token = generateToken(user);
    return res.status(200).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: user.picture,
      },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: "Erro no login com Google." });
  }
};

export const validateToken = (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ valid: false, msg: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json({ valid: true, user: decoded });
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ valid: false, msg: "Token inválido" });
  }
};

export const updateProfile = async (req, res) => {
  const {
    description,
    favoriteBooks,
    readingRecommendations,
    link,
    socialLinks,
  } = req.body;

  try {
    const userId = req.user.id; // Supondo que o ID do usuário esteja no token JWT

    // Encontre o usuário
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    // Atualize os campos do perfil
    user.perfil.description = description || user.perfil.description;
    user.perfil.favoriteBooks = favoriteBooks || user.perfil.favoriteBooks;
    user.perfil.readingRecommendations =
      readingRecommendations || user.perfil.readingRecommendations;
    user.perfil.link = link || user.perfil.link;
    user.perfil.socialLinks = socialLinks || user.perfil.socialLinks;

    // Salve as alterações
    await user.save();

    return res.status(200).json(user.perfil);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Erro ao tentar atualizar o perfil.");
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Supondo que o ID do usuário esteja no token JWT

    // Encontre o usuário
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    // Retorne os dados do perfil
    return res.status(200).json(user.perfil || {});
  } catch (err) {
    console.error("Erro ao buscar o perfil:", err);
    return res.status(500).json({ msg: "Erro ao buscar o perfil." });
  }
};

export const updateUser = async (req, res) => {
  const { name, email, password, currentPassword } = req.body;
  const userId = req.user.id; // Assumindo que o ID do usuário está no token JWT

  try {
    // Encontre o usuário
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado." });
    }

    // Se o usuário quiser atualizar a senha, verificar a senha atual primeiro
    if (password && currentPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Senha atual incorreta." });
      }
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Atualizar nome e email
    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    return res.status(200).json({
      msg: "Perfil atualizado com sucesso.",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Erro ao atualizar perfil.");
  }
};
