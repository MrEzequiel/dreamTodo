import React, { useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import * as s from './style'

interface IModalProps {
  modalIsOpen: boolean
  setCloseModal: React.Dispatch<React.SetStateAction<boolean>>
  size?: string
  styleModalContent?: React.CSSProperties
  children: React.ReactNode
}

const Modal: React.FC<IModalProps> = ({
  size,
  children,
  modalIsOpen,
  setCloseModal,
  styleModalContent
}) => {
  const contentRef = useRef<HTMLDivElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  function handleClickModal({ target }: any) {
    if (!contentRef.current?.contains(target)) {
      setCloseModal(false)
    }
  }

  return (
    <CSSTransition
      timeout={400}
      nodeRef={modalRef}
      classNames="modal"
      in={modalIsOpen}
      unmountOnExit
    >
      <s.ModalWrapper onMouseDown={handleClickModal} ref={modalRef}>
        <s.ModalContent
          size={size}
          ref={contentRef}
          className="modal-content"
          style={styleModalContent}
        >
          {children}
        </s.ModalContent>
      </s.ModalWrapper>
    </CSSTransition>
  )
}

export default Modal
