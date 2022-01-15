import React from 'react'

import * as s from './style'

interface Props {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<Props> = ({ closeModal }) => {
  
  return (
    <s.ModalWrapper>
      <s.ModalContent>
        <h2>Add a task</h2>

        <s.FormAddTodo>
          <input type="text" placeholder='Title *'/>

          <input type="text" placeholder='Description' className='description'/>

          <div className="links">
            <input type="text" placeholder='Links'/>
            <p>Separate links with ; (semicolon)</p>
          </div>

          <s.ButtonsModal>
            <button type='submit' className='add'>Add</button>
            <button type='button' className="cancel" onClick={() => closeModal(false)}>Cancel</button>
          </s.ButtonsModal>
        </s.FormAddTodo>
      </s.ModalContent>
    </s.ModalWrapper>
  )
}

export default Modal
