import React, { useRef, useState, useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import { TodoContext } from '../../context/TodoListContext'
import { Types } from '../../functions/reducers'
import Modal from './Modal'

import * as s from './styles'

const FormTodo: React.FC = () => {
  const contextTodo = useContext(TodoContext)
  const inputEl = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [focus, setFocus] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if (!name.trim()) return

    contextTodo.dispatch({
      type: Types.Add,
      payload: { name, description: undefined, expanded: undefined }
    })
    setName('')
    inputEl.current?.focus()
  }

  return (
    <s.FormWrapper>
      <s.FormStyle onSubmit={handleSubmit}>
        <s.InputStyle
          ref={inputEl}
          type="text"
          value={name}
          placeholder="add a task"
          onChange={e => {
            setName(e.target.value)
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 200)}
        />
        <s.ButtonStyle type="submit">
          <FaPlus />
        </s.ButtonStyle>
      </s.FormStyle>

      {focus && (
        <s.MoreInformation onClick={() => setOpenModal(true)}>
          More information
        </s.MoreInformation>
      )}

      {openModal && <Modal closeModal={setOpenModal} type="add" />}
    </s.FormWrapper>
  )
}

export default FormTodo
