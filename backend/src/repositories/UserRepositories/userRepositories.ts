import { RefreshToken, User } from '@prisma/client'
import { ICreateUserDTO } from '../../modules/accounts/dtos/ICreateUserDTO'
import { RefreshTokenDTO } from '../../modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase'
import { IRequestEdit } from '../../modules/accounts/useCases/editUser/EditUserUseCase'

export interface UserRepository {
  create: ({
    id,
    name,
    email,
    password,
    imageProfile,
    imageURL
  }: ICreateUserDTO) => Promise<User>

  createRefreshToken: ({
    userId,
    refreshToken,
    expires_in
  }: RefreshTokenDTO) => Promise<RefreshToken>

  findUserByEmail: (email: string) => Promise<User | null>

  findUserById: (id: string) => Promise<User | null>

  editUser: ({
    id,
    name,
    imageURL,
    imageProfile
  }: IRequestEdit) => Promise<void>

  editUserPassword: (id: string, passowrd: string) => Promise<void>
}
