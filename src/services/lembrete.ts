import prisma from "../lib/prisma";
import { enviarEmail } from "./email";

export async function verificarLembretes() {
  try {
    const agora = new Date();

    console.log("Agora:", agora.toLocaleString("pt-BR"));

    const compromissos = await prisma.compromisso.findMany({
      where: {
        status: "PENDENTE",
        lembreteEnviado: false,
      },
      include: {
        usuario: true,
      },
    });

    console.log(`Compromissos encontrados: ${compromissos.length}`);

    for (const compromisso of compromissos) {
      const dataBanco = new Date(compromisso.data);

      const ano = dataBanco.getUTCFullYear();
      const mes = String(dataBanco.getUTCMonth() + 1).padStart(2, "0");
      const dia = String(dataBanco.getUTCDate()).padStart(2, "0");

      const dataCompromisso = new Date(
        `${ano}-${mes}-${dia}T${compromisso.horario}:00-03:00`,
      );

      const horarioLembrete = new Date(
        dataCompromisso.getTime() - compromisso.lembreteMinutos * 60 * 1000,
      );

      console.log("----------------------------");
      console.log(`Compromisso: ${compromisso.titulo}`);
      console.log(
        `Horário do compromisso: ${dataCompromisso.toLocaleString("pt-BR")}`,
      );
      console.log(
        `Horário do lembrete: ${horarioLembrete.toLocaleString("pt-BR")}`,
      );
      console.log(
        "Horário do lembrete:",
        horarioLembrete.toLocaleString("pt-BR"),
      );

      const dentroDoPeriodo =
        compromisso.lembreteMinutos === 0
          ? agora >= horarioLembrete &&
            agora <= new Date(dataCompromisso.getTime() + 60 * 1000)
          : agora >= horarioLembrete && agora < dataCompromisso;

      if (!dentroDoPeriodo) {
        console.log("Ainda não está no horário do lembrete.");
        continue;
      }

      if (!compromisso.usuario.email) {
        console.log("Usuário não possui e-mail.");
        continue;
      }

      const mensagem = `
Olá, ${compromisso.usuario.nome ?? "usuário"}!

Este é um lembrete do seu compromisso.

Compromisso: ${compromisso.titulo}
Data: ${dataCompromisso.toLocaleDateString("pt-BR")}
Horário: ${compromisso.horario}
Local: ${compromisso.local}

${compromisso.descricao ? `Descrição: ${compromisso.descricao}` : ""}

Seu compromisso acontecerá em breve.

Agenda Fácil
      `.trim();

      const enviado = await enviarEmail(
        compromisso.usuario.email,
        `Lembrete: ${compromisso.titulo}`,
        mensagem,
      );

      if (enviado) {
        await prisma.compromisso.update({
          where: {
            id: compromisso.id,
          },
          data: {
            lembreteEnviado: true,
          },
        });

        await prisma.notificacao.create({
          data: {
            titulo: "Lembrete de compromisso",
            mensagem: `Seu compromisso "${compromisso.titulo}" acontecerá em breve, às ${compromisso.horario}.`,
            usuarioId: compromisso.usuarioId,
            compromissoId: compromisso.id,
          },
        });

        console.log(
          `✅ Lembrete enviado e notificação criada: compromisso ${compromisso.id}`,
        );
      } else {
        console.log(
          `❌ Não foi possível enviar o lembrete: compromisso ${compromisso.id}`,
        );
      }
    }
  } catch (error) {
    console.error("Erro ao verificar lembretes:", error);
  }
}
