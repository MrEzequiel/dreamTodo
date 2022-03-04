import { Todo } from "@prisma/client";
import { client } from "../../../../database/client";

export class ListTodoOfColletionUseCase {
  async execute( collectionid: string, complete: string ): Promise<Todo[]>{
   
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