import React, { useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import { useModalContext } from '../../../../context/ModalContext'
import { useUser } from '../../../../context/UserContext'
import {
  createUser,
  loginWithGoogle
} from '../../../../functions/User/createUser'
import useForm from '../../../../hooks/useForm'
import Button from '../../../../styles/Button'
import CheckboxStyle from '../../../../styles/CheckboxStyle'
import InputStyle from '../../../../styles/Input'
import { Actions, FormStyle, Separator } from '../SignIn/style'

import * as s from './style'

const passwordValidation = (value: string) => {
  if (!value.trim()) return 'Password is required'

  if (value.length < 6) {
    return 'Password must be at least 6 characters'
  } else if (value.length > 20) {
    return 'Password must be less than 20 characters'
  }

  return null
}

const confirmPasswordValidation = (value: string, password: string) => {
  if (passwordValidation(password)) return null
  if (!value.trim()) return 'Confirm password is required'

  if (value !== password) {
    return 'Confirm password must match password'
  }

  return null
}

interface ISignOut {
  setRefreshHeight: React.Dispatch<React.SetStateAction<boolean>>
}

const SignOut: React.FC<ISignOut> = ({ setRefreshHeight }) => {
  const { setLogin } = useModalContext()
  const { signIn } = useUser()
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const clientGoogle = process.env.REACT_APP_CLIENT_ID_GOOGLE

  const emailField = useForm({ type: 'email' })
  const nameField = useForm({ required: false })
  const passwordField = useForm({ customValidate: passwordValidation })
  const confirmPasswordField = useForm({
    customValidate: (value: string) => {
      return confirmPasswordValidation(value, passwordField.value)
    }
  })

  useEffect(() => {
    setRefreshHeight(true)
  }, [
    setRefreshHeight,
    passwordField.isValid,
    confirmPasswordField.isValid,
    emailField.isValid
  ])

  const handleSuccess = (response: any) => {
    loginWithGoogle(response.tokenId).then(res => {
      signIn({
        ...res.payload,
        token: response.tokenId
      })
    })
  }

  const handleSubmitSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as any
    const file = form.firstChild as any

    // if (
    //   emailField.isValid ||
    //   passwordField.isValid ||
    //   confirmPasswordField.isValid
    // )
    //   return

    console.log(file.files[0])

    setLoading(true)
    const formData = new FormData()
    formData.append('name', nameField.value)
    formData.append('email', emailField.value)
    formData.append('password', passwordField.value)
    formData.append('imageURL', file.files[0])

    createUser(formData)
      .then(res => {
        console.log(res)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <s.SignUp>
      <FormStyle onSubmit={handleSubmitSignUp}>
        <InputStyle type="file" />

        <InputStyle
          type="text"
          placeholder="Name (optional)"
          onChange={nameField.handleChange}
          value={nameField.value}
        />

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

        <div>
          <InputStyle
            placeholder="Confirm password"
            type="password"
            onChange={confirmPasswordField.handleChange}
            onBlur={confirmPasswordField.handleBlur}
            value={confirmPasswordField.value}
            isValid={confirmPasswordField.isValid}
          />

          {confirmPasswordField.error && (
            <s.MessageError>{confirmPasswordField.error}</s.MessageError>
          )}
        </div>

        <div className="terms">
          <CheckboxStyle>
            <input type="checkbox" />
          </CheckboxStyle>
          Accepted the Terms and Conditions
        </div>

        <Button outlined={false} type="submit" loading={loading}>
          Sign Up
        </Button>
      </FormStyle>

      <Separator>or</Separator>

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

      <Actions>
        <p>
          <a
            href="#"
            onClick={e => {
              e.preventDefault()
              setLogin('sign-in')
            }}
          >
            Already have an <strong>account?</strong>
          </a>
        </p>
      </Actions>
    </s.SignUp>
  )
}

export default SignOut
