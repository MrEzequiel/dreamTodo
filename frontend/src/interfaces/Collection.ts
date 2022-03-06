import ITodo from './Todo'

interface ICollection {
  id: string
  name: string
  Todo: ITodo[]
  emoji: string
}

export default ICollection
