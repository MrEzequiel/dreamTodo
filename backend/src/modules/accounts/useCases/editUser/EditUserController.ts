import { Request, Response } from "express";
import { EditUserUseCase } from "./EditUserUseCase";



export class EditUserController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { id } = request.user

    const { name } = request.body
    const { filename: imageProfile } = request.file;

    const editUserUseCase = new EditUserUseCase();

    const edit = await editUserUseCase.execute({
      id,
      name,
      imageURL:`${process.env.APP_URL}/files/${imageProfile}`,
      imageProfile
    })

    return response.json(edit)
  }
}