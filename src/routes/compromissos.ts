import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router();

// GET - listar compromissos
router.get("/", async (req, res) => {
  try {
    const compromissos = await prisma.compromisso.findMany({
      orderBy: {
        data: "asc",
      },
    });

    res.json(compromissos);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar compromissos",
    });
  }
});

// GET - buscar compromisso por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const compromisso = await prisma.compromisso.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!compromisso) {
      return res.status(404).json({
        erro: "Compromisso não encontrado",
      });
    }

    res.json(compromisso);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao buscar compromisso",
    });
  }
});

// POST - criar compromisso
router.post("/", async (req, res) => {
  try {
    const { titulo, descricao, data, horario, local } = req.body;

    const compromisso = await prisma.compromisso.create({
      data: {
        titulo,
        descricao,
        data: new Date(data),
        horario,
        local,
        usuarioId: 1,
      },
    });

    res.status(201).json(compromisso);
  } catch (error) {
    res.status(500).json({
      erro: "Erro ao criar compromisso",
    });
  }
});

// PUT - atualizar compromisso
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data, ...resto } = req.body;

    const compromisso = await prisma.compromisso.update({
      where: {
        id: Number(id),
      },

      data: {
        ...resto,
        ...(data && {
          data: new Date(data),
        }),
      },
    });

    res.json(compromisso);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      erro: "Erro ao atualizar compromisso",
    });
  }
});

// DELETE - excluir compromisso
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const compromisso = await prisma.compromisso.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!compromisso) {
      return res.status(404).json({
        erro: "Compromisso não encontrado",
      });
    }

    await prisma.compromisso.delete({
      where: {
        id: Number(id),
      },
    });

    res.json({
      mensagem: "Compromisso removido",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      erro: "Erro ao excluir compromisso",
    });
  }
});

export default router;
