import { ThemeProvider } from 'styled-components'

import GlobalStyles from './styles/GlobalStyles'
import darkTheme from './styles/theme/dark'
import TodoProvider from './context/TodoListContext'
import Header from './components/Header'
import TodoPage from './pages/TodoPage'

const App: React.FC = () => {
  return (
    <TodoProvider>
      <ThemeProvider theme={darkTheme}>
        <Header />
        <TodoPage />
        <GlobalStyles />
      </ThemeProvider>
    </TodoProvider>
  )
}

export default App
