interface ITodo {
  id: number
  name: string
  complete: boolean
  description?: string
  expanded?: {
    links?: string[]
  }
}

export default ITodo
