import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";
import crypto from 'crypto'


export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    let imageProfile = request?.file?.filename;

    if(!imageProfile){
      imageProfile = `https://robohash.org/${crypto.randomUUID()}`;
    }

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
      imageProfile,
      imageURL : imageProfile.includes('robohash') ? imageProfile : `${process.env.APP_URL}/files/${imageProfile}`
    });

    return response.json(user);
  }
}
