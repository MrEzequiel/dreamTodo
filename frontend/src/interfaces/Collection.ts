import { BaseEmoji } from 'emoji-mart'
import ITodo from './Todo'

interface ICollection {
  id: string
  title: string
  todo: ITodo[]
  emoji: BaseEmoji
}

export default ICollection
