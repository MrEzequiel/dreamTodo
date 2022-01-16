import { Request, Response } from "express";
import { ListColletionUseCase } from "./ListColletionUseCase";



export class ListColletionController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { id } = request.params;

    const listColletionUseCase = new ListColletionUseCase();

    const colletion = await listColletionUseCase.execute(id);

    return response.json(colletion);
  }
}