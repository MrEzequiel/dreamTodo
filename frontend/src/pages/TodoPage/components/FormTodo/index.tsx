import React, { useRef, useState, useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { TodoContext } from '../../../../context/TodoListContext'
import { Types } from '../../../../functions/reducers'
import ModalForm from './Modal'

import * as s from './styles'

const FormTodo: React.FC = () => {
  const { id } = useParams()
  const contextTodo = useContext(TodoContext)
  const inputEl = useRef<HTMLInputElement>(null)
  const [name, setName] = useState('')
  const [focus, setFocus] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if (!name.trim()) return

    // i hate TS
    if (id) {
      contextTodo.dispatch({
        type: Types.Add,
        payload: {
          id_collection: id,
          name,
          description: undefined,
          expanded: undefined
        }
      })
    }

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

      {openModal && <ModalForm closeModal={setOpenModal} type="add" />}
    </s.FormWrapper>
  )
}

export default FormTodo
