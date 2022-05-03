import { client } from '../../../../database/client'
import { AppError } from '../../../../infra/errors/AppError'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import dayjs from 'dayjs'

interface IRequestLogin {
  email: string
  password: string
}

export class AuthenticateUserUseCase {
  async execute({ email, password }: IRequestLogin) {
    const user = await client.user.findFirst({
      where: {
        email
      }
    })

    if (!user) {
      throw new AppError('Usuário ou senha incorretos!')
    }

    const verifyPassword = await compare(password, user.password)

    if (!verifyPassword) {
      throw new AppError('Usuário ou senha incorretos!')
    }

    const token = sign({}, String(process.env.SECRET_KEY_TOKEN), {
      subject: user.id,
      expiresIn: '15m'
    })

    const expires_in = dayjs().add(1, 'days').toDate()

    const refresh_token = sign(
      {},
      String(process.env.SECRET_KEY_REFRESH_TOKEN),
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )

    const refresh = await client.refreshToken.create({
      data: {
        userId: user.id,
        refreshToken: refresh_token,
        expires_in,
      }
    })

    return {
      user,
      token,
      refresh
    }
  }
}
