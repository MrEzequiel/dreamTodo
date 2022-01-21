import React, { useRef } from 'react'

import * as s from './style'

interface IModalProps {
  size?: string
  setCloseModal?: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<IModalProps> = ({ size, children, setCloseModal }) => {
  const contentRef = useRef<HTMLDivElement>(null)

  function handleClickModal({ target }: any) {
    if (!contentRef.current?.contains(target) && setCloseModal) {
      setCloseModal(false)
    }
  }

  return (
    <s.ModalWrapper onClick={handleClickModal}>
      <s.ModalContent size={size} ref={contentRef}>
        {children}
      </s.ModalContent>
    </s.ModalWrapper>
  )
}

export default Modal
