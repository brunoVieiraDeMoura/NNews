import express from "express";
import { corsMiddleware } from "./middlewares/corsMiddleware.js";
import { bodyParserMiddleware } from "./middlewares/bodyParserMiddleware.js";
import authRoutes from "./routes/auth/authRoutes.js";
import connectDB from "./config/db.js";
import path from "path";
const app = express();

connectDB();

//Get index
app.get("*", (req, res) => {
  res.sendFile(path.resolve(process.env.STATIC_DIR, "index.html"));
});

// Middleware
app.use(express.json());
app.use(corsMiddleware);
app.use(express.static(process.env.STATIC_DIR));
app.use(bodyParserMiddleware);

app.use("/api/auth", authRoutes);

export default app;
