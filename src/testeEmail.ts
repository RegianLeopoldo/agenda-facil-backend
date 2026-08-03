import dotenv from "dotenv";
import { enviarEmail } from "./services/email";

dotenv.config();

async function testar() {
  const enviado = await enviarEmail(
    "regian.engcomp@gmail.com",
    "Teste Agenda Fácil",
    "Este é um teste de envio de e-mail do Agenda Fácil.",
  );

  console.log(
    enviado ? "E-mail enviado com sucesso!" : "Falha ao enviar e-mail.",
  );
}

testar();
