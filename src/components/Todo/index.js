import { memo } from 'react'
import * as s from './style'

function Todo({ todo }) {
  function handleChangeForComplete() {}

  return (
    <s.TodoWrapper>
      <s.InputCheckboxTodo>
        <input type="checkbox" onChange={handleChangeForComplete} />
      </s.InputCheckboxTodo>

      <p>{todo.name}</p>
    </s.TodoWrapper>
  )
}

export default memo(Todo)
