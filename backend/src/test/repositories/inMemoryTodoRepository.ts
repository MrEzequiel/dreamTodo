import { Todo } from '@prisma/client'
import { ICreateTodoDTO } from '../../modules/todo/dtos/ICreateTodoDTO'
import { IEditTodo } from '../../modules/todo/useCases/editTodo/EditTodoUseCase'
import { TodoRepository } from '../../repositories/TodoRepositories/todoRepositories'

import { v4 } from 'uuid'

export class InMemoryTodoRepository implements TodoRepository {
  todos: Todo[] = []

  async createTodo(todo: ICreateTodoDTO) {
    Object.assign(todo, {
      id: v4()
    })

    this.todos.push(todo as Todo)
    return todo as Todo
  }

  async editTodo({ id, title, description }: IEditTodo) {
    this.todos.map(async () => {
      const todo = await this.findTodoById(id)

      if (todo) {
        ;(todo.title = title ?? todo.title),
          (todo.description = description ?? todo.description)
      }
    })
  }

  async deleteTodo(id: string) {
    this.todos.filter(todo => todo.id !== id)
  }

  async updateCheckTodo(id: string, complete: boolean) {
    this.todos.map(async () => {
      const todo = await this.findTodoById(id)

      if (todo) {
        todo.complete = complete
      }
    })
  }

  listTodoDate: (id_collection: string, modo: string) => Promise<Todo[]>

  async findTodoByTitle(title: string) {
    const todo = this.todos.find(todo => todo.title === title)
    return todo ?? null
  }

  async findTodoById(id: string) {
    const todo = this.todos.find(todo => todo.id === id)
    return todo ?? null
  }
}
