import { Request, Response } from "express";
import { ListColletionByDateUseCase } from "./ListColletionByDateUseCase";


export class ListColletionByDateController {

  async handle(request: Request, response: Response): Promise<Response>{

    const listColletionByDateUseCase = new ListColletionByDateUseCase();

    const todo = await listColletionByDateUseCase.execute();

    return response.json(todo)
  }
}