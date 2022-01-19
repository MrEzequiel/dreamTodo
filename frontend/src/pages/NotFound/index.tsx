import React from 'react'
import { NavLink } from 'react-router-dom'
import { NotFoundStyle } from './style'

const NotFound: React.FC = () => {
  return (
    <NotFoundStyle>
      <h1>404</h1>
      <p>Page not found</p>
      <p>
        <NavLink to="/">click here</NavLink> to go to home page
      </p>
    </NotFoundStyle>
  )
}

export default NotFound
