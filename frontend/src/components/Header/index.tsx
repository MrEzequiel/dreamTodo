import { createRef, useEffect, useState } from 'react'
import * as s from './style'

import logo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'
import Login from './ModalEntry'
import Button from '../../styles/Button'
import { FaBars } from 'react-icons/fa'
import SubNavBar from './SubNavBar'
import { CSSTransition } from 'react-transition-group'

const Header = () => {
  const navBarRef = createRef<HTMLDivElement>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [navBar, setNavBar] = useState<boolean>(false)

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
            <p>
              {`${
                monthNames[date.getMonth()]
              } ${date.getDate()}, ${date.getFullYear()} · ${date.getHours()}:${date
                .getMinutes()
                .toString()
                .padStart(2, '0')}`}
            </p>

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

      {openModal && <Login setModal={setOpenModal} />}

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
