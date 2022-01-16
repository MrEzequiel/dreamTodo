import { Request, Response } from "express";
import { CreateTodoUseCase } from "./CreateTodoUseCase";



export class CreateTodoController {

  async handle(request: Request, response: Response): Promise<Response> {
    
    const { name, description, isChecked, colletion } = request.body

    const createTodoUseCase = new CreateTodoUseCase()

    const todo = await createTodoUseCase.execute({
      name,
      description,
      isChecked,
      colletion
    })

    return response.status(201).json(todo);
  }
}