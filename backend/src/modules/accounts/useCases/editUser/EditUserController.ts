import { Request, Response } from "express";
import { EditUserUseCase } from "./EditUserUseCase";



export class EditUserController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { id } = request.user

    const { name } = request.body
    const { originalname: imageURL } = request.file;

    const editUserUseCase = new EditUserUseCase();

    const edit = await editUserUseCase.execute({
      id,
      name,
      imageURL
    })

    return response.json(edit)
  }
}