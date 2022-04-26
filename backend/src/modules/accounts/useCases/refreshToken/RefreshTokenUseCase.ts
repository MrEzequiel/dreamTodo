import { sign, verify } from 'jsonwebtoken'
import { client } from '../../../../database/client'
import { AppError } from '../../../../infra/errors/AppError'
import 'dayjs'
import dayjs from 'dayjs'

type TokenType = {
  sub: string
}

export class RefreshTokenUseCase {
  async execute(token: string) {
    const { sub } = verify(token, String(process.env.SECRET_KEY_TOKEN)) as TokenType
    console.log(sub)

    const userId = sub

    const userToken = await client.refreshToken.findFirst({
      where: {
        userId: sub
      }
    })

    if (!userToken) {
      throw new AppError('Refresh token não encontrado')
    }

    await client.refreshToken.deleteMany({
      where: {
        userId: sub
      },
    })

    const refreshToken = sign(
      {},
      String(process.env.SECRET_KEY_REFRESH_TOKEN),
      {
        subject: userId,
        expiresIn: '1d'
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
      expiresIn: '1d'
    })

    return {
      refresh,
      token: newToken
    }
  }
}
