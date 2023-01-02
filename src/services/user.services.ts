import { hash } from "bcryptjs"
import { prisma } from ".."
import AppError from "../errors/appError"

interface ICreateUserData {
  name: string
  email: string
  password: string
  isAdm?: boolean
}

interface IResponseUserData {
  id: string
  name: string
  email: string
  isAdm: boolean
}

interface IUpdateUserData {
  name?: string
  email?: string
}

export class UserService {
  constructor() { }

  static async create({ email, name, password, isAdm }: ICreateUserData): Promise<IResponseUserData> {
    const checkEmail = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (checkEmail) {
      throw new AppError('Email já cadastrado, por favor informe um novo email ou faça o login')
    }

    const hashedPass = await hash(password, 8)

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPass,
        isAdm
      }
    })

    const { password: userPass, ...rest } = newUser

    return rest
  }

  static async readProfile(id: string): Promise<IResponseUserData> {
    const checkUser = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!checkUser) {
      throw new AppError('Usuário não encontrado, por favor faça login e tente novamente', 404)
    }

    const { password, ...rest } = checkUser

    return rest
  }

  static async updateProfile({ email, name }: IUpdateUserData, id: string): Promise<IResponseUserData> {
    const checkUser = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!checkUser) {
      throw new AppError('Usuário não encontrado, por favor faça login e tente novamente', 404)
    }

    if (email) {
      const checkEmail = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (checkEmail) {
        throw new AppError('Email já cadastrado, por favor informe um novo email ou faça login')
      }
    }

    const updateUser = await prisma.user.update({
      where: {
        id
      },
      data: {
        name,
        email
      }
    })

    const { password, ...rest } = updateUser

    return rest
  }

  static async deleteProfile(id: string): Promise<IResponseUserData> {
    const checkUser = await prisma.user.findUnique({
      where: {
        id
      }
    })

    if (!checkUser) {
      throw new AppError('Usuário não encontrado, por favor faça login e tente novamente', 404)
    }

    return await prisma.user.delete({
      where: {
        id
      }
    })
  }
}