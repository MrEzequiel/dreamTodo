import { InitialStateType, ITodo } from "../context/TodoListContext"

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined ? {
    type: Key;
  }
  : {
    type: Key;
    payload: M[Key];
  }
}

export enum Types {
  Add = 'ADD_TODO',
  Toggle = 'TOGGLE_TODO',
  Remove = 'REMOVE_TODO',
  Edit = 'EDIT_TODO'
}

type TodoPayload = {
  [Types.Add] : {
    name: string
  }
  [Types.Toggle] : {
    id: number
  }
  [Types.Remove] : {
    id: number
  }
  [Types.Edit] : {
    name: string
    id: number
  }
}

export type TodoActions = ActionMap<TodoPayload>[keyof ActionMap<TodoPayload>]

function newTodo(name: string) {
  return { id: Date.now(), name, complete: false }
}

function removeTodoById(id: number, todos: ITodo[]) {
  return todos.filter(todo => id !== todo.id)
}

export const todoReducer = (state: InitialStateType, action: TodoActions) => {
  let { todos } = state

  switch(action.type) {
    case Types.Add:
      todos.unshift(newTodo(action.payload.name))
      return { ...state, todos }

    case 'TOGGLE_TODO':
      // find todo complete and toggle complete
      let findTodo = todos.find(todo => action.payload.id === todo.id)
      if(findTodo === undefined) return state
  
      let todoToggle = { name: findTodo.name, id: findTodo.id, complete: !findTodo.complete }

      // if there is only one task, the other procedures are unnecessary.
      if (todos.length === 1) return { ...state, todos: [todoToggle]}

      // removing to do you changed and adding to the first item in the array
      todos = removeTodoById(action.payload.id, todos)
      todos.unshift(todoToggle)
      return {...state, todos}

    case 'REMOVE_TODO':
      return { ...state, todos: removeTodoById(action.payload.id, todos) }

    case 'EDIT_TODO':
       
      const newTodos = todos.map(todo => {
        if (todo.id !== action.payload.id) return todo

        return { ...todo, name: action.payload.name }
      })

      return {...state, todos: newTodos}

    default:
      return state
  }
}