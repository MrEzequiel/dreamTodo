import React from 'react'
import Header from '../../components/Header'
import Collections from '../Collections'
import TodoPage from '../TodoPage'
import NotFound from '../NotFound'
import { Route, Routes } from 'react-router-dom'
import UserSettings from '../UserSettings'

const Home: React.FC = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/user-settings" element={<UserSettings />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/todo/:id" element={<TodoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default Home
