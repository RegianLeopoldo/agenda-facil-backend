import { Router } from "express";
import prisma from "../lib/prisma";
import { autenticar, AuthRequest } from "../middleware/auth";

const router = Router();

// Todas as rotas exigem autenticação
router.use(autenticar);

function criarDataLocal(data: string) {
  return new Date(`${data}T12:00:00-03:00`);
}

// =========================
// GET - Listar compromissos
// =========================
router.get("/", async (req: AuthRequest, res) => {
  try {
    const compromissos = await prisma.compromisso.findMany({
      where: {
        usuarioId: req.usuarioId!,
      },
      orderBy: {
        data: "asc",
      },
    });

    return res.json(compromissos);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao buscar compromissos",
    });
  }
});

// ==============================
// GET - Buscar compromisso por ID
// ==============================
router.get("/:id", async (req: AuthRequest, res) => {
  try {
    const id = Number(req.params.id);

    const compromisso = await prisma.compromisso.findFirst({
      where: {
        id,
        usuarioId: req.usuarioId!,
      },
    });

    if (!compromisso) {
      return res.status(404).json({
        erro: "Compromisso não encontrado",
      });
    }

    return res.json(compromisso);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao buscar compromisso",
    });
  }
});

// =========================
// POST - Criar compromisso
// =========================
router.post("/", async (req: AuthRequest, res) => {
  try {
    const { titulo, descricao, data, horario, local, lembreteMinutos } =
      req.body;

    if (!titulo || !descricao || !data || !horario || !local) {
      return res.status(400).json({
        erro: "Todos os campos são obrigatórios",
      });
    }

    const compromisso = await prisma.compromisso.create({
      data: {
        titulo,
        descricao,
        data: criarDataLocal(data),
        horario,
        local,
        lembreteMinutos: Number(lembreteMinutos ?? 30),
        usuarioId: req.usuarioId!,
      },
    });

    return res.status(201).json(compromisso);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao criar compromisso",
    });
  }
});

// ===========================
// PUT - Atualizar compromisso
// ===========================
router.put("/:id", async (req: AuthRequest, res) => {
  try {
    const id = Number(req.params.id);

    const { data, lembreteMinutos, ...resto } = req.body;

    const compromisso = await prisma.compromisso.findFirst({
      where: {
        id,
        usuarioId: req.usuarioId!,
      },
    });

    if (!compromisso) {
      return res.status(404).json({
        erro: "Compromisso não encontrado",
      });
    }

    const atualizado = await prisma.compromisso.update({
      where: {
        id: compromisso.id,
      },
      data: {
        ...resto,

        ...(data && {
          data: criarDataLocal(data),
        }),

        ...(lembreteMinutos !== undefined && {
          lembreteMinutos: Number(lembreteMinutos),
        }),

        lembreteEnviado: false,
      },
    });

    return res.json(atualizado);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao atualizar compromisso",
    });
  }
});

// ==========================
// DELETE - Excluir compromisso
// ==========================
router.delete("/:id", async (req: AuthRequest, res) => {
  try {
    const id = Number(req.params.id);

    const compromisso = await prisma.compromisso.findFirst({
      where: {
        id,
        usuarioId: req.usuarioId!,
      },
    });

    if (!compromisso) {
      return res.status(404).json({
        erro: "Compromisso não encontrado",
      });
    }

    await prisma.compromisso.delete({
      where: {
        id: compromisso.id,
      },
    });

    return res.json({
      mensagem: "Compromisso removido com sucesso",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao excluir compromisso",
    });
  }
});

export default router;

/*import { Router } from "express";
import prisma from "../lib/prisma";
import { autenticar, AuthRequest } from "../middleware/auth";

const router = Router();

// Todas as rotas exigem autenticação
router.use(autenticar);

// =========================
// GET - Listar compromissos
// =========================
router.get("/", async (req: AuthRequest, res) => {
  try {
    const compromissos = await prisma.compromisso.findMany({
      where: {
        usuarioId: req.usuarioId!,
      },
      orderBy: {
        data: "asc",
      },
    });

    return res.json(compromissos);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao buscar compromissos",
    });
  }
});

// ==============================
// GET - Buscar compromisso por ID
// ==============================
router.get("/:id", async (req: AuthRequest, res) => {
  try {
    const id = Number(req.params.id);

    const compromisso = await prisma.compromisso.findFirst({
      where: {
        id,
        usuarioId: req.usuarioId!,
      },
    });

    if (!compromisso) {
      return res.status(404).json({
        erro: "Compromisso não encontrado",
      });
    }

    return res.json(compromisso);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao buscar compromisso",
    });
  }
});

// =========================
// POST - Criar compromisso
// =========================
router.post("/", async (req: AuthRequest, res) => {
  try {
    const { titulo, descricao, data, horario, local } = req.body;

    if (!titulo || !descricao || !data || !horario || !local) {
      return res.status(400).json({
        erro: "Todos os campos são obrigatórios",
      });
    }

    const compromisso = await prisma.compromisso.create({
      data: {
        titulo,
        descricao,
        data: new Date(data),
        horario,
        local,
        usuarioId: req.usuarioId!,
      },
    });

    return res.status(201).json(compromisso);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao criar compromisso",
    });
  }
});

// ===========================
// PUT - Atualizar compromisso
// ===========================
router.put("/:id", async (req: AuthRequest, res) => {
  try {
    const id = Number(req.params.id);

    const { data, ...resto } = req.body;

    const compromisso = await prisma.compromisso.findFirst({
      where: {
        id,
        usuarioId: req.usuarioId!,
      },
    });

    if (!compromisso) {
      return res.status(404).json({
        erro: "Compromisso não encontrado",
      });
    }

    const atualizado = await prisma.compromisso.update({
      where: {
        id: compromisso.id,
      },
      data: {
        ...resto,
        ...(data && {
          data: new Date(data),
        }),
      },
    });

    return res.json(atualizado);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao atualizar compromisso",
    });
  }
});

// ==========================
// DELETE - Excluir compromisso
// ==========================
router.delete("/:id", async (req: AuthRequest, res) => {
  try {
    const id = Number(req.params.id);

    const compromisso = await prisma.compromisso.findFirst({
      where: {
        id,
        usuarioId: req.usuarioId!,
      },
    });

    if (!compromisso) {
      return res.status(404).json({
        erro: "Compromisso não encontrado",
      });
    }

    await prisma.compromisso.delete({
      where: {
        id: compromisso.id,
      },
    });

    return res.json({
      mensagem: "Compromisso removido com sucesso",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      erro: "Erro ao excluir compromisso",
    });
  }
});

export default router;*/
