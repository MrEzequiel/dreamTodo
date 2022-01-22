import { Todo } from "@prisma/client";
import { client } from "../../../../database/client";



interface IRequestTodo {
  colletionid: string
}

export class ListTodoOfColletionUseCase {
  async execute({ colletionid }: IRequestTodo): Promise<Todo[]>{
    const todo = await client.todo.findMany({
      where: {
        colletion: colletionid
      },
    })

    return todo
  }
}