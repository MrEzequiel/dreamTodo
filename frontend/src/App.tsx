import { lazy, Suspense } from 'react'
import { ThemeProvider } from 'styled-components'

import GlobalStyles from './styles/GlobalStyles'
import darkTheme from './styles/theme/dark'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserProvider, { useUser } from './context/UserContext'
import NotificationContextProvider from './context/NotificationContext'
import NotificationUI from './components/NotificationUI'
import Register from './pages/Register'
import RequiredUser from './components/RequiredUser'
import SuspenseFallback from './components/SuspenseFallback'

const Home = lazy(() => import('./pages/Home'))

const App: React.FC = () => {
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
                    <Suspense fallback={<SuspenseFallback />}>
                      <Home />
                    </Suspense>
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
