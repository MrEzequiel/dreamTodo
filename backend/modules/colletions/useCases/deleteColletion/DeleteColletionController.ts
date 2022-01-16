import { Request, Response } from "express";
import { DeleteColletionUseCase } from "./DeleteColletionUseCase";




export class DeleteColletionController {
  async handle(request: Request, response: Response){
    const { id } = request.params;

    const deleteColletionUseCase = new DeleteColletionUseCase();

    deleteColletionUseCase.execute({
      id
    })

    return response.status(204).json({
      message: 'Colletion deletada com sucesso'
    });
  }
}