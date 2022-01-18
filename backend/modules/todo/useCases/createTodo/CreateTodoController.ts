import { Request, Response } from "express";
import { CreateTodoUseCase } from "./CreateTodoUseCase";



export class CreateTodoController {

  async handle(request: Request, response: Response): Promise<Response> {
    
    const { name, description, complete, colletion } = request.body

    const createTodoUseCase = new CreateTodoUseCase()

    const todo = await createTodoUseCase.execute({
      name,
      description,
      complete,
      colletion
    })

    return response.status(201).json(todo);
  }
}