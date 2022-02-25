interface ITodo {
  id: string
  name: string
  complete: boolean
  description?: string
  expanded?: {
    links?: string[]
  }
}

export default ITodo
