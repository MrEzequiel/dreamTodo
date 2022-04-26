import { Request, Response } from 'express'
import { RefreshTokenUseCase } from './RefreshTokenUseCase'

export class RefreshTokenController {
  async handle(request: Request, response: Response) {
    const { token } = request.body

    const refreshTokenUseCase = new RefreshTokenUseCase()

    const refresh = await refreshTokenUseCase.execute(token)

    return response.json(refresh)
  }
}
