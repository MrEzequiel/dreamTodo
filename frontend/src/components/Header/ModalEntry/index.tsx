import React, { useState } from 'react'
import { FaEye, FaEyeSlash, FaGoogle } from 'react-icons/fa'
import Button from '../../../styles/Button'
import Title from '../../../styles/Title'
import Modal from '../../Modal'

import * as s from './style'

interface IProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalEntry: React.FC<IProps> = ({ setModal }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Modal size="min(380px, 90%)" setCloseModal={setModal}>
      <s.Container>
        <Title size="2.8rem" separator>
          Sign in to dreamTodo
        </Title>

        <s.FormStyle>
          <s.InputStyle type="text" placeholder="Email" />
          <label>
            <s.InputStyle
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </label>

          <Button outlined={false} type="submit">
            Sign in
          </Button>
        </s.FormStyle>

        <s.Separator>or</s.Separator>

        <Button type="button" className="sign-google">
          <FaGoogle />
          Sign in with Google
        </Button>

        <div className="actions">
          <p>
            <a href="#">
              Dont have an <strong>account?</strong>
            </a>
          </p>
          <p>
            <a href="#">
              I <strong>forgot</strong> my password
            </a>
          </p>
        </div>
      </s.Container>
    </Modal>
  )
}

export default ModalEntry
