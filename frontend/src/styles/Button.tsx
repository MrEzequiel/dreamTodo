import React, { useEffect, useState } from 'react'
import ButtonStyle from './ButtonStyle'
import { VscLoading } from 'react-icons/vsc'

interface IButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  outlined?: boolean
  loading?: boolean
  type?: string
}

const Button: React.FC<IButtonProps> = ({
  outlined = false,
  loading = false,
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
      isLoading={loading}
      disabled={loading}
    >
      {loading ? <VscLoading className="loading-indicator" /> : children}
      <span className="wave"></span>
    </ButtonStyle>
  )
}

export default Button
