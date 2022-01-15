import { prisma } from "../../../../database/prismaClient";
import { ICreateTodoDTO } from "../dtos/ICreateTodoDTO";




export class CreateTodoUseCase {

  async execute({ name, description, isChecked = false }: ICreateTodoDTO) {

    const todo = await prisma.todo.create({
      data: {
        name,
        description,
        isChecked,
      }
    })

    return todo;
  }
}