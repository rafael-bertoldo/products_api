import { Router } from "express";
import { productRouter } from "./product.routes";
import { sessionRouter } from "./session.routes";
import { userRouter } from "./user.routes";

export const routes = Router()

routes.use('/session', sessionRouter)
routes.use('/users', userRouter)
routes.use('/products', productRouter)