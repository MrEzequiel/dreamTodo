import { Request, Response } from "express";
import { CreateTodoUseCase } from "./CreateTodoUseCase";





export class CreateTodoController {

  async handle(request: Request, response: Response){
    const { name, description, isChecked } = request.body;

    const createTodouseCase = new CreateTodoUseCase();

    const todo = await createTodouseCase.execute({
      name,
      isChecked,
      description,
    });

    return response.status(201).json(todo);
  }
}