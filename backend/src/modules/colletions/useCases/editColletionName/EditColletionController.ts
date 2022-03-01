import { Request, Response } from "express";
import { EditColletionUseCase } from "./EditColletionUseCase";



export class EditColletionController {
  
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;
    const { name, emoji } = request.body;

    const editColletionUseCase = new EditColletionUseCase();

    const editedColletion = await editColletionUseCase.execute({
      id,
      name,
      emoji
    });

    return response.json(editedColletion);
  }
}