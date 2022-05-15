import React, { ButtonHTMLAttributes, useEffect, useRef, useState } from 'react'
import ButtonStyle from './ButtonStyle'
import { VscLoading } from 'react-icons/vsc'
import { CSSTransition } from 'react-transition-group'

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
  const loadingRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [wave, setWave] = useState(false)
  const [animationIsFinished, setAnimationIsFinished] = useState(true)

  useEffect(() => {
    if (loading) {
      setAnimationIsFinished(false)
    }
  }, [loading])

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
      style={{
        width:
          !animationIsFinished && buttonRef.current
            ? `${buttonRef.current.offsetWidth}px`
            : 'auto',
        ...props.style
      }}
      ref={buttonRef}
    >
      <CSSTransition
        in={loading}
        timeout={500}
        classNames="fade"
        unmountOnExit
        nodeRef={loadingRef}
        onExited={() => setAnimationIsFinished(true)}
      >
        <div className="svg-container" ref={loadingRef}>
          <VscLoading className="loading-indicator" />
        </div>
      </CSSTransition>

      {animationIsFinished && children}

      <span className="wave" />
    </ButtonStyle>
  )
}

export default Button
