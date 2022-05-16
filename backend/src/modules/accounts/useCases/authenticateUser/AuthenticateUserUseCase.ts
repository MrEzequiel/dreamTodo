import { client } from '../../../../database/client'
import { AppError } from '../../../../infra/errors/AppError'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import dayjs from 'dayjs'
import { UserRepository } from '../../../../repositories/UserRepositories/userRepositories'

interface IRequestLogin {
  email: string
  password: string
}

export interface RefreshTokenDTO {
  userId: string
  refreshToken: string
  expires_in: Date
}

export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ email, password }: IRequestLogin) {
    const user = await this.userRepository.findUserByEmail(email)

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

    await client.refreshToken.deleteMany({
      where: {
        userId: user.id
      }
    })

    const refresh_token = sign(
      {},
      String(process.env.SECRET_KEY_REFRESH_TOKEN),
      {
        subject: user.id,
        expiresIn: '30d'
      }
    )

    const refresh = await this.userRepository.createRefreshToken({
      userId: user.id,
      refreshToken: refresh_token,
      expires_in
    })

    return {
      user,
      token,
      refresh
    }
  }
}
