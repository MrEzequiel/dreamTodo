import { Request, Response } from "express";
import { EditCollectionUseCase } from "./EditCollectionUseCase";




export class EditCollectionController {
  
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;
    const { name, emoji } = request.body;

    const editCollectionUseCase = new EditCollectionUseCase();

    const editedCollection = await editCollectionUseCase.execute({
      id,
      name,
      emoji
    });

    return response.json(editedCollection);
  }
}