import { Todo } from '@prisma/client';
import { client } from '../../../../database/client'
import { AppError } from '../../../../infra/errors/AppError';
import { ICreateTodoDTO } from '../../dtos/ICreateTodoDTO';


export class CreateTodoUseCase {

  async execute({ name, complete, description, id_colletion } : ICreateTodoDTO): Promise<Todo> {

    const verifyTodoExist = await client.todo.findFirst({
      where: {
        name
      }
    })

    if(verifyTodoExist) {
      throw new AppError("Todo já existe!")
    }

    const todo = await client.todo.create({
      data: {
        name,
        complete,
        description,
        id_colletion,
      }
    })

    return todo;
  }
}