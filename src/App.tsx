import { ThemeProvider } from 'styled-components'
import FormTodo from './components/FormTodo/index'
import TodoList from './components/TodoList'

import GlobalStyles from './styles/GlobalStyles'
import TitleStyle from './styles/TitleStyle'
import darkTheme from './styles/theme/dark'
import TodoListProvider from './context/TodoListContext'

function App() {
  return (
    <TodoListProvider>
      <ThemeProvider theme={darkTheme}>
        <TitleStyle>To Do</TitleStyle>
        <FormTodo />
        <TodoList />
        <GlobalStyles />
      </ThemeProvider>
    </TodoListProvider>
  )
}

export default App
