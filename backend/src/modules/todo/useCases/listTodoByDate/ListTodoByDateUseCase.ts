import { client } from "../../../../database/client";



export class ListTodoByDateUseCase {

  async execute(id_todo: string){

    const todos = await client.todo.findMany({
      where: {
        Colletion: {
          every: {
            id: id_todo
          }
        },
      },
      orderBy: {
        created_at: 'asc'
      }
    });

    return todos
  }
}