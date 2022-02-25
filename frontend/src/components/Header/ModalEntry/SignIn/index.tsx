import React, { useCallback, useState } from 'react'
import GoogleLogin from 'react-google-login'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import Button from '../../../../styles/Button'
import InputStyle from '../../../../styles/Input'

import * as s from './style'

interface ISignIn {
  setLogin: React.Dispatch<React.SetStateAction<'sign-in' | 'sign-up'>>
}

const SignIn: React.FC<ISignIn> = ({ setLogin }) => {
  const [showPassword, setShowPassword] = useState(false)
  const clientGoogle = process.env.REACT_APP_CLIENT_ID_GOOGLE

  const handleSuccess = (response: any) => {
    console.log(response)
  }

  return (
    <s.SignIn>
      <s.FormStyle>
        <InputStyle type="text" placeholder="Email" />
        <label>
          <InputStyle
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
          />
          <button type="button" onClick={() => setShowPassword(prev => !prev)}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </label>

        <Button outlined={false} type="submit">
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
