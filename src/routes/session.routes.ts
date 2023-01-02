import { Router } from "express";
import { SessionController } from "../controllers/session.controllers";

export const sessionRouter = Router()

sessionRouter.post('/login', SessionController.login)