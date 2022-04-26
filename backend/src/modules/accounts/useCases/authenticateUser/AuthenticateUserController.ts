import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";



export class AuthenticateUserController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { email, password } = request.body

    const authenticareUserUseCase = new AuthenticateUserUseCase()

    const token = await authenticareUserUseCase.execute({
      email,
      password
    })

    return response.json({
      token
    });
  }
}