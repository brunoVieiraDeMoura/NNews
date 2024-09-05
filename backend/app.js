import express from "express";
import authRoutes from "./routes/auth/authRoutes.js";
import connectDB from "./config/db.js";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import passport from "./config/passport.js";

import { bodyParserMiddleware } from "./middlewares/bodyParserMiddleware.js";

const app = express();

connectDB();

app.use(bodyParser.json());
app.use(bodyParserMiddleware);
app.use(passport.initialize());
app.use(cors());

app.use("/api/auth", authRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(process.env.STATIC_DIR, "index.html"));
});

export default app;
