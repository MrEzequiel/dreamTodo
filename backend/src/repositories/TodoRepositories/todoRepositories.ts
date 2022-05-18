import { Todo } from '@prisma/client'
import { ICreateTodoDTO } from '../../modules/todo/dtos/ICreateTodoDTO'
import { IRequest } from '../../modules/todo/useCases/editTodo/EditTodoUseCase'

export interface TodoRepository {
  createTodo: (todo: ICreateTodoDTO) => Promise<Todo>

  editTodo: ({ id, title, description }: IRequest) => Promise<void>

  deleteTodo: (id: string) => Promise<void>

  updateCheckTodo: (id: string, complete: boolean) => Promise<void>

  listTodoDate: (id_collection: string, modo: string) => Promise<Todo[]>

  findTodoByTitle: (title: string) => Promise<Todo | null>

  findTodoById: (id: string) => Promise<Todo | null>
}
