import React from 'react'
import Header from '../../components/Header'
import Collections from '../Collections'
import TodoPage from '../TodoPage'
import NotFound from '../NotFound'
import { Route, Routes } from 'react-router-dom'
import { CollectionsProvider } from '../../context/CollectionsContext'

const Home: React.FC = () => {
  return (
    <CollectionsProvider>
      <Header />

      <Routes>
        <Route path="/collection" element={<Collections />} />
        <Route path="/todo/:id" element={<TodoPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </CollectionsProvider>
  )
}

export default Home
