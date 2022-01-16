import { ThemeProvider } from 'styled-components'
import FormTodo from './components/FormTodo/index'
import TodoList from './components/TodoList'
import { FaAngleLeft } from 'react-icons/fa'

import GlobalStyles from './styles/GlobalStyles'
import TitleStyle from './styles/TitleStyle'
import darkTheme from './styles/theme/dark'
import TodoProvider from './context/TodoListContext'
import Header from './components/Header'

const App: React.FC = () => {
  return (
    <TodoProvider>
      <ThemeProvider theme={darkTheme}>
        <Header />
        <TitleStyle>
          <button type="button">
            <FaAngleLeft size={20} />
          </button>
          To Do
        </TitleStyle>
        <FormTodo />
        <TodoList />
        <GlobalStyles />
      </ThemeProvider>
    </TodoProvider>
  )
}

export default App
