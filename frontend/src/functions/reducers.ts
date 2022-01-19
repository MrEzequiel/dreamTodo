import { InitialStateType } from '../context/TodoListContext'
import ICollection from '../interfaces/Collection'
import ITodo from '../interfaces/Todo'
import { v4 as uuidv4 } from 'uuid'
import { BaseEmoji } from 'emoji-mart'

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export enum Types {
  Add_Collection = 'ADD_COLLECTION',
  Add = 'ADD_TODO',
  Toggle = 'TOGGLE_TODO',
  Remove = 'REMOVE_TODO',
  Edit = 'EDIT_TODO'
}

type CollectionsPayload = {
  [Types.Add_Collection]: {
    title: string
    emoji: BaseEmoji
  }
  [Types.Add]: {
    id_collection: string
    name: string
    description?: string
    expanded?: {
      links?: string[]
    }
  }
  [Types.Toggle]: {
    id_collection: string
    id: number
  }
  [Types.Remove]: {
    id_collection: string
    id: number
  }
  [Types.Edit]: {
    id_collection: string
    name: string
    id: number
    description?: string
    expanded?: {
      links?: string[]
    }
  }
}

export type CollectionsActions =
  ActionMap<CollectionsPayload>[keyof ActionMap<CollectionsPayload>]

function removeTodoById(id: number, todos: ITodo[]) {
  return todos.filter(todo => id !== todo.id)
}

interface IFindReturn {
  collection: ICollection
  todos: ITodo[]
}

function findThisCollection(
  id: string,
  collections: ICollection[]
): IFindReturn | undefined {
  const collection = collections.find(collection => collection.id === id)
  if (collection) return { collection, todos: collection.todo }
}

function updateCollections(
  collections: ICollection[],
  id: string,
  todos: ITodo[]
) {
  return collections.map(collection => {
    if (id !== collection.id) return collection

    const newCollection: ICollection = {
      ...collection,
      todo: todos
    }

    return newCollection
  })
}

export const todoReducer = (
  state: InitialStateType,
  action: CollectionsActions
) => {
  const { collections } = state

  // TODO: Drag n drop todos
  switch (action.type) {
    case Types.Add_Collection:
      const newCollection: ICollection = {
        id: uuidv4(),
        title: action.payload.title,
        todo: [],
        emoji: action.payload.emoji
      }

      collections.unshift(newCollection)
      return { collections }

    case Types.Add: {
      const find = findThisCollection(action.payload.id_collection, collections)
      if (!find) return state

      const { collection, todos } = find
      const newTodo: ITodo = {
        id: Date.now(),
        name: action.payload.name,
        complete: false,
        description: action.payload.description,
        expanded: action.payload.expanded
      }

      todos.unshift(newTodo)
      return {
        collections: updateCollections(collections, collection.id, todos)
      }
    }

    case Types.Toggle: {
      const find = findThisCollection(action.payload.id_collection, collections)
      if (!find) return state

      let { collection, todos } = find
      // find todo complete and toggle complete
      let findTodo = todos.find(todo => action.payload.id === todo.id)
      if (findTodo === undefined) return state

      let todoToggle = {
        ...findTodo,
        complete: !findTodo.complete
      }

      // removing to do you changed and adding to the first item in the array
      todos = removeTodoById(action.payload.id, todos)
      todos.unshift(todoToggle)
      return {
        collections: updateCollections(collections, collection.id, todos)
      }
    }

    case Types.Remove: {
      const find = findThisCollection(action.payload.id_collection, collections)
      if (!find) return state

      let { collection, todos } = find

      collection.todo = removeTodoById(action.payload.id, todos)

      return { ...state, collections: [...collections, collection] }
    }

    case Types.Edit: {
      const find = findThisCollection(action.payload.id_collection, collections)
      if (!find) return state

      let { collection, todos } = find

      const newTodos = todos.map(todo => {
        if (todo.id !== action.payload.id) return todo

        return { ...todo, ...action.payload }
      })

      return { ...state, collections: [...collections, collection] }
    }

    default:
      return state
  }
}
