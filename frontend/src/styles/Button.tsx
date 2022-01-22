import React from 'react'
import ButtonStyle from './ButtonStyle'

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  outlined?: boolean
  type?: string
}

const Button: React.FC<IButtonProps> = ({
  outlined = false,
  type = 'button',
  children,
  ...props
}) => {
  return (
    <ButtonStyle outlined={outlined} {...props}>
      {children}
    </ButtonStyle>
  )
}

export default Button
