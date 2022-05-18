import { Request, Response } from 'express'
import { PrismaTodoRepository } from '../../../../repositories/TodoRepositories/prisma/prismaTodoRepository'
import { UpdadeCheckTodoUseCase } from './UpdadeCheckTodoUseCase'

export class UpdadeCheckTodoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params
    const { complete } = request.body

    const prismaTodoRepository = new PrismaTodoRepository()
    const updadeCheckTodoUseCase = new UpdadeCheckTodoUseCase(
      prismaTodoRepository
    )

    await updadeCheckTodoUseCase.execute(id, complete)

    return response.json({
      message: 'Todo editada com sucesso'
    })
  }
}
