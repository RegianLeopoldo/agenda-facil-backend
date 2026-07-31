import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayload {
  id: number;
  email: string;
}

export interface AuthRequest extends Request {
  usuarioId?: number;
}

export function autenticar(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        erro: "Token não informado",
      });
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      return res.status(401).json({
        erro: "Token inválido",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;

    req.usuarioId = decoded.id;

    next();
  } catch (error) {
    return res.status(401).json({
      erro: "Token inválido ou expirado",
    });
  }
}
