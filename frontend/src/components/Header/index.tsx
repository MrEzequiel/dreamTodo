import React, { useEffect, useState } from 'react'
import * as s from './style'

import logo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'

const Header = () => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]
  const [date, setDate] = useState(new Date())

  function refreshClock() {
    setDate(new Date())
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000)
    return function cleanup() {
      clearInterval(timerId)
    }
  }, [])

  return (
    <s.HeaderWrapper>
      <s.HeaderStyle>
        <NavLink to="/">
          <img src={logo} alt="dream to do logo" />
        </NavLink>

        <div className="left">
          <p>
            {`${
              monthNames[date.getMonth()]
            } ${date.getDay()}, ${date.getFullYear()} · ${date.getHours()}:${date.getMinutes()}`}
          </p>
          <s.ButtonAccount>Login</s.ButtonAccount>
        </div>
      </s.HeaderStyle>
    </s.HeaderWrapper>
  )
}

export default Header
