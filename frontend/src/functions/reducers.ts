import { InitialStateType } from '../context/TodoListContext'
import ICollection from '../interfaces/Collection'
import ITodo from '../interfaces/Todo'
import { v4 as uuidv4 } from 'uuid'
import { BaseEmoji } from 'emoji-mart'
import update from 'immutability-helper'
import IFieldTodo from '../interfaces/IFieldTodo'

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
  Edit_Collection = 'EDIT_COLLECTION',
  Remove_Collection = 'REMOVE_COLLECTION',
  Add = 'ADD_TODO',
  Toggle = 'TOGGLE_TODO',
  Remove = 'REMOVE_TODO',
  Edit = 'EDIT_TODO',
  Move = 'MOVE_TODO'
}

type CollectionsPayload = {
  [Types.Add_Collection]: {
    title: string
    emoji: BaseEmoji
  }
  [Types.Edit_Collection]: {
    title: string
    emoji: BaseEmoji
    id: string
  }
  [Types.Remove_Collection]: {
    id: string
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
    id: string
  }
  [Types.Remove]: {
    id_collection: string
    id: string
  }
  [Types.Edit]: {
    id_collection: string
    name: string
    id: string
    description?: string
    expanded?: {
      links?: string[]
    }
  }
  [Types.Move]: {
    id_collection: string
    dragIndex: number
    hoverIndex: number
    type: 'complete' | 'incomplete'
  }
}

export type CollectionsActions =
  ActionMap<CollectionsPayload>[keyof ActionMap<CollectionsPayload>]

function removeTodoById(id: string, todos: ITodo[]) {
  return todos.filter(todo => id !== todo.id)
}

interface IFindReturn {
  collection: ICollection
  todos: IFieldTodo
}

function findThisCollection(
  id: string,
  collections: ICollection[]
): IFindReturn | undefined {
  const collection = collections.find(collection => collection.id === id)
  if (collection) return { collection, todos: collection.todo }
}

function findTodo(
  arr: IFieldTodo,
  id: string,
  callback?: (todo: ITodo, key: keyof typeof arr) => any
) {
  const keyTodos = Object.keys(arr) as Array<keyof typeof arr>

  let findTodo: ITodo | undefined
  keyTodos.forEach(key => {
    if (findTodo) return

    findTodo = arr[key].find(todo => {
      if (todo.id === id) {
        if (callback) callback(todo, key)

        return true
      } else {
        return false
      }
    })
  })

  return findTodo
}

function updateCollections(
  collections: ICollection[],
  id: string,
  todos: IFieldTodo
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
    case Types.Add_Collection: {
      const newCollection: ICollection = {
        id: uuidv4(),
        title: action.payload.title,
        todo: {
          complete: [],
          incomplete: []
        },
        emoji: action.payload.emoji
      }

      collections.unshift(newCollection)
      return { collections }
    }

    case Types.Remove_Collection: {
      return {
        collections: collections.filter(
          collection => collection.id !== action.payload.id
        )
      }
    }

    case Types.Edit_Collection: {
      return {
        collections: collections.map(collection => {
          if (collection.id !== action.payload.id) return collection

          return {
            ...collection,
            title: action.payload.title,
            emoji: action.payload.emoji
          }
        })
      }
    }

    case Types.Add: {
      const find = findThisCollection(action.payload.id_collection, collections)
      if (!find) return state

      const { collection, todos } = find
      const newTodo: ITodo = {
        id: uuidv4(),
        name: action.payload.name,
        complete: false,
        description: action.payload.description,
        expanded: action.payload.expanded
      }

      todos.incomplete.push(newTodo)
      return {
        collections: updateCollections(collections, collection.id, todos)
      }
    }

    case Types.Toggle: {
      const find = findThisCollection(action.payload.id_collection, collections)
      if (!find) return state

      let { collection, todos } = find

      // find todo complete and toggle complete
      let thisTodo = findTodo(todos, action.payload.id)
      if (thisTodo === undefined) return state

      thisTodo = {
        ...thisTodo,
        complete: !thisTodo.complete
      }

      if (thisTodo.complete) {
        todos.incomplete = removeTodoById(thisTodo.id, todos.incomplete)
        todos.complete.unshift(thisTodo)
      } else {
        todos.complete = removeTodoById(thisTodo.id, todos.complete)
        todos.incomplete.unshift(thisTodo)
      }

      return {
        collections: updateCollections(collections, collection.id, todos)
      }
    }

    case Types.Remove: {
      const find = findThisCollection(action.payload.id_collection, collections)
      if (!find) return state

      let { collection, todos } = find
      const thisTodo = findTodo(todos, action.payload.id)
      if (thisTodo === undefined) return state

      if (thisTodo.complete)
        todos.complete = removeTodoById(thisTodo.id, todos.complete)
      else todos.incomplete = removeTodoById(thisTodo.id, todos.incomplete)

      return {
        collections: updateCollections(collections, collection.id, todos)
      }
    }

    case Types.Edit: {
      const find = findThisCollection(action.payload.id_collection, collections)
      if (!find) return state

      let { collection, todos } = find

      findTodo(todos, action.payload.id, (thisTodoCallback, field) => {
        const newField = todos[field].map(todo => {
          if (todo.id !== thisTodoCallback.id) return todo

          const newTodo: ITodo = {
            ...thisTodoCallback,
            ...action.payload
          }
          return newTodo
        })

        todos[field] = newField
      })

      return {
        collections: updateCollections(collections, collection.id, todos)
      }
    }

    case Types.Move: {
      const find = findThisCollection(action.payload.id_collection, collections)
      if (!find) return state

      let { collection, todos } = find

      const newTodos = update(todos[action.payload.type], {
        $splice: [
          [action.payload.dragIndex, 1],
          [
            action.payload.hoverIndex,
            0,
            todos[action.payload.type][action.payload.dragIndex]
          ]
        ]
      })

      todos = {
        ...todos,
        [action.payload.type]: newTodos
      }

      return {
        collections: updateCollections(collections, collection.id, todos)
      }
    }

    default:
      return state
  }
}
