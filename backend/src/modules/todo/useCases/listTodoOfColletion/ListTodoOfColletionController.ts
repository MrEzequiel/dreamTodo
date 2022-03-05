import { Request, Response } from "express";
import { ListTodoOfColletionUseCase } from "./ListTodoOfColletionUseCase";



export class ListTodoOfColletionController {

  async handle(request: Request, response: Response): Promise<Response>{
    
    const { collectionid } = request.params
    const { complete } = request.query

    const listTodoOfColletionUseCase = new ListTodoOfColletionUseCase()

    const todos = await listTodoOfColletionUseCase.execute(collectionid, String(complete))

    return response.json(todos)
  }
}