import { Request, Response } from 'express'
import { PrismaUserRepository } from '../../../../repositories/UserRepositories/prisma/PrismaUserRepository'
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase'

export class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body

    const userRepository = new PrismaUserRepository()
    const authenticareUserUseCase = new AuthenticateUserUseCase(userRepository)

    const token = await authenticareUserUseCase.execute({
      email,
      password
    })

    return response.json({
      token
    })
  }
}
