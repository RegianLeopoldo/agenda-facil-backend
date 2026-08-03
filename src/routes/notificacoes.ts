import { Router } from "express";
import prisma from "../lib/prisma";
import { autenticar, AuthRequest } from "../middleware/auth";

const router = Router();

// Todas as rotas exigem autenticação
router.use(autenticar);

// =============================
// GET - Listar notificações
// =============================
router.get("/", async (req: AuthRequest, res) => {
  try {
    const notificacoes = await prisma.notificacao.findMany({
      where: {
        usuarioId: req.usuarioId!,
      },
      orderBy: {
        criadaEm: "desc",
      },
      include: {
        compromisso: true,
      },
    });

    return res.json(notificacoes);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao buscar notificações",
    });
  }
});

// ===================================
// GET - Contar notificações não lidas
// ===================================
router.get("/nao-lidas", async (req: AuthRequest, res) => {
  try {
    const quantidade = await prisma.notificacao.count({
      where: {
        usuarioId: req.usuarioId!,
        lida: false,
      },
    });

    return res.json({
      quantidade,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao contar notificações",
    });
  }
});

// =============================
// PUT - Marcar como lida
// =============================
router.put("/:id/lida", async (req: AuthRequest, res) => {
  try {
    const id = Number(req.params.id);

    const notificacao = await prisma.notificacao.findFirst({
      where: {
        id,
        usuarioId: req.usuarioId!,
      },
    });

    if (!notificacao) {
      return res.status(404).json({
        erro: "Notificação não encontrada",
      });
    }

    const atualizada = await prisma.notificacao.update({
      where: {
        id: notificacao.id,
      },
      data: {
        lida: true,
      },
    });

    return res.json(atualizada);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao marcar notificação como lida",
    });
  }
});

// =================================
// PUT - Marcar todas como lidas
// =================================
router.put("/lidas/todas", async (req: AuthRequest, res) => {
  try {
    await prisma.notificacao.updateMany({
      where: {
        usuarioId: req.usuarioId!,
        lida: false,
      },
      data: {
        lida: true,
      },
    });

    return res.json({
      mensagem: "Todas as notificações foram marcadas como lidas",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao marcar notificações como lidas",
    });
  }
});

export default router;
