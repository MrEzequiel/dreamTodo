import { Todo } from '@prisma/client';
import { client } from '../../../../database/client'
import { ICreateTodoDTO } from '../../dtos/ICreateTodoDTO';


export class CreateTodoUseCase {

  async execute({ name, isChecked, description, colletion} : ICreateTodoDTO): Promise<Todo> {

    const verifyTodoExist = await client.todo.findFirst({
      where: {
        name
      }
    })

    if(verifyTodoExist) {
      throw new Error("Todo já existe!")
    }

    const todo = await client.todo.create({
      data: {
        name,
        isChecked,
        description,
        colletion
      }
    })

    return todo;
  }
}