import React, { useState } from 'react'
import { FaGoogle } from 'react-icons/fa'
import Button from '../../../styles/Button'
import Title from '../../../styles/Title'
import Modal from '../../Modal'

import * as s from './style'

interface IProps {
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalEntry: React.FC<IProps> = ({ setModal }) => {
  return (
    <Modal size="min(400px, 80%)" setCloseModal={setModal}>
      <Title size="2.8rem" separator>
        Login
      </Title>

      <s.FormStyle>
        <Button className="sign-google">
          <FaGoogle />
          Sign in with Google
        </Button>

        <s.Separator>or</s.Separator>

        <s.InputStyle type="text" placeholder="Email" />
        <s.InputStyle type="password" placeholder="Password" />
        <div className="">
          <p>
            <a href="#">Dont have an account?</a>
          </p>
          <p>
            <a href="#">I forgot my password</a>
          </p>
        </div>

        <Button>Sign in</Button>
      </s.FormStyle>
    </Modal>
  )
}

export default ModalEntry
