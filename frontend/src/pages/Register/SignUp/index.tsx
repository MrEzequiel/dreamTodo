import React, { useEffect, useRef, useState } from 'react'
import { useNotification } from '../../../context/NotificationContext'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/UserContext'
import useForm from '../../../hooks/useForm'

import GoogleLogin from 'react-google-login'
import { createUser, loginWithGoogle } from '../../../functions/User/createUser'

import * as s from './style'
import Button from '../../../styles/Button'
import InputStyle, { FileInputStyle } from '../../../styles/Input'
import { Actions, FormStyle, Separator } from '../SignIn/style'
import { FaEye, FaEyeSlash, FaGoogle, FaUpload } from 'react-icons/fa'
import { useMutation } from 'react-query'

// utils functions
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

interface ISignUpProps {
  setLogin: React.Dispatch<
    React.SetStateAction<'sign-in' | 'sign-up' | 'forgot-password'>
  >
  setLoadingPopUpGoogle: React.Dispatch<React.SetStateAction<boolean>>
}

const SignUp: React.FC<ISignUpProps> = ({
  setLogin,
  setLoadingPopUpGoogle
}) => {
  const signUpRef = useRef<HTMLDivElement | null>(null)

  const { signIn } = useAuth()
  const navigate = useNavigate()
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

  const handleFailureLoginWithGoogle = (error: any) => {
    if (error.error === 'popup_closed_by_user') {
      createNotification('error', 'You have not authorized access to Google')
    }
    setLoadingPopUpGoogle(false)
  }

  const createUserFn = () => {
    const formData = new FormData()
    formData.append('name', nameField.value)
    formData.append('email', emailField.value)
    formData.append('password', passwordField.value)
    if (userImage.file) formData.append('imageURL', userImage.file)

    return createUser(formData)
  }

  const handleSuccess = (response: any) => {
    loginWithGoogle(response.tokenId)
      .then(res => {
        signIn({
          user: res.payload,
          token: response.tokenId
        })
        // redirect to home
        navigate('/')
      })
      .catch((err: any) => {
        if (err?.response?.status === 400) {
          createNotification('error', 'oops! Email is already in use.')
        } else {
          createNotification('error', 'oops! something went wrong')
        }
      })
      .finally(() => {
        setLoadingPopUpGoogle(false)
      })
  }

  const { mutate: mutateCreteUser, isLoading } = useMutation(createUserFn, {
    onSuccess: () => {
      setLogin('sign-in')
      createNotification(
        'success',
        'Account created successfully, please sign in'
      )
    },
    onError: (error: any) => {
      if (error.response.status === 400) {
        createNotification('error', 'Email already exists')
      } else {
        createNotification('error', 'oops! Email is already in use.')
      }
    }
  })

  const handleSubmitSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (
      !emailField.isValid ||
      !passwordField.isValid ||
      !confirmPasswordField.isValid
    ) {
      return
    }

    mutateCreteUser()
  }

  return (
    <s.SignUp ref={signUpRef}>
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

        <Button outlined={false} type="submit" loading={isLoading}>
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
            onFailure={handleFailureLoginWithGoogle}
            onRequest={() => setLoadingPopUpGoogle(true)}
            className="google-login"
          />
        </div>
      )}

      <Actions>
        <p>
          <a
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

export default SignUp
