import { createRef, useCallback, useEffect, useState } from 'react'
import * as s from './style'

import logo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'
import Login from './ModalEntry'
import Button from '../../styles/Button'
import { FaBars } from 'react-icons/fa'
import SubNavBar from './SubNavBar'
import { CSSTransition } from 'react-transition-group'

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

const Header = () => {
  const navBarRef = createRef<HTMLDivElement>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [navBar, setNavBar] = useState<boolean>(false)

  const [date, setDate] = useState(new Date())

  function refreshClock() {
    setDate(new Date())
  }

  const formateDate = (date: Date) => {
    const month = monthNames[date.getMonth()]
    const day = date.getDate()
    const year = date.getFullYear()
    const hours = date.getHours()
    const minutes = date.getMinutes().toString().padStart(2, '0')

    return `${month} ${day}, ${year} · ${hours}:${minutes}`
  }

  useEffect(() => {
    const timerId = setInterval(refreshClock, 1000)
    return () => clearInterval(timerId)
  }, [])

  return (
    <>
      <s.HeaderWrapper>
        <s.HeaderStyle>
          <div className="right">
            <s.ButtonCollections type="button" onClick={() => setNavBar(true)}>
              <FaBars size={20} />
            </s.ButtonCollections>

            <NavLink to="/">
              <img src={logo} alt="dream to do logo" />
            </NavLink>
          </div>

          <div className="left">
            <p>{formateDate(date)}</p>

            <Button
              onClick={() => setOpenModal(true)}
              outlined
              className="button-login"
            >
              Login
            </Button>
          </div>
        </s.HeaderStyle>
      </s.HeaderWrapper>

      <Login setModal={setOpenModal} modalIsOpen={openModal} />

      <CSSTransition
        in={navBar === true}
        timeout={400}
        unmountOnExit
        classNames="SubNavBar"
        nodeRef={navBarRef}
      >
        <SubNavBar setNavBar={setNavBar} ref={navBarRef} />
      </CSSTransition>
    </>
  )
}

export default Header
