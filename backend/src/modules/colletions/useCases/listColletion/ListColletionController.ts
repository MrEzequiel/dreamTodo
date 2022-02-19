import { Request, Response } from "express";
import { ListColletionUseCase } from "./ListColletionUseCase";



export class ListColletionController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { id: user_id } = request.user

    const listColletionUseCase = new ListColletionUseCase();

    const colletion = await listColletionUseCase.execute(user_id);

    return response.json(colletion);
  }
}