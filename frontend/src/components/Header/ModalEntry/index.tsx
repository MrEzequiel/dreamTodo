import React, { memo, useEffect, useRef, useState } from 'react'
import { CSSTransition, Transition } from 'react-transition-group'
import { ModalContext } from '../../../context/ModalContext'
import Title from '../../../styles/Title'
import Modal from '../../Modal'
import SignIn from './SignIn'
import SignOut from './SignUp'

import * as s from './style'

interface IProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  modalIsOpen: boolean
}

function formateLogin(text: string) {
  return text.split('-')[1]
}

const Login: React.FC<IProps> = ({ setModal, modalIsOpen }) => {
  const [login, setLogin] = useState<'sign-in' | 'sign-up'>('sign-in')
  const [menuHeight, setMenuHeight] = useState<number | undefined>(undefined)
  const [refreshHeight, setRefreshHeight] = useState<boolean>(false)

  const signInRef = useRef<HTMLDivElement | null>(null)
  const signOutRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  /*
    refreshHeight is used to force the height of the menu to be recalculated
    why is this necessary?
    because the height of the menu is calculated based on the height of the
    sign-in and sign-up forms, and the height of the sign-in and sign-up forms
    is dependent on the height of the menu.
    if the height of the menu is not recalculated, the height of the menu will
    be the same as the height of the sign-in and sign-up forms, and the height
    of the sign-in and sign-up forms will be dependent on the height of the menu.
  */
  useEffect(() => {
    if (refreshHeight) {
      if (login === 'sign-in') {
        setMenuHeight(signInRef.current?.offsetHeight)
      } else {
        setMenuHeight(signOutRef.current?.offsetHeight)
      }
      setRefreshHeight(false)
    }
  }, [refreshHeight, login])

  useEffect(() => {
    if (!modalIsOpen) return

    const firstChild = containerRef.current?.firstChild as HTMLDivElement
    setMenuHeight(firstChild.offsetHeight)
  }, [modalIsOpen])

  return (
    <ModalContext.Provider
      value={{ isOpen: modalIsOpen, setIsOpen: setModal, login, setLogin }}
    >
      <Modal
        size="min(380px, 90%)"
        setCloseModal={setModal}
        modalIsOpen={modalIsOpen}
      >
        <Title size="2.8rem" separator style={{ marginBottom: '20px' }}>
          Sign {formateLogin(login)}
        </Title>

        <s.Container
          style={{ maxHeight: menuHeight ?? 'auto' }}
          ref={containerRef}
        >
          <CSSTransition
            in={login === 'sign-in'}
            nodeRef={signInRef}
            timeout={700}
            classNames="sign-in"
            unmountOnExit
            onEnter={() => {
              setMenuHeight(signInRef.current?.offsetHeight)
            }}
          >
            <div className="sign-in" ref={signInRef}>
              <SignIn />
            </div>
          </CSSTransition>

          <CSSTransition
            nodeRef={signOutRef}
            in={login === 'sign-up'}
            timeout={700}
            classNames="sign-up"
            unmountOnExit
            onEnter={() => {
              setMenuHeight(signInRef.current?.offsetHeight)
            }}
          >
            <div className="sign-up" ref={signOutRef}>
              <SignOut setRefreshHeight={setRefreshHeight} />
            </div>
          </CSSTransition>
        </s.Container>
      </Modal>
    </ModalContext.Provider>
  )
}

export default memo(Login)
