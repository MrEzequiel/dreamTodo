import { useRef, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import * as s from './styles'

function FormTodo() {
  const inputEl = useRef()
  const [name, setName] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setName('')
    inputEl.current.focus()
  }

  return (
    <s.FormWrapper onSubmit={handleSubmit}>
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
    </s.FormWrapper>
  )
}

export default FormTodo
