import { Router } from "express";
import { OAuth2Client } from "google-auth-library";
import prisma from "../lib/prisma";
import jwt from "jsonwebtoken";

const router = Router();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post("/google", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({
        erro: "Token não informado",
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload) {
      return res.status(401).json({
        erro: "Token inválido",
      });
    }

    const { sub, email, name, picture } = payload;

    let usuario = await prisma.usuario.findUnique({
      where: {
        googleId: sub,
      },
    });

    if (!usuario) {
      usuario = await prisma.usuario.create({
        data: {
          googleId: sub!,
          nome: name ?? "",
          email: email!,
          foto: picture ?? "",
        },
      });
    }

    const jwtToken = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    res.json({
      usuario,
      token: jwtToken,
    });
  } catch (error) {
    console.error(error);

    res.status(401).json({
      erro: "Falha na autenticação",
    });
  }
});

export default router;
