import { Request, Response } from "express";
import { ListTodoOfColletionUseCase } from "./ListTodoOfColletionUseCase";



export class ListTodoOfColletionController {

  async handle(request: Request, response: Response): Promise<Response>{
    
    const { colletionid } = request.params
    const { complete } = request.query

    const listTodoOfColletionUseCase = new ListTodoOfColletionUseCase()

    const todos = await listTodoOfColletionUseCase.execute(colletionid, String(complete))

    return response.json(todos)
  }
}