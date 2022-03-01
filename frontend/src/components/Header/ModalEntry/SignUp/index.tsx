import React, { useEffect, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { FaEye, FaEyeSlash, FaGoogle, FaUpload } from 'react-icons/fa'
import { useModalContext } from '../../../../context/ModalContext'
import { useNotification } from '../../../../context/NotificationContext'
import { useUser } from '../../../../context/UserContext'
import {
  createUser,
  loginWithGoogle
} from '../../../../functions/User/createUser'
import useForm from '../../../../hooks/useForm'
import Button from '../../../../styles/Button'
import CheckboxStyle from '../../../../styles/CheckboxStyle'
import InputStyle, { FileInputStyle } from '../../../../styles/Input'
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
  const [userImage, setUserImage] = useState<{
    file: File | null
    url: string | null
  }>({
    file: null,
    url: null
  })
  const [showPassword, setShowPassword] = useState(false)
  const clientGoogle = process.env.REACT_APP_CLIENT_ID_GOOGLE
  const { createNotification } = useNotification()

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

  const handleUploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setUserImage({ file: null, url: null })
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      const data = reader.result as string
      if (data) {
        setUserImage({
          file,
          url: data
        })
      }
    }

    reader.readAsDataURL(file)
  }

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

    // if (
    //   emailField.isValid ||
    //   passwordField.isValid ||
    //   confirmPasswordField.isValid
    // )
    //   return

    setLoading(true)
    const formData = new FormData()
    formData.append('name', nameField.value)
    formData.append('email', emailField.value)
    formData.append('password', passwordField.value)
    if (userImage.file) formData.append('imageURL', userImage.file)

    createUser(formData)
      .then(res => {
        console.log(res)
        setLogin('sign-in')
        createNotification(
          'success',
          'Account created successfully, please sign in'
        )
      })
      .catch(() => {
        createNotification('error', 'User already exists')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <s.SignUp>
      <FormStyle onSubmit={handleSubmitSignUp}>
        <div className="grid-inputs">
          <FileInputStyle>
            <input type="file" onChange={handleUploadImage} />
            {userImage.url ? (
              <img src={userImage.url} alt="user" />
            ) : (
              <FaUpload />
            )}
          </FileInputStyle>

          <InputStyle
            type="text"
            placeholder="Name (optional)"
            onChange={nameField.handleChange}
            value={nameField.value}
          />
        </div>

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
