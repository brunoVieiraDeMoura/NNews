import express from "express";
import { corsMiddleware } from "./middlewares/corsMiddleware.js";
import { bodyParserMiddleware } from "./middlewares/bodyParserMiddleware.js";
import authRoutes from "./routes/auth/authRoutes.js";
import connectDB from "./config/db.js";
import path from "path";
import passport from "./config/passport.js";
const app = express();

connectDB();

// Middleware
app.use(passport.initialize());
app.use(corsMiddleware);
app.use(bodyParserMiddleware);

app.use("/api/auth", authRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(process.env.STATIC_DIR, "index.html"));
});

export default app;
