import { Request, Response } from "express";
import { DeleteTodoUseCase } from "./DeleteTodoUseCase";





export class DeleteTodoController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;

    const deleteTodoUseCase = new DeleteTodoUseCase();

    await deleteTodoUseCase.execute(id);

    return response.json({
      message: 'Todo deletada com sucessoo'
    })
  }
}