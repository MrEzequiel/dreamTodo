import { Todo } from "@prisma/client";
import { client } from "../../../../database/client";
import { AppError } from "../../../../infra/errors/AppError";

export class ListTodoOfColletionUseCase {
  
  async execute( name: string, complete: string ){

    const verifyIfColletionExist = await client.collection.findFirst({
      where: {
        name
      }
    })

    if(!verifyIfColletionExist) {
      throw new AppError('Colletion não encontrada.')
    }
   
    const completeTodo = complete.includes('true') ? true : false

    const collection = await client.collection.findMany({
      where: {
        name,
      },
      select: {
        id: true,
        name: true,
        emoji: true,
        userId: true,
        created_at: true,
        modified_at: true,
        Todo: {
          where: {
            complete : completeTodo
          }
        }
      },
    })

    return collection
  }
}