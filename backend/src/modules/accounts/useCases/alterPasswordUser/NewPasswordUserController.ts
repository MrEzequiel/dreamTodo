import { Request, Response } from "express";
import { NewPasswordUserUseCase } from "./NewPasswordUserUseCase";

export class NewPasswordUserController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { password, confirmPassword } = request.body
    const { sub } = request.user;

    const newPasswordUserUseCase = new NewPasswordUserUseCase();

    await newPasswordUserUseCase.execute(password, confirmPassword, sub);

    return response.json({
      message: `Senha Atualizada com sucesso.`
    })
  }  
}