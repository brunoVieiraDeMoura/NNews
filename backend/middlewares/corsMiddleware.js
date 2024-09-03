import cors from "cors";

export const corsMiddleware = cors({
  origin: "http://localhost:5173", // Certifique-se de que este seja o endereço correto do seu frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});
