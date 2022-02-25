import React, { useEffect, useState } from 'react'
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
  const [wave, setWave] = useState(false)

  useEffect(() => {
    if (!wave) return
    const timer = setTimeout(() => {
      setWave(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [wave])

  return (
    <ButtonStyle
      outlined={outlined}
      {...props}
      onMouseDown={() => setWave(true)}
      wave={wave}
    >
      {children}
      <span className="wave"></span>
    </ButtonStyle>
  )
}

export default Button
