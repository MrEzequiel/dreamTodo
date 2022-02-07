import { BaseEmoji } from 'emoji-mart'
import IFieldTodo from './IFieldTodo'

interface ICollection {
  id: string
  title: string
  todo: IFieldTodo
  emoji: BaseEmoji
}

export default ICollection
