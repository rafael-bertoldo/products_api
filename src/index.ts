import express, { NextFunction, Request, Response } from 'express'
import { PrismaClient } from "@prisma/client";
import cors from 'cors'
import { routes } from './routes';
import AppError from './errors/appError';

export const prisma = new PrismaClient()

export const app = express()

app.use(cors())
app.use(express.json())
app.use('/v1', routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.status).send({ message: err.message })
  }

  console.log(err)

  return res.status(500).send({
    message: err.message,
    obs: 'Internal Server Error'
  })
})