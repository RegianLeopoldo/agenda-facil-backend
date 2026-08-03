import dotenv from "dotenv";
import { verificarLembretes } from "./services/lembrete";

dotenv.config();

async function testar() {
  console.log("Verificando lembretes...");

  await verificarLembretes();

  console.log("Verificação finalizada.");

  process.exit(0);
}

testar();
