import { Request, Response } from "express";
import { CreateColletionUseCase } from "./CreateColletionUseCase";



export class CreateColletionController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { id: userId } = request.user;
    const { name, emoji } = request.body;

    const createColletionUseCase = new CreateColletionUseCase();

    const colletion = await createColletionUseCase.execute(userId, name, emoji);

    return response.json(colletion);
  }
}