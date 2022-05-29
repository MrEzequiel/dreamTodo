import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routesPaths from '../../utils/routesPaths'

import Header from '../../components/Header'
import Collections from '../Collections'
import TodoPage from '../TodoPage'
import NotFound from '../NotFound'
import UserSettings from '../UserSettings'

const Home: React.FC = () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path={routesPaths.collection} element={<Collections />} />
        <Route path={routesPaths.settings} element={<UserSettings />} />
        <Route
          path={`${routesPaths.todo}/:collectionName`}
          element={<TodoPage />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default Home
