import { Request, Response } from 'express'
import { PrismaCollectionRepository } from '../../../../repositories/CollectionRepositories/prisma/PrismaCollectionRepository'
import { ListTodoOfColletionUseCase } from './ListTodoOfColletionUseCase'

export class ListTodoOfColletionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.params
    const { complete } = request.query

    const prismaCollectionRepository = new PrismaCollectionRepository()
    const listTodoOfColletionUseCase = new ListTodoOfColletionUseCase(
      prismaCollectionRepository
    )

    const todos = await listTodoOfColletionUseCase.execute(
      name,
      String(complete)
    )

    return response.json(todos)
  }
}
