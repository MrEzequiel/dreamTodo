import { InMemoryUserRepository } from '../../../../test/repositories/InMemoryUserRepository'
import { CreateUserUseCase } from '../createUser/CreateUserUseCase'
import { NewPasswordUserUseCase } from './NewPasswordUserUseCase'

const inMemoryUserRepository = new InMemoryUserRepository()
const createUser = new CreateUserUseCase(inMemoryUserRepository)
const newPasswordUser = new NewPasswordUserUseCase(inMemoryUserRepository)

describe('New password user edit', () => {
  it('should be able to edit password user', async () => {
    const user = await createUser.execute({
      name: 'TestPass',
      email: 'TestPass@test.com',
      password: 'TestPass',
      imageProfile: 'TestPassImage'
    })

    console.log(inMemoryUserRepository);
    

    const userEditedPassword = await newPasswordUser.execute('TestPass2', 'TestPass2', user.id)

    console.log(inMemoryUserRepository);

    
  })
})
