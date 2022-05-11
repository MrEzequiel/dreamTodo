import { Request, Response } from 'express'
import { PrismaUserRepository } from '../../../../repositories/UserRepositories/prisma/PrismaUserRepository'
import { NewPasswordUserUseCase } from './NewPasswordUserUseCase'

export class NewPasswordUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { password, confirmPassword } = request.body
    const { id } = request.user

    const userRepository = new PrismaUserRepository()
    const newPasswordUserUseCase = new NewPasswordUserUseCase(userRepository)

    await newPasswordUserUseCase.execute(password, confirmPassword, String(id))

    return response.json({
      message: `Senha Atualizada com sucesso.`
    })
  }
}
