import React, { useRef, useState, useContext, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Modal from '../../../../components/Modal'
import { TodoContext } from '../../../../context/TodoListContext'
import TodoPageContext from '../../../../context/TodoPageContext'
import { Types } from '../../../../functions/reducers'
import ModalForm from './ModalForm'

import * as s from './styles'

const FormTodo: React.FC = () => {
  const { id } = useContext(TodoPageContext)
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
      payload: {
        id_collection: id,
        name,
        description: undefined,
        expanded: undefined
      }
    })

    setName('')
    inputEl.current?.focus()
  }

  useEffect(() => () => setOpenModal(false), [])

  return (
    <s.FormWrapper>
      <s.FormStyle onSubmit={handleSubmit} inFocus={focus}>
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

      <ModalForm closeModal={setOpenModal} modalIsOpen={openModal} type="add" />
    </s.FormWrapper>
  )
}

export default FormTodo
