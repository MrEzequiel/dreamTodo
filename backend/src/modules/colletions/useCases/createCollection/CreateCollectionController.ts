import { Request, Response } from 'express'
import { PrismaCollectionRepository } from '../../../../repositories/CollectionRepositories/prisma/PrismaCollectionRepository'
import { CreateCollectionUseCase } from './CreateCollectionUseCase'

export class CreateCollectionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: userId } = request.user
    const { name, emoji } = request.body

    const prismaCollectionRepository = new PrismaCollectionRepository()
    const createCollectionUseCase = new CreateCollectionUseCase(
      prismaCollectionRepository
    )

    const colletion = await createCollectionUseCase.execute({
      userId,
      name,
      emoji
    })

    return response.json(colletion)
  }
}
