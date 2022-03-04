import { Request, Response } from "express";
import { EditTodoUseCase } from "./EditTodoUseCase";


export class EditTodoController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { id } = request.params;
    const { title, description } = request.body;

    const editTodoUseCase = new EditTodoUseCase();

    const editedTodo = await editTodoUseCase.execute({
      id,
      title,
      description
    });

    return response.json(editedTodo);
  }
}