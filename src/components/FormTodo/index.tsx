import { useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import useTodo from '../../hooks/useTodo'

import * as s from './styles'

function FormTodo() {
  const inputEl = useRef()
  const [name, setName] = useState('')

  const { dispatch, ACTIONS } = useTodo()

  function handleSubmit(e) {
    e.preventDefault()
    if (!name.trim()) return

    dispatch({ types: ACTIONS.ADD_TODO, payload: { name } })
    setName('')
    inputEl.current.focus()
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
