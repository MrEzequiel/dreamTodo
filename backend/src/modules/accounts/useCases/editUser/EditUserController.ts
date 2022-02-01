import { Request, Response } from "express";
import { EditUserUseCase } from "./EditUserUseCase";



export class EditUserController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { id } = request.user

    const { 
      name,
      imageURL 
    } = request.body

    const editUserUseCase = new EditUserUseCase();

    const edit = editUserUseCase.execute({
      id,
      name,
      imageURL
    })

    return response.json(edit)
  }
}