import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

if (
  !process.env.STRIPE_SECRET_KEY ||
  !process.env.STRIPE_PUBLISHABLE_KEY ||
  !process.env.STATIC_DIR
) {
  console.log("O arquivo .env não está configurado.");

  process.env.STRIPE_SECRET_KEY
    ? ""
    : console.log(
        "Erro ao tentar acessar:  < STRIPE_SECRET_KEY > no arquivo .env",
      );

  process.env.STRIPE_PUBLISHABLE_KEY
    ? ""
    : console.log(
        "Erro ao tentar acessar:  < STRIPE_PUBLISHABLE_KEY > no arquivo .env",
      );

  process.env.STATIC_DIR
    ? ""
    : console.log("Erro ao tentar acessar:  < STATIC_DIR > no arquivo .env ");

  process.exit();
} else {
  console.log("KEYS_Rodando no dotenv");
}
