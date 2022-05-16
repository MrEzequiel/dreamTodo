import { Request, Response } from 'express'
import { PrismaTodoRepository } from '../../../../repositories/TodoRepositories/prisma/prismaTodoRepository'
import { DeleteTodoUseCase } from './DeleteTodoUseCase'

export class DeleteTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params

    const prismaTodoRepository = new PrismaTodoRepository()
    const deleteTodoUseCase = new DeleteTodoUseCase(prismaTodoRepository)

    await deleteTodoUseCase.execute(id)

    return response.json({
      message: 'Todo deletada com sucessoo'
    })
  }
}
