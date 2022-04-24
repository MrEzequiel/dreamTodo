import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useNotification } from '../../../context/NotificationContext'
import { loginWithGoogle } from '../../../functions/User/createUser'
import { useUser } from '../../../context/UserContext'

import { loginUser } from '../../../functions/User/loginUser'

import useForm from '../../../hooks/useForm'
import GoogleLogin from 'react-google-login'

import * as s from './style'
import Button from '../../../styles/Button'
import InputStyle from '../../../styles/Input'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { useMutation, useQuery } from 'react-query'

interface ISignInProps {
  login: 'sign-in' | 'sign-up'
  setLogin: React.Dispatch<React.SetStateAction<'sign-in' | 'sign-up'>>
  setMenuHeight: React.Dispatch<React.SetStateAction<number | undefined>>
  setLoadingPopUpGoogle: React.Dispatch<React.SetStateAction<boolean>>
}

const SignIn: React.FC<ISignInProps> = ({
  login,
  setLogin,
  setMenuHeight,
  setLoadingPopUpGoogle
}) => {
  const signInRef = useRef<HTMLDivElement | null>(null)

  const { createNotification } = useNotification()
  const { signIn } = useUser()
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false)
  const clientGoogle = process.env.REACT_APP_CLIENT_ID_GOOGLE
  const emailField = useForm({ type: 'email' })
  const passwordField = useForm()

  const handleFailureLoginWithGoogle = (error: any) => {
    if (error.error === 'popup_closed_by_user') {
      createNotification('error', 'You have not authorized access to Google')
    }
    setLoadingPopUpGoogle(false)
  }

  const {
    data: loginRes,
    isError,
    mutate
  } = useMutation('loginWithGoogle', (token: string) => {
    return loginWithGoogle(token)
  })

  useEffect(() => {
    if (!loginRes) return

    signIn({
      user: loginRes.payload,
      token: loginRes.tokenId
    })

    navigate('/collection')
  }, [loginRes, signIn, navigate])

  useEffect(() => {
    if (isError) {
      createNotification('error', 'oops! something went wrong')
    }
  }, [isError, createNotification])

  const handleSuccess = (response: any) => {
    mutate(response.tokenId)
  }

  const { mutate: mutateLogin, isLoading: loginLoading } = useMutation(
    async (data: { email: string; password: string }) => {
      return await loginUser(data.email, data.password)
    },
    {
      onSuccess: data => {
        signIn(data.token)
        navigate('/collection')
      },

      onError: (err: any) => {
        if (err?.response?.status === 400) {
          createNotification('error', 'Invalid email or password')
        } else {
          createNotification('error', 'oops! something went wrong')
        }
      }
    }
  )

  const handleSubmitSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    mutateLogin({
      email: emailField.value,
      password: passwordField.value
    })
  }

  useEffect(() => {
    if (login === 'sign-in') {
      setMenuHeight(signInRef.current?.clientHeight)
    }
  }, [login, setMenuHeight, passwordField.isValid, emailField.isValid])

  return (
    <s.SignIn ref={signInRef}>
      <s.FormStyle onSubmit={handleSubmitSignIn}>
        <div>
          <InputStyle
            type="text"
            placeholder="Email"
            onChange={emailField.handleChange}
            onBlur={emailField.handleBlur}
            value={emailField.value}
            isValid={emailField.isValid}
          />
          {emailField.error && (
            <s.MessageError>{emailField.error}</s.MessageError>
          )}
        </div>
        <label>
          <InputStyle
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            onChange={passwordField.handleChange}
            onBlur={passwordField.handleBlur}
            value={passwordField.value}
            isValid={passwordField.isValid}
          />
          <button type="button" onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

          {passwordField.error && (
            <s.MessageError>{passwordField.error}</s.MessageError>
          )}
        </label>

        <Button outlined={false} type="submit" loading={loginLoading}>
          Sign in
        </Button>
      </s.FormStyle>

      <s.Separator>or</s.Separator>

      <Button
        type="button"
        className="sign-google"
        onClick={() =>
          document.querySelector<HTMLButtonElement>('.google-login')?.click()
        }
      >
        <FaGoogle />
        Sign in with Google
      </Button>

      {clientGoogle && (
        <div style={{ display: 'none' }}>
          <GoogleLogin
            clientId={clientGoogle}
            onSuccess={handleSuccess}
            onFailure={handleFailureLoginWithGoogle}
            onRequest={() => setLoadingPopUpGoogle(true)}
            className="google-login"
          />
        </div>
      )}

      <s.Actions>
        <p>
          <a
            href="#"
            onClick={e => {
              e.preventDefault()
              setLogin('sign-up')
            }}
          >
            Dont have an <strong>account?</strong>
          </a>
        </p>
        <p>
          <a href="#">
            I <strong>forgot</strong> my password
          </a>
        </p>
      </s.Actions>
    </s.SignIn>
  )
}

export default SignIn
