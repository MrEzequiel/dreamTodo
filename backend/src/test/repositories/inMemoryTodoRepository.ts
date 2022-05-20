import { Todo } from '@prisma/client'
import { ICreateTodoDTO } from '../../modules/todo/dtos/ICreateTodoDTO'
import { IEditTodo } from '../../modules/todo/useCases/editTodo/EditTodoUseCase'
import { TodoRepository } from '../../repositories/TodoRepositories/todoRepositories'

import { v4 } from 'uuid'
import { AppError } from '../../infra/errors/AppError'

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
    const todo = await this.findTodoById(id)

    if (!todo) {
      throw new AppError('Error')
    }

    todo.title = title ?? todo.title
    todo.description = description ?? todo.description

    return todo
  }

  async deleteTodo(id: string) {
    this.todos.filter(todo => todo.id !== id)
  }

  async updateCheckTodo(id: string, complete: boolean) {
    const todo = await this.findTodoById(id)

    if (!todo) {
      throw new AppError('eeror')
    }

    todo.complete = complete

    return todo
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
