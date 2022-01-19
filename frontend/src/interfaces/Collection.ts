import { IEmojiData } from 'emoji-picker-react'
import ITodo from './Todo'

interface ICollection {
  id: string
  title: string
  todo: ITodo[]
  emoji: IEmojiData
}

export default ICollection
