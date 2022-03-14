import { Request, Response } from "express";
import { CreateCollectionUseCase } from "./CreateCollectionUseCase";

export class CreateCollectionController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { id: userId } = request.user;
    const { name, emoji } = request.body;

    const createCollectionUseCase = new CreateCollectionUseCase();

    const colletion = await createCollectionUseCase.execute(userId as string, name, emoji);

    return response.json(colletion);
  }
}