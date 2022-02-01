import { hash } from "bcryptjs";
import { client } from "../../../../database/client";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";



export class CreateUserUseCase {

  async execute({name, email, imageURL, password, }: ICreateUserDTO){

    const passwordHash = await hash(password, 8)
    
    const user = await client.user.create({
      data: {
        name,
        email,
        imageURL,
        password: passwordHash
      }
    })

    return user
  }
}