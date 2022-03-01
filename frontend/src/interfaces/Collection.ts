import IFieldTodo from './IFieldTodo'

interface ICollection {
  id: string
  title: string
  todo: IFieldTodo
  emoji: string
}

export default ICollection
