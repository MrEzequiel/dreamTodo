import { client } from "../../../../database/client";
import { AppError } from "../../../../infra/errors/AppError";
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'


interface IRequestLogin {
  email: string
  password: string
}

interface UserConfig {
  name: string
  email: string
  password: string
  imageURL: string
}

export class AuthenticateUserUseCase {

  async execute({ email, password }: IRequestLogin){

    const user = await client.user.findFirst({
      where: {
        email
      }
    })

    if(!user) {
      throw new AppError('Usuário ou senha incorretos!')
    }

    const verifyPassword = await compare(password, user.password);
    
    if(!verifyPassword) {
      throw new AppError('Usuário ou senha incorretos!')
    }

    const token = sign({}, process.env.SECRET_KEY, {
      subject: user.id,
      expiresIn: '15m'
    })

    return {
      user,
      token
    }
  }
}