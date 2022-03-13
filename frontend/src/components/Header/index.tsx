import { createRef, useState } from 'react'
import * as s from './style'

import logo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'
import Button from '../../styles/Button'
import { FaBars, FaDoorClosed, FaUserCog } from 'react-icons/fa'
import SubNavBar from './SubNavBar'
import { CSSTransition } from 'react-transition-group'
import Clock from './Clock'
import { useUser } from '../../context/UserContext'
import Dropdown from '../Dropdown'
import { DropdownItens } from '../Dropdown/style'
import RenderImageUser from '../RenderImageUser'
import { useTheme } from 'styled-components'

const Header = () => {
  const {
    isUser,
    user: { user }
  } = useUser()
  const navBarRef = createRef<HTMLDivElement>()
  const [navBar, setNavBar] = useState<boolean>(false)
  const { colors } = useTheme()

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

            <s.ProfilePill>
              <RenderImageUser
                height={35}
                width={35}
                alt="user image"
                fashion={{
                  borderRadius: '50%',
                  overflow: 'hidden',
                  border: `2px solid ${colors.colorPrimary}`,
                  flexShrink: 0
                }}
                url={user?.picture ? user.picture : user.imageURL}
              />

              <s.ProfilePillText>
                {user.name ? user.name : user.email}
              </s.ProfilePillText>

              <Dropdown>
                <DropdownItens>
                  <FaUserCog />
                  Settings
                </DropdownItens>

                <DropdownItens>
                  <FaDoorClosed />
                  Logout
                </DropdownItens>
              </Dropdown>
            </s.ProfilePill>
          </div>
        </s.HeaderStyle>
      </s.HeaderWrapper>

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
