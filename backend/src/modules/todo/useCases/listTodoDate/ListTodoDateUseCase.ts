import { client } from "../../../../database/client";



export class ListTodoDateUseCase {

  async execute(id_collection: string, modo: string){

    const todos = await client.todo.findMany({
      where: {
        collection: {
          id: id_collection
        }
      },
      orderBy: {
        created_at: modo.includes('asc') ? 'asc' : 'desc' 
      }
    });

    return todos
  }
}