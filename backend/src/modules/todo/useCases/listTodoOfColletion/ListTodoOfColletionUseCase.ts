import { Todo } from "@prisma/client";
import { client } from "../../../../database/client";
import { AppError } from "../../../../infra/errors/AppError";

export class ListTodoOfColletionUseCase {
  
  async execute( collectionid: string, complete: string ): Promise<Todo[]>{

    const verifyIfColletionExist = await client.collection.findFirst({
      where: {
        id: collectionid
      }
    })

    if(!verifyIfColletionExist) {
      throw new AppError('Colletion não encontrada.')
    }
   
    const completeTodo = complete.includes('true') ? true : false

    const todo = await client.todo.findMany({
      where: {
        id_collection: collectionid,
        complete: completeTodo
      },
    })

    return todo
  }
}