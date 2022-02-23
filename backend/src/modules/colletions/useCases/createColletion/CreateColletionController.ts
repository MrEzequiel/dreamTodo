import { Request, Response } from "express";
import { CreateColletionUseCase } from "./CreateColletionUseCase";



export class CreateColletionController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { id: userId } = request.user;
    const { name  } = request.body;

    const createColletionUseCase = new CreateColletionUseCase();

    const colletion = await createColletionUseCase.execute(userId, name);

    return response.json(colletion);
  }
}