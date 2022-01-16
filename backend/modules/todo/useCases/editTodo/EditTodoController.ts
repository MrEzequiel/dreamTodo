import { json, Request, Response } from "express";
import { EditTodoUseCase } from "./EditTodoUseCase";


export class EditTodoController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { id, name, description, isChecked } = request.body;

    const editTodoUseCase = new EditTodoUseCase();

    const editedTodo = await editTodoUseCase.execute({
      id,
      name,
      description,
      isChecked
    });

    return response.json(editedTodo);
  }
}