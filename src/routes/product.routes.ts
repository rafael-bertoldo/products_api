import { Router } from "express";
import { ProductController } from "../controllers/product.controllers";
import { ensureAuth } from "../middlewares/ensureAuth";

export const productRouter = Router()

productRouter.get('/', ProductController.readAll)
productRouter.get('/:product_id', ProductController.readById)
productRouter.use(ensureAuth)
productRouter.post('/', ProductController.create)
productRouter.patch('/:product_id', ProductController.update)
productRouter.delete('/:product_id', ProductController.deleteById)