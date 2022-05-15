import { Request, Response } from 'express'
import { PrismaCollectionRepository } from '../../../../repositories/CollectionRepositories/prisma/PrismaCollectionRepository'
import { DeleteCollectionUseCase } from './DeleteCollectionUseCase'

export class DeleteCollectionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const prismaCollectionRepository = new PrismaCollectionRepository()
    const deleteCollectionUseCase = new DeleteCollectionUseCase(
      prismaCollectionRepository
    )

    await deleteCollectionUseCase.execute(id)

    return response.status(204).json({
      message: 'Colletion deletada com sucesso'
    })
  }
}
