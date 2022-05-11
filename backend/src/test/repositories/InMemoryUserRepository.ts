import { RefreshToken, User } from '@prisma/client'
import { ICreateUserDTO } from '../../modules/accounts/dtos/ICreateUserDTO'
import { IRequestEdit } from '../../modules/accounts/useCases/editUser/EditUserUseCase'
import { UserRepository } from '../../repositories/UserRepositories/userRepositories'
import { v4 } from 'uuid'
import { RefreshTokenDTO } from '../../modules/accounts/useCases/authenticateUser/AuthenticateUserUseCase'

export class InMemoryUserRepository implements UserRepository {
  users: User[] = []
  refresh: RefreshToken[] = []
  
  async create(user: ICreateUserDTO) {
    Object.assign(user, {
      id: user.id ?? v4()
    })
    
    this.users.push(user as User)
    return user as User
  }
  
  async createRefreshToken(refresh: RefreshTokenDTO){
    Object.assign(refresh, {
      id: refresh.userId
    })
    
    this.refresh.push(refresh as RefreshToken)
    return refresh as RefreshToken
  }

  async findUserById(id: string) {
    const user = this.users.find(user => user.id === id)
    return user ?? null
  }

  async findUserByEmail(email: string) {
    const user = this.users.find(user => user.email === email)
    return user ?? null
  }

  async editUser(user: IRequestEdit) {
    Object.assign(user, {})

    this.users.push(user as User)
    return user as User
  }

  editUserPassword: (id: string, passowrd: string) => Promise<void>
}
