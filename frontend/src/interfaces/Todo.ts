interface ITodo {
  id: string
  title: string
  complete: boolean
  description?: string
  expanded?: {
    links?: string[]
  }
}

export default ITodo
