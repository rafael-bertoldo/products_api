import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.services";

interface ICreateUserData {
  email: string
  name: string
  password: string
  isAdm?: boolean
}

interface IUpdateUserData {
  email?: string
  name?: string
}

export class UserController {
  constructor() { }

  static async create(req: Request, res: Response, next: NextFunction) {
    const data: ICreateUserData = req.body

    const { isAdm, ...rest } = data

    try {
      const newUser = await UserService.create(rest)

      return res.send(newUser)
    } catch (error) {
      next(error)
    }
  }

  static async createAdm(req: Request, res: Response, next: NextFunction) {
    const data: ICreateUserData = req.body

    try {
      const newUser = await UserService.create(data)

      return res.send(newUser)
    } catch (error) {
      next(error)
    }
  }

  static async readProfile(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user

    try {
      const user = await UserService.readProfile(id)

      return res.send(user)
    } catch (error) {
      next(error)
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    const data: IUpdateUserData = req.body
    const { id } = req.user

    try {
      const user = await UserService.updateProfile(data, id)

      return res.send(user)
    } catch (error) {
      next(error)
    }
  }

  static async deleteProfile(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user

    try {
      await UserService.deleteProfile(id)

      return res.status(200).send({ message: 'Perfil excluído com sucesso' })
    } catch (error) {
      next(error)
    }
  }
}