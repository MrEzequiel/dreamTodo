import React, { useCallback, useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { useModalContext } from '../../../../context/ModalContext'
import { useNotification } from '../../../../context/NotificationContext'
import { loginUser } from '../../../../functions/User/loginUser'
import useForm from '../../../../hooks/useForm'
import Button from '../../../../styles/Button'
import InputStyle from '../../../../styles/Input'
import { MessageError } from '../SignUp/style'

import * as s from './style'

interface ISignIn {
  setRefreshHeight: React.Dispatch<React.SetStateAction<boolean>>
}

const SignIn: React.FC<ISignIn> = ({ setRefreshHeight }) => {
  const { setLogin } = useModalContext()
  const { createNotification } = useNotification()
  const [loding, setLoding] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const clientGoogle = process.env.REACT_APP_CLIENT_ID_GOOGLE
  const emailField = useForm({ type: 'email' })
  const passwordField = useForm()

  const handleSuccess = (response: any) => {
    console.log(response)
  }

  const handleSubmitSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoding(true)
    loginUser(emailField.value, passwordField.value)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        createNotification('error', `Email or password incorrect`)
      })
      .finally(() => {
        setLoding(false)
      })
  }

  useEffect(() => {
    setRefreshHeight(true)
  }, [setRefreshHeight, passwordField.isValid, emailField.isValid])

  return (
    <s.SignIn>
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
          {emailField.error && <MessageError>{emailField.error}</MessageError>}
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
            <MessageError>{passwordField.error}</MessageError>
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
            onFailure={handleSuccess}
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
