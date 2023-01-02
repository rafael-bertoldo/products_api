import { NextFunction, Request, Response } from "express";
import AppError from "../errors/appError";
import authConfig from '../configs/auth'
import { verify } from "jsonwebtoken";

export interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export const ensureAuth = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    throw new AppError('Por favor informe o token de autorização')
  }

  try {
    const [, token] = authHeader.split(' ')
    const { secret } = authConfig.jwt

    const decoded = verify(token, secret)
    const { sub } = decoded as ITokenPayload

    req.user = {
      id: sub
    }

    return next()
  } catch (err) {
    throw new AppError('Token expirado ou enviado de forma errada')
  }
}