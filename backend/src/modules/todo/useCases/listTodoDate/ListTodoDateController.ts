import { Request, Response } from "express";
import { ListTodoDateUseCase } from "./ListTodoDateUseCase";





export class ListTodoDateController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { id_collection } = request.params;
    const { modo } = request.query;

    const listTodoDateUseCase = new ListTodoDateUseCase();

    const todo = await listTodoDateUseCase.execute(id_collection, String(modo));

    return response.json(todo)
  }
}