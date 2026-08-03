import { verificarLembretes } from "./lembrete";

export function iniciarSchedulerLembretes() {
  console.log("📅 Scheduler de lembretes iniciado.");

  // Verifica imediatamente ao iniciar o servidor
  verificarLembretes();

  // Depois verifica a cada 1 minuto
  setInterval(() => {
    verificarLembretes();
  }, 60 * 1000);
}
