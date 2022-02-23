import { client } from "../../../../database/client";



export class DragDropTodoUseCase {

  async execute() {
    
    const todo = await client.todo.findMany({
      
    })
  }
}