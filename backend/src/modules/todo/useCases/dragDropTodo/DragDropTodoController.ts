import { Request, Response } from "express";
import { DragDropTodoUseCase } from "./DragDropTodoUseCase";



export class DragDropTodoController {

  async handle(request: Request, response: Response): Promise<Response>{

    // const {  } = request.body;

    const dragDropTodoUseCase = new DragDropTodoUseCase();

    await dragDropTodoUseCase.execute();

    return response.json();
  }
}