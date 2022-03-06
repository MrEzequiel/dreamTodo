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

  const [loding, setLoding] = useState(false)
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

  const handleSuccess = (response: any) => {
    loginWithGoogle(response.tokenId)
      .then(res => {
        signIn({
          user: res.payload,
          token: response.tokenId
        })

        // redirect
        navigate('/collection')
      })
      .catch(err => {
        createNotification('error', 'oops! something went wrong')
      })
      .finally(() => {
        setLoadingPopUpGoogle(false)
      })
  }

  const handleSubmitSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoding(true)
    loginUser(emailField.value, passwordField.value)
      .then(response => {
        signIn(response.token)
        // redirect
        navigate('/collection')
      })
      .catch(err => {
        createNotification('error', `Email or password incorrect`)
      })
      .finally(() => {
        setLoding(false)
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

        <Button outlined={false} type="submit" loading={loding}>
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
