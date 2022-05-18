import { User } from '@prisma/client'
import { hash } from 'bcryptjs'
import { AppError } from '../../../../infra/errors/AppError'
import { UserRepository } from '../../../../repositories/UserRepositories/userRepositories'
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO'

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    id,
    name,
    email,
    password,
    imageURL,
    imageProfile
  }: ICreateUserDTO): Promise<User> {
    const verifyIfUserExist = await this.userRepository.findUserByEmail(email)

    if(verifyIfUserExist){
      throw new AppError("Esse usuário já existe")
    }
    
    const passwordHash = await hash(password, 8)

    const user = await this.userRepository.create({
      id,
      name,
      email,
      password: passwordHash,
      imageProfile,
      imageURL
    })

    return user
  }
}
