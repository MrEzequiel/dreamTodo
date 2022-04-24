import React, { ButtonHTMLAttributes, useEffect, useState } from 'react'
import ButtonStyle from './ButtonStyle'
import { VscLoading } from 'react-icons/vsc'

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  outlined?: boolean
  loading?: boolean
  color?: 'error' | 'primary' | 'secondary'
}

const Button: React.FC<IButtonProps> = ({
  outlined = false,
  loading = false,
  color = 'primary',
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
      isLoading={loading}
      disabled={loading}
      color={color}
    >
      {loading ? <VscLoading className="loading-indicator" /> : children}
      <span className="wave" />
    </ButtonStyle>
  )
}

export default Button
