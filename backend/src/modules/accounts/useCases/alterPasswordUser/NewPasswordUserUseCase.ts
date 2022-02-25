import { hash } from "bcryptjs";
import { client } from "../../../../database/client";
import { AppError } from "../../../../infra/errors/AppError";



export class NewPasswordUserUseCase {

  async execute(password: string, confirmPassword: string, id_user: string){

    if(password != confirmPassword) {
      throw new AppError('Senhas fornecidas não conhecidem');
    }

    const user = await client.user.findFirst({
      where: {
        id: id_user
      }
    })
    
    const passwordHash = await hash(password, 8)

    await client.user.update({
      where: {
        id: user.id
      },
      data: {
        password: passwordHash
      }
    })
    
  }
}