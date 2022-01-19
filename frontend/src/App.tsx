import { ThemeProvider } from 'styled-components'

import GlobalStyles from './styles/GlobalStyles'
import darkTheme from './styles/theme/dark'
import TodoProvider from './context/TodoListContext'
import Header from './components/Header'
import TodoPage from './pages/TodoPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Collections from './pages/Collections'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <TodoProvider>
        <ThemeProvider theme={darkTheme}>
          <Header />

          <Routes>
            <Route path="/" element={<Collections />} />
            <Route path="/todo/:id" element={<TodoPage />} />
          </Routes>

          <GlobalStyles />
        </ThemeProvider>
      </TodoProvider>
    </BrowserRouter>
  )
}

export default App
