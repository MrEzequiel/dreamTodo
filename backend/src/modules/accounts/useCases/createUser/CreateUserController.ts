import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";



export class CreateUserController {

  async handle(request: Request, response: Response): Promise<Response>{

    const { 
      name,
      email,
      imageURL,
      password 
    } = request.body;

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