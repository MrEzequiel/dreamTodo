import { createRef, useCallback, useEffect, useState } from 'react'
import * as s from './style'

import logo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'
import Login from './ModalEntry'
import Button from '../../styles/Button'
import { FaBars } from 'react-icons/fa'
import SubNavBar from './SubNavBar'
import { CSSTransition } from 'react-transition-group'
import Clock from './Clock'

const Header = () => {
  const navBarRef = createRef<HTMLDivElement>()
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [navBar, setNavBar] = useState<boolean>(false)

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
            <Clock />

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
