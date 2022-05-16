import { sign, verify } from 'jsonwebtoken'
import { client } from '../../../../database/client'
import { AppError } from '../../../../infra/errors/AppError'
import 'dayjs'
import dayjs from 'dayjs'
import { UserRepository } from '../../../../repositories/UserRepositories/userRepositories'

type TokenType = {
  sub: string
}

export class RefreshTokenUseCase {
  constructor(
    private userRespository: UserRepository
  ){}
  async execute(token: string) {
    const { sub } = verify(
      token,
      String(process.env.SECRET_KEY_REFRESH_TOKEN)
    ) as TokenType

    const userId = sub

    const user = await this.userRespository.findUserById(userId)

    const userToken = await client.refreshToken.findFirst({
      where: {
        userId: sub
      }
    })

    if (!userToken) {
      throw new AppError('Refresh token não encontrado')
    }

    const refreshToken = sign(
      {},
      String(process.env.SECRET_KEY_REFRESH_TOKEN),
      {
        subject: userId,
        expiresIn: '30d'
      }
    )

    const expires_in = dayjs().add(1, 'days').toDate()

    const refresh = await client.refreshToken.create({
      data: {
        userId,
        refreshToken,
        expires_in
      }
    })

    const newToken = sign({}, String(process.env.SECRET_KEY_TOKEN), {
      subject: userId,
      expiresIn: '15m'
    })

    return {
      refresh,
      token: newToken,
      user
    }
  }
}
