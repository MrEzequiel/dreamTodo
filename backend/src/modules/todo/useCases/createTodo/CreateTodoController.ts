import { Request, Response } from "express";
import { CreateTodoUseCase } from "./CreateTodoUseCase";



export class CreateTodoController {

  async handle(request: Request, response: Response): Promise<Response> {
    
    const { title, description, complete, id_collection } = request.body

    const createTodoUseCase = new CreateTodoUseCase()

    const todo = await createTodoUseCase.execute({
      title,
      description,
      complete,
      id_collection
    })

    return response.status(201).json(todo);
  }
}