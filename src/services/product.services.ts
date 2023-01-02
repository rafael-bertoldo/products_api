import { prisma } from ".."
import AppError from "../errors/appError"

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

interface IResponseProduct extends ICreateProduct {
  id: string
  user: {
    id: string,
    name: string,
    email: string
  }
}

export class ProductService {
  constructor() { }

  static async create({ category, description, image, name, price }: ICreateProduct, id: string): Promise<IResponseProduct> { 
    const checkUser = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if(!checkUser) {
      throw new AppError('Usuário não encontrado, por favor faça login como administrador e tente novamente', 404)
    }

    if(!checkUser.isAdm) {
      throw new AppError('Apenas usuários administradores podem cadastrar novos produtos', 401)
    }

    const checkProduct = await prisma.product.findUnique({
      where: {
        name
      }
    })

    if(checkProduct) {
      throw new AppError('Produto já cadastrado, por favor verifique os dados informados ou tente atualizar as informações deste produto')
    }

    const newProduct = await prisma.product.create({
      data: {
        category,
        description,
        image,
        name,
        price,
        user_id: id
      },
      include: {
        user: true
      }
    })

    const {user_id, user, ...product} = newProduct
    const {password, isAdm, ...restUser} = user

    const response = {
      ...product,
      user: {
        ...restUser
      }
    }

    return response
  }

  static async readAll() {
    const products = await prisma.product.findMany()

    return products
  }

  static async readById(id: string) {
    const product = await prisma.product.findUnique({
      where: {
        id
      }
    })

    if(!product) {
      throw new AppError('Produto não encontrado', 404)
    }

    return product
  }

  static async update({ description, image, name, price }: IUpdateProduct, id: string, product_id: string): Promise<IResponseProduct> { 
    const checkUser = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if(!checkUser) {
      throw new AppError('Usuário não encontrado, por favor faça login como administrador e tente novamente', 404)
    }

    if(!checkUser.isAdm) {
      throw new AppError('Apenas usuários administradores podem atualizar produtos', 401)
    }

    if(name) {
      const checkProduct = await prisma.product.findUnique({
        where: {
          name
        }
      })
  
      if(checkProduct) {
        throw new AppError('Nome de produto já cadastrado')
      }
    }


    const newProduct = await prisma.product.update({
      where: {
        id: product_id
      },
      data: {
        description,
        image,
        name,
        price,
        user_id: id
      },
      include: {
        user: true
      }
    })

    const {user_id, user, ...product} = newProduct
    const {password, isAdm, ...restUser} = user

    const response = {
      ...product,
      user: {
        ...restUser
      }
    }

    return response
  }

  static async deleteById(user_id: string, product_id: string) {
    const checkUser = await prisma.user.findUnique({
      where: {
        id: user_id
      }
    })

    if(!checkUser) {
      throw new AppError('Usuário não encontrado, por favor faça login como administrador e tente novamente', 404)
    }

    if(!checkUser.isAdm) {
      throw new AppError('Apenas usuários administradores podem deletar produtos', 401)
    }

    const checkProduct = await prisma.product.findUnique({
      where: {
        id: product_id
      }
    })

    if(!checkProduct) {
      throw new AppError('Produto não encontrado', 404)
    }

    return await prisma.product.delete({
      where: {
        id: product_id
      }
    })
  }

}