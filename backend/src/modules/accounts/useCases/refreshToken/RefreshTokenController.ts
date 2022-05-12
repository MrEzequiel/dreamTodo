import { Request, Response } from 'express'
import { PrismaUserRepository } from '../../../../repositories/UserRepositories/prisma/PrismaUserRepository'
import { RefreshTokenUseCase } from './RefreshTokenUseCase'

export class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const { token } = request.body

    const prismaUserRepository = new PrismaUserRepository()
    const refreshTokenUseCase = new RefreshTokenUseCase(prismaUserRepository)

    const refresh = await refreshTokenUseCase.execute(token)

    return response.json(refresh)
  }
}
