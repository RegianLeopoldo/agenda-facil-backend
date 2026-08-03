import dotenv from "dotenv";
import { Resend } from "resend";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarEmail(
  destinatario: string,
  assunto: string,
  mensagem: string,
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Agenda Fácil <onboarding@resend.dev>",
      to: destinatario,
      subject: assunto,
      text: mensagem,
    });

    if (error) {
      console.error("Erro ao enviar e-mail:", error);
      return false;
    }

    console.log("E-mail enviado:", data?.id);

    return true;
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return false;
  }
}
