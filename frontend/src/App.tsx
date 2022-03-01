import { ThemeProvider } from 'styled-components'

import GlobalStyles from './styles/GlobalStyles'
import darkTheme from './styles/theme/dark'
import TodoProvider from './context/TodoListContext'
import Header from './components/Header'
import TodoPage from './pages/TodoPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Collections from './pages/Collections'
import NotFound from './pages/NotFound'
import UserProvider from './context/UserContext'
import NotificationContextProvider from './context/NotificationContext'
import NotificationUI from './components/NotificationUI'

const App: React.FC = () => {
  return (
    <NotificationContextProvider>
      <UserProvider>
        <BrowserRouter>
          <TodoProvider>
            <ThemeProvider theme={darkTheme}>
              <Header />

              <Routes>
                <Route path="/" element={<Collections />} />
                <Route path="/todo/:id" element={<TodoPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>

              <NotificationUI />
              <GlobalStyles />
            </ThemeProvider>
          </TodoProvider>
        </BrowserRouter>
      </UserProvider>
    </NotificationContextProvider>
  )
}

export default App
