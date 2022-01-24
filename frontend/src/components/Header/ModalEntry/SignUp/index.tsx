import React, { useState } from 'react'
import GoogleLogin from 'react-google-login'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import Button from '../../../../styles/Button'
import CheckboxStyle from '../../../../styles/CheckboxStyle'
import InputStyle from '../../../../styles/Input'
import { Actions, FormStyle, Separator } from '../SignIn/style'

import * as s from './style'

interface ISignOut {
  setLogin: React.Dispatch<React.SetStateAction<'sign-in' | 'sign-up'>>
}

const SignOut: React.FC<ISignOut> = ({ setLogin }) => {
  const [showPassword, setShowPassword] = useState(false)
  const clientGoogle = process.env.REACT_APP_CLIENT_ID_GOOGLE

  const handleSuccess = (response: any) => {
    console.log(response)
  }

  return (
    <s.SignUp>
      <FormStyle>
        <InputStyle type="text" placeholder="Name (optional)" />
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
        <InputStyle placeholder="Confirm password" type="password" />

        <div className="terms">
          <CheckboxStyle>
            <input type="checkbox" />
          </CheckboxStyle>
          Accepted the Terms and Conditions
        </div>

        <Button outlined={false} type="submit">
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
