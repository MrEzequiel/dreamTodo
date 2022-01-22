import { Request, Response } from "express";
import { EditColletionUseCase } from "./EditColletionUseCase";



export class EditColletionController {
  async handle(request: Request, response: Response): Promise<Response>{
    const { id } = request.params;
    const { name } = request.body;

    const editColletionUseCase = new EditColletionUseCase();

    const editedColletion = await editColletionUseCase.execute({
      id,
      name
    });

    return response.json(editedColletion);
  }
}