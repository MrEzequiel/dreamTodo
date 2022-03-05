import { client } from "../../../../database/client";
import { AppError } from "../../../../infra/errors/AppError";



export class ListTodoDateUseCase {

  async execute(id_collection: string, modo: string){

    const verifyIfColletionExist = await client.collection.findFirst({
      where: {
        id: id_collection
      }
    })

    if(!verifyIfColletionExist) {
      throw new AppError('Colletion não encontrada.')
    }

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