import { useReducer } from 'react'
import FormTodo from './components/FormTodo/index'
import TodoList from './components/TodoList'

import GlobalStyles from './styles/GlobalStyles'
import TitleStyle from './styles/TitleStyle'

export const ACTIONS = {
  ADD_TODO: 'add-todo'
}

function newTodo(name) {
  return { id: Date.now(), name, complete: false }
}

function reducer(todos, action) {
  switch (action.types) {
    case ACTIONS.ADD_TODO:
      return [...todos, newTodo(action.payload.name)]
    default:
      return todos
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, [])

  return (
    <>
      <TitleStyle>To Do</TitleStyle>
      <FormTodo dispatch={dispatch} />
      {!!todos.length && <TodoList todos={todos} />}
      <GlobalStyles />
    </>
  )
}

export default App
