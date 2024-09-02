import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../../utils/sendEmail.js";
import User from "./../../models/User.js";

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

const validatePassword = (password) => {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(String(password));
};

export const registerUser = async (req, res) => {
  console.log("Dados recebidos no backend:", req.body);

  const { name, email, password, confirmPassword } = req.body;

  const errors = [];

  if (!email) {
    errors.push({ field: "email", message: "Email necessário" });
  } else if (!validateEmail(email)) {
    errors.push({ field: "email", message: "Email inválido (Regex)" });
  }

  if (!password) {
    errors.push({ field: "password", message: "Password necessário" });
  } else if (!validatePassword(password)) {
    errors.push({ field: "password", message: "Password inválido (Regex)" });
  }

  if (password !== confirmPassword) {
    errors.push({
      field: "confirmPassword",
      message: "Passwords não são iguais",
    });
  }

  if (errors.length > 0) {
    console.log("Erros de validação:", errors);
    return res.status(400).json({ errors });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      console.log("Usuário já existente.");
      return res.status(400).json({ msg: "Usuário já existente." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();
    console.log("Sucesso! Usuário cadastrado com sucesso.");
    return res
      .status(201)
      .json({ msg: "Sucesso! Usuário cadastrado com sucesso." });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Error ao tentar cadastrar o usuário.");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Usuário Inválido" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Senha Inválida" });

    // Gerar o token JWT
    const payload = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      token,
      userId: user._id,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Erro ao tentar acessar Token");
  }
};

export const validateToken = async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ valid: false, msg: "Token não fornecido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.user.id).select(
      "name email phone",
    );

    if (!user) {
      return res
        .status(404)
        .json({ valid: false, msg: "Usuário não encontrado" });
    }

    return res.status(200).json({ valid: true, user });
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ valid: false, msg: "Token inválido" });
  }
};

export const someProtectedController = (req, res) => {
  // Acessa o usuário validado anexado à requisição
  const user = req.user;

  return res.status(200).json({
    valid: true,
    user, // Retorna as informações do usuário
    msg: "Acesso autorizado",
  });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send("Usuário não encontrado");
    }

    // Gera um token JWT
    const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    // Envia o email com o link de reset
    const message = `<h1>Redefinição de Senha</h1>
    <p>Você solicitou a redefinição de senha. Clique no link abaixo para redefinir sua senha:</p>
    <a href="${resetUrl}">Redefinir Senha</a>`;

    await sendEmail({
      email: user.email,
      subject: "Redefinir Senha",
      message,
    });

    return res.status(200).send("Email enviado.");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error ao enviar email.");
  }
};

export const resetPassword = async (req, res) => {
  try {
    // Verifica o token JWT
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(400).send("Token inválido ou expirado.");
    }

    // Define a nova senha, utilizando bcrypt para criptografá-la
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    await user.save();

    return res.status(200).send("Password resetado com sucesso.");
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error ao resetar password.");
  }
};

export const updateUser = async (req, res) => {
  const { userId, name, email, phone, password, oldPassword } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (password) {
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Senha antiga incorreta" });
      }

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    return res
      .status(200)
      .json({ msg: "Usuário atualizado com sucesso", user });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Erro no servidor" });
  }
};
