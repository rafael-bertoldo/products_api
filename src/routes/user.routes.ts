import { Router } from "express";
import { UserController } from "../controllers/user.controllers";
import { ensureAuth } from "../middlewares/ensureAuth";

export const userRouter = Router()

userRouter.post('/', UserController.create)
userRouter.post('/admin', UserController.createAdm)
userRouter.use(ensureAuth)
userRouter.get('/profile', UserController.readProfile)
userRouter.patch('/profile', UserController.updateProfile)
userRouter.delete('/profile', UserController.deleteProfile)