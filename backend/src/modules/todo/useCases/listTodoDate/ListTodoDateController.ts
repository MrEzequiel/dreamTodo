import { Request, Response } from 'express'
import { PrismaCollectionRepository } from '../../../../repositories/CollectionRepositories/prisma/PrismaCollectionRepository'
import { PrismaTodoRepository } from '../../../../repositories/TodoRepositories/prisma/prismaTodoRepository'
import { ListTodoDateUseCase } from './ListTodoDateUseCase'

export class ListTodoDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_collection } = request.params
    const { modo } = request.query

    const prismaCollectionRepository = new PrismaCollectionRepository()
    const prismaTodoRepository = new PrismaTodoRepository()
    const listTodoDateUseCase = new ListTodoDateUseCase(
      prismaCollectionRepository,
      prismaTodoRepository
    )

    const todo = await listTodoDateUseCase.execute(id_collection, String(modo))

    return response.json(todo)
  }
}
