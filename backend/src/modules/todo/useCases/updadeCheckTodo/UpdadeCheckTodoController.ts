import { Request, Response } from "express";
import { UpdadeCheckTodoUseCase } from "./UpdadeCheckTodoUseCase";



export class UpdadeCheckTodoController {

  async handle(request: Request, response: Response){
    
    const { id } = request.params;
    const { complete } = request.body;

    const updadeCheckTodoUseCase = new UpdadeCheckTodoUseCase();

    const todo = await updadeCheckTodoUseCase.execute(id, complete);

    return response.json(todo);
  }
}