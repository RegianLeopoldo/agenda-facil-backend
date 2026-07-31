import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import compromissosRoutes from "./routes/compromissos";
import authRoutes from "./routes/auth";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/compromissos", compromissosRoutes);

app.listen(3333, () => {
  console.log("API rodando na porta 3333");
});
