import { Request, Response } from "express";
import { ListCollectionUseCase } from "./ListCollectionUseCase";


export class ListCollectionController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { id: user_id } = request.user

    const listCollectionUseCase = new ListCollectionUseCase();

    const collection = await listCollectionUseCase.execute(user_id as string);

    return response.json(collection);
  }
}