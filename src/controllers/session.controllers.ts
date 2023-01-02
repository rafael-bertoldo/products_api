import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/session.services";

interface ILoginData {
  email: string,
  password: string
}

export class SessionController {
  constructor () {}

  static async login(req: Request, res: Response, next: NextFunction) {
    const data: ILoginData = req.body

    try {
      const authUser = await AuthService.loginService(data)

      return res.send(authUser)
    } catch (error) {
      next(error)
    }
  }
}