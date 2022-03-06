import React from 'react'
import TodoProvider from '../../context/TodoListContext'
import Header from '../../components/Header'
import Collections from '../Collections'
import TodoPage from '../TodoPage'
import NotFound from '../NotFound'
import { Route, Routes } from 'react-router-dom'

const Home: React.FC = () => {
  return (
    <TodoProvider>
      <Header />

      <Routes>
        <Route path="/collection" element={<Collections />} />
        <Route path="/todo/:id" element={<TodoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </TodoProvider>
  )
}

export default Home
