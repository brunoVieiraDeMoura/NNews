import cors from "cors";

export const corsMiddleware = cors({
  origin: "http://localhost:5173", // Substitua pelo endereço do seu frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
});
