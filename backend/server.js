import "./config/env.js";
import app from "./app.js";

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Servidor Node rodando na porta http://localhost:${PORT}!`),
);
