import React, { useRef, useState, useContext } from 'react'
import { FaPlus } from 'react-icons/fa'
import { TodoContext } from '../../context/TodoListContext'
import { Types } from '../../functions/reducers'

import * as s from './styles'

const FormTodo: React.FC = () => {
  const contextTodo = useContext(TodoContext)
  const inputEl = useRef<HTMLInputElement>(null)
  const [ name, setName ] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    contextTodo.dispatch({ type: Types.Add, payload: { name } })
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
        />
        <s.ButtonStyle type="submit">
          <FaPlus />
        </s.ButtonStyle>
      </s.FormStyle>
    </s.FormWrapper>
  )
}

export default FormTodo
