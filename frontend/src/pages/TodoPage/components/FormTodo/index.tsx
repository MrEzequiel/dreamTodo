import React, { useRef, useState, useContext, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Modal from '../../../../components/Modal'
import { TodoContext } from '../../../../context/TodoListContext'
import TodoPageContext from '../../../../context/TodoPageContext'
import { Types } from '../../../../functions/reducers'
import { postTodo } from '../../../../functions/Todo/postTodo'
import ITodo from '../../../../interfaces/Todo'
import ModalForm from './ModalForm'

import * as s from './styles'

interface FormTodoProps {
  id: string
}

const FormTodo: React.FC<FormTodoProps> = ({ id }) => {
  const queryClient = useQueryClient()
  const inputEl = useRef<HTMLInputElement>(null)

  const [name, setName] = useState('')
  const [focus, setFocus] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const { mutate: mutatePostTodo } = useMutation(postTodo, {
    onSuccess: (data: ITodo) => {
      setName('')
      inputEl.current?.focus()

      queryClient.getQueryData(['todo', id])
    }
  })

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if (!name.trim()) return

    mutatePostTodo({
      idCollection: id,
      name
    })
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

      {/* <ModalForm closeModal={setOpenModal} modalIsOpen={openModal} type="add" /> */}
    </s.FormWrapper>
  )
}

export default FormTodo
