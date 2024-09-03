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
