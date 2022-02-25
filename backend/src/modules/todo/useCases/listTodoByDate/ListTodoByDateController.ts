import { Request, Response } from "express";
import { ListTodoByDateUseCase } from "./ListTodoByDateUseCase";



export class ListTodoByDateController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { id_todo } = request.params;

    const listTodoByDateUseCase = new ListTodoByDateUseCase();

    const todo = await listTodoByDateUseCase.execute(id_todo);

    return response.json(todo)
  }
}