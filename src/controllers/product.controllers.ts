import { NextFunction, Request, Response } from "express";
import { ProductService } from "../services/product.services";

interface ICreateProduct {
  name: string
  category: string
  price: number
  description: string
  image: string
}

interface IUpdateProduct {
  name?: string
  price?: number
  description?: string
  image?: string
}

export class ProductController {
  constructor() { }

  static async create(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user
    const data: ICreateProduct = req.body

    try {
      const product = await ProductService.create(data, id)

      return res.send(product)
    } catch (error) {
      next(error)
    }
  }

  static async readAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.readAll()

      return res.send(products)
    } catch (error) {
      next(error)
    }
  }

  static async readById(req: Request, res: Response, next: NextFunction) {
    const { product_id } = req.params
    try {
      const product = await ProductService.readById(product_id)

      return res.send(product)
    } catch (error) {
      next(error)
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user
    const { product_id } = req.params
    const data: IUpdateProduct = req.body

    try {
      const product = await ProductService.update(data, id, product_id)

      return res.send(product)
    } catch (error) {
      next(error)
    }
  }

  static async deleteById(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user
    const { product_id } = req.params

    try {
      await ProductService.deleteById(id, product_id)

      return res.status(200).send({ message: 'Produto deletado com sucesso' })
    } catch (error) {
      next(error)
    }

  }
}