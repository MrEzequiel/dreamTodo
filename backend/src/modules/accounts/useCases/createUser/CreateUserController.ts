import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";



export class CreateUserController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { name, email, password } = request.body;
    const { originalname: imageURL } = request.file;

    console.log(imageURL);

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({
      name,
      email,
      imageURL,
      password
    })

    return response.json(user)
  }
}