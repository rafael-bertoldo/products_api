import { compare } from "bcryptjs"
import { prisma } from ".."
import AppError from "../errors/appError"
import authConfig from '../configs/auth'
import { sign } from "jsonwebtoken"

interface ILoginData {
  email: string
  password: string
}

interface ILoginResponse {
  id: string
  name: string
  isAdm: boolean
  token: string
}

export class AuthService {
  constructor () {}

  static async loginService({email, password}: ILoginData): Promise<ILoginResponse> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if(!user) {
      throw new AppError('Email ou senha incorretos', 401)
    }

    const passMatch = await compare(password, user.password)

    if(!passMatch) {
      throw new AppError('Email ou senha incorretos', 401)
    }

    const {secret, expiresIn} = authConfig.jwt

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn
    })

    return {
      id: user.id,
      name: user.name,
      isAdm: user.isAdm,
      token
    }
  }
}