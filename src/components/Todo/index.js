import { memo } from 'react'
import { FaCheck } from 'react-icons/fa'
import * as s from './style'

function Todo({ todo }) {
  return (
    <s.TodoWrapper>
      <s.InputCheckboxTodo>
        <input type="checkbox" />
        <FaCheck size={12} />
      </s.InputCheckboxTodo>

      <p>{todo.name}</p>
    </s.TodoWrapper>
  )
}

export default memo(Todo)
