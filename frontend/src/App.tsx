import { lazy, Suspense } from 'react'
import { ThemeProvider } from 'styled-components'
import { ReactQueryDevtools } from 'react-query/devtools'

import GlobalStyles from './styles/GlobalStyles'
import darkTheme from './styles/theme/dark'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserProvider, { useAuth } from './context/UserContext'
import NotificationContextProvider from './context/NotificationContext'
import NotificationUI from './components/NotificationUI'
import Register from './pages/Register'
import RequiredUser from './components/RequiredUser'
import SuspenseFallback from './components/SuspenseFallback'

import { QueryClientProvider } from 'react-query'
import queryClient from './react-query/queryClient'

const Home = lazy(() => import('./pages/Home'))

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={darkTheme}>
        <NotificationContextProvider>
          <BrowserRouter>
            <UserProvider>
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
            </UserProvider>
          </BrowserRouter>
        </NotificationContextProvider>
        <GlobalStyles />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
