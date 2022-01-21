import { Request, Response } from "express";
import { ListColletionUseCase } from "./ListColletionUseCase";



export class ListColletionController {

  async handle(request: Request, response: Response): Promise<Response>{

    const listColletionUseCase = new ListColletionUseCase();

    const colletion = await listColletionUseCase.execute();

    return response.json(colletion);
  }
}