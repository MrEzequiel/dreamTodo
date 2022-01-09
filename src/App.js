import { useReducer } from 'react'
import { ThemeProvider } from 'styled-components'
import FormTodo from './components/FormTodo/index'
import TodoList from './components/TodoList'

import GlobalStyles from './styles/GlobalStyles'
import TitleStyle from './styles/TitleStyle'
import darkTheme from './styles/theme/dark'

export const ACTIONS = {
  ADD_TODO: 'add-todo'
}

function newTodo(name) {
  return { id: Date.now(), name, complete: false }
}

function reducer(todos, action) {
  switch (action.types) {
    case ACTIONS.ADD_TODO:
      return [newTodo(action.payload.name), ...todos]
    default:
      return todos
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, [])

  return (
    <ThemeProvider theme={darkTheme}>
      <TitleStyle>To Do</TitleStyle>
      <FormTodo dispatch={dispatch} />
      {!!todos.length && <TodoList todos={todos} />}
      <GlobalStyles />
    </ThemeProvider>
  )
}

export default App
