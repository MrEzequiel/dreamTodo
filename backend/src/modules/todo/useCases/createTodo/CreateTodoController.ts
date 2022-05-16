import { Request, Response } from 'express'
import { PrismaTodoRepository } from '../../../../repositories/TodoRepositories/prisma/prismaTodoRepository'
import { CreateTodoUseCase } from './CreateTodoUseCase'

export class CreateTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id_collection } = request.params
    const { title, description, complete } = request.body

    const prismaTodoRepository = new PrismaTodoRepository()
    const createTodoUseCase = new CreateTodoUseCase(prismaTodoRepository)

    const todo = await createTodoUseCase.execute({
      title,
      description,
      complete,
      id_collection
    })

    return response.status(201).json(todo)
  }
}
