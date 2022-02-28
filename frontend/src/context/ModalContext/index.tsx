import { createContext, useContext } from 'react'

interface IModalContext {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  login: 'sign-in' | 'sign-up'
  setLogin: React.Dispatch<React.SetStateAction<'sign-in' | 'sign-up'>>
}

export const ModalContext = createContext({} as IModalContext)

export const useModalContext = () => {
  const context = useContext(ModalContext)

  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider')
  }

  return context
}
