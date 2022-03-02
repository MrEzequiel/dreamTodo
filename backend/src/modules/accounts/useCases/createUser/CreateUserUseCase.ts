import { User } from "@prisma/client";
import { client } from "../../../../database/client";
import { AppError } from "../../../../infra/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { hash } from "bcryptjs";



export class CreateUserUseCase {

  async execute({name, email, imageURL, password, imageProfile }: ICreateUserDTO): Promise<User>{

    const passwordHash = await hash(password, 8)

    const verifyIfUserExist = await client.user.findFirst({
      where: {
        email
      }
    })

    if(verifyIfUserExist) {
      throw new AppError('Esse usuário já existe')
    }
    
    const user = await client.user.create({
      data: {
        name,
        email,
        imageURL,
        password: passwordHash,
        imageProfile
      }
    })

    return user
  }
}