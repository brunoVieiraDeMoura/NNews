import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.sendStatus(401); // Sem token, retorna 'Unauthorized' e encerra a execução da função
  }

  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error("Falha ao verificar token:", err);
      return res.sendStatus(403); // Token inválido, retorna 'Forbidden' e encerra a execução da função
    }

    console.log("Token decodificado:", decoded); // Log para verificar o conteúdo decodificado do token
    req.user = decoded.user; // Decodifica e define `req.user` com os dados do token
    return next(); // Continua para o próximo middleware ou rota, garantindo que a função sempre retorne algo
  });
};
