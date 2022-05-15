import { Request, Response } from 'express'
import { PrismaCollectionRepository } from '../../../../repositories/CollectionRepositories/prisma/PrismaCollectionRepository'
import { EditCollectionUseCase } from './EditCollectionUseCase'

export class EditCollectionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { name, emoji } = request.body

    const prismaCollectionRepository = new PrismaCollectionRepository()
    const editCollectionUseCase = new EditCollectionUseCase(
      prismaCollectionRepository
    )

    const editedCollection = await editCollectionUseCase.execute({
      id,
      name,
      emoji
    })

    return response.json(editedCollection)
  }
}
