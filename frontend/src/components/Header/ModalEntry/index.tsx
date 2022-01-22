import React, { useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import Title from '../../../styles/Title'
import Modal from '../../Modal'
import SignIn from './SignIn'
import SignOut from './SignUp'

import * as s from './style'

interface IProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function formateLogin(text: string) {
  return text.split('-')[1]
}

const Login: React.FC<IProps> = ({ setModal }) => {
  const [login, setLogin] = useState<'sign-in' | 'sign-up'>('sign-in')

  const signInRef = useRef<HTMLDivElement>(null)
  const signOutRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<any>(null)

  const [menuHeight, setMenuHeight] = useState<any>()

  useEffect(() => {
    setMenuHeight(containerRef.current?.firstChild?.offsetHeight)
  }, [])

  useEffect(() => {
    if (login === 'sign-in') {
      setMenuHeight(signInRef.current?.offsetHeight)
    } else {
      setMenuHeight(signOutRef.current?.offsetHeight)
    }
  }, [login])

  return (
    <Modal size="min(380px, 90%)" setCloseModal={setModal}>
      <Title size="2.8rem" separator style={{ marginBottom: '20px' }}>
        Sign {formateLogin(login)}
      </Title>

      <s.Container style={{ height: menuHeight ?? 'auto' }} ref={containerRef}>
        <CSSTransition
          nodeRef={signInRef}
          in={login === 'sign-in'}
          timeout={700}
          classNames="sign-in"
          unmountOnExit
        >
          <div className="sign-in" ref={signInRef}>
            <SignIn setLogin={setLogin} />
          </div>
        </CSSTransition>

        <CSSTransition
          nodeRef={signOutRef}
          in={login === 'sign-up'}
          timeout={700}
          classNames="sign-up"
          unmountOnExit
        >
          <div className="sign-up" ref={signOutRef}>
            <SignOut />
            <a href="#" onClick={() => setLogin('sign-in')}>
              Change
            </a>
          </div>
        </CSSTransition>
      </s.Container>
    </Modal>
  )
}

export default Login
