import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const { filename : imageProfile } = request.file;

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      imageURL : `${process.env.APP_URL}/files/${imageProfile}`,
      imageProfile
    });

    return response.json(user);
  }
}
