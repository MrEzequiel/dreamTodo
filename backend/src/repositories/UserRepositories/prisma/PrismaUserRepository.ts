import { RefreshToken, User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { client } from '../../../database/client'
import { ICreateUserDTO } from '../../../modules/accounts/dtos/ICreateUserDTO'
import { RefreshTokenDTO } from '../../../modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase'
import { IRequestEdit } from '../../../modules/accounts/useCases/editUser/EditUserUseCase'
import { UserRepository } from '../userRepositories'

export class PrismaUserRepository implements UserRepository {
  async create({
    name,
    email,
    password,
    imageProfile,
    imageURL
  }: ICreateUserDTO) {
    const user = await client.user.create({
      data: {
        name,
        email,
        password,
        imageProfile
      }
    })

    return user
  }

  async createRefreshToken({
    userId,
    refreshToken,
    expires_in
  }: RefreshTokenDTO) {
    const refresh = await client.refreshToken.create({
      data: {
        userId,
        refreshToken: refreshToken,
        expires_in
      }
    })
    
    return refresh
  }

  async findUserByEmail(email: string) {
    const verifyIfUserExist = await client.user.findFirst({
      where: {
        email
      }
    })

    return verifyIfUserExist
  }

  async findUserById(id: string) {
    const user = await client.user.findFirst({
      where: {
        id
      }
    })

    return user
  }

  async editUser({ id, name, imageURL, imageProfile }: IRequestEdit) {
    const editedUser = await client.user.update({
      where: {
        id
      },
      data: {
        name,
        imageURL,
        imageProfile
      }
    })

    return editedUser
  }

  async editUserPassword(id: string, password: string) {
    const passwordHash = await hash(password, 8)

    await client.user.update({
      where: {
        id
      },
      data: {
        password: passwordHash
      }
    })
  }
}
