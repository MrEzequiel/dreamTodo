import { Request, Response } from 'express'
import { ListCollectionDateUseCase } from './ListCollectionDateUseCase'

export class ListCollectionDateController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { modo } = request.query

    const listCollectionUseCase = new ListCollectionDateUseCase()

    const todo = await listCollectionUseCase.execute(String(modo))

    return response.json(todo)
  }
}
