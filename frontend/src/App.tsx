import { ThemeProvider } from 'styled-components'

import GlobalStyles from './styles/GlobalStyles'
import darkTheme from './styles/theme/dark'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserProvider, { useUser } from './context/UserContext'
import NotificationContextProvider from './context/NotificationContext'
import NotificationUI from './components/NotificationUI'
import Register from './pages/Register'
import RequiredUser from './components/RequiredUser'
import Home from './pages/Home'

const App: React.FC = () => {
  const { isUser } = useUser()

  return (
    <ThemeProvider theme={darkTheme}>
      <NotificationContextProvider>
        <UserProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/register/*" element={<Register />} />

              <Route
                path="/*"
                element={
                  <RequiredUser>
                    <Home />
                  </RequiredUser>
                }
              />
            </Routes>

            <NotificationUI />
            <GlobalStyles />
          </BrowserRouter>
        </UserProvider>
      </NotificationContextProvider>
    </ThemeProvider>
  )
}

export default App
