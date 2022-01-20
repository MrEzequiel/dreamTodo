import React from 'react'
import ButtonStyle from './ButtonStyle'

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  outlined?: boolean
}

const Button: React.FC<IButtonProps> = ({
  outlined = false,
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
