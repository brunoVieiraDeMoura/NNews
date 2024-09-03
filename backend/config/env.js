import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

if (!process.env.STATIC_DIR) {
  console.log("O arquivo .env não está configurado.");

  process.env.STATIC_DIR
    ? ""
    : console.log("Erro ao tentar acessar:  < STATIC_DIR > no arquivo .env ");

  process.exit();
} else {
  console.log("KEYS_Rodando no dotenv");
}
