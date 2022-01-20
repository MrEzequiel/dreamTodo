import React from 'react'

import * as s from './style'

interface IModalProps {}

const Modal: React.FC<IModalProps> = ({ children }) => {
  return (
    <s.ModalWrapper>
      <s.ModalContent>{children}</s.ModalContent>
    </s.ModalWrapper>
  )
}

export default Modal
