import { Request, Response } from 'express'
import { PrismaTodoRepository } from '../../../../repositories/TodoRepositories/prisma/prismaTodoRepository'
import { EditTodoUseCase } from './EditTodoUseCase'

export class EditTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { title, description } = request.body

    const prismaTodoRepository = new PrismaTodoRepository()
    const editTodoUseCase = new EditTodoUseCase(prismaTodoRepository)

    const editedTodo = await editTodoUseCase.execute({
      id,
      title,
      description
    })

    return response.json(editedTodo)
  }
}
