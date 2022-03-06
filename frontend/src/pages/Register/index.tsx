import React, { useEffect, useRef, useState } from 'react'
import { useUser } from '../../context/UserContext'
import SignIn from './SignIn'
import SignUp from './SignUp'

import {
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams
} from 'react-router-dom'

import {
  AnimationWrapper,
  LoadingLoginWithGoogle,
  RegisterContent,
  RegisterCover,
  RegisterFormContainer,
  ResgisterContainer
} from './style'

import Title from '../../styles/Title'
import dreamTodoLogo from '../../assets/logo.svg'
import { FaGoogle } from 'react-icons/fa'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

function formateLogin(text: string) {
  return text.split('-')[1]
}

const Register: React.FC = () => {
  // router definitions
  const { isUser } = useUser()
  const param = useParams()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (isUser) navigate('/collection')

    if (!Object.values(param)[0]) {
      navigate('signin')
    }
  }, [isUser, navigate, param])

  const [loadingPopUpGoogle, setLoadingPopUpGoogle] = useState(false)

  // refs for animation
  const containerRef = useRef<HTMLDivElement | null>(null)

  const [login, setLogin] = useState<'sign-in' | 'sign-up'>('sign-in')
  const [menuHeight, setMenuHeight] = useState<number | undefined>(undefined)

  useEffect(() => {
    if (login === 'sign-in') {
      navigate('signin')
    } else {
      navigate('signup')
    }
  }, [login, navigate])

  return (
    <RegisterCover>
      <ResgisterContainer>
        <img src={dreamTodoLogo} alt="dreamTodo logo" width={200} />

        <RegisterFormContainer>
          {loadingPopUpGoogle && (
            <LoadingLoginWithGoogle>
              <div>
                <FaGoogle fontSize={30} />
                <h3>Popup open in another tab</h3>
              </div>
            </LoadingLoginWithGoogle>
          )}

          <RegisterContent>
            <Title size="2.8rem" separator style={{ marginBottom: '20px' }}>
              Sign {formateLogin(login)}
            </Title>

            <AnimationWrapper
              style={{ maxHeight: menuHeight ?? 'auto' }}
              ref={containerRef}
            >
              <TransitionGroup>
                <CSSTransition
                  key={location.key}
                  classNames="fade"
                  timeout={700}
                >
                  <Routes>
                    <Route
                      path="/signin"
                      element={
                        <SignIn
                          login={login}
                          setLogin={setLogin}
                          setMenuHeight={setMenuHeight}
                          setLoadingPopUpGoogle={setLoadingPopUpGoogle}
                        />
                      }
                    />

                    <Route
                      path="/signup"
                      element={
                        <SignUp
                          login={login}
                          setLogin={setLogin}
                          setMenuHeight={setMenuHeight}
                          setLoadingPopUpGoogle={setLoadingPopUpGoogle}
                        />
                      }
                    />
                  </Routes>
                </CSSTransition>
              </TransitionGroup>
            </AnimationWrapper>
          </RegisterContent>
        </RegisterFormContainer>
      </ResgisterContainer>
    </RegisterCover>
  )
}

export default Register
