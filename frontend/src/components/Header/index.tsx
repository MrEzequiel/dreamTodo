import React from 'react'
import * as s from './style'

import logo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <s.HeaderWrapper>
      <s.HeaderStyle>
        <NavLink to="/">
          <img src={logo} alt="dream to do logo" />
        </NavLink>
        <s.ButtonAccount>Login</s.ButtonAccount>
      </s.HeaderStyle>
    </s.HeaderWrapper>
  )
}

export default Header
