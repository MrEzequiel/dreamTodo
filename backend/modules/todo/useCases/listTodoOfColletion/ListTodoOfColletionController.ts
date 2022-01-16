import { Request, Response } from "express";
import { ListTodoOfColletionUseCase } from "./ListTodoOfColletionUseCase";



export class ListTodoOfColletionController {

  async handle(request: Request, response: Response){
    
    const { colletionid } = request.params

    const listTodoOfColletionUseCase = new ListTodoOfColletionUseCase()

    const todos = await listTodoOfColletionUseCase.execute({
      colletionid
    })

    return response.json(todos)
  }
}