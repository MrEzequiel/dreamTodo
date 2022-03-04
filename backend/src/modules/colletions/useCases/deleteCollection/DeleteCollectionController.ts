import { Request, Response } from "express";
import { DeleteCollectionUseCase } from "./DeleteCollectionUseCase";




export class DeleteCollectionController {
  
  async handle(request: Request, response: Response): Promise<Response>{
  
    const { id } = request.params;

    const deleteCollectionUseCase = new DeleteCollectionUseCase();

    await deleteCollectionUseCase.execute(id);

    return response.status(204).json({
      message: 'Colletion deletada com sucesso'
    });
  }
}