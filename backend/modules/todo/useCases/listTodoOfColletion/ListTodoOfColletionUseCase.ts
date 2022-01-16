import { client } from "../../../../database/client";



interface IRequestTodo {
  colletionid: string
}

export class ListTodoOfColletionUseCase {
  async execute({ colletionid }: IRequestTodo) {
    const todo = await client.todo.findMany({
      where: {
        colletion: colletionid
      },
    })

    return todo
  }
}