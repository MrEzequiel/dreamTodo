import { memo, useContext, useState } from 'react'
import { TodoListContext } from '../../context/TodoListContext'
import Dropdown from './Dropdown'

import * as s from './style'

function Todo({ todo }) {
  const { dispatch, ACTIONS } = useContext(TodoListContext)
  const [toggle, setToggle] = useState(todo.complete)

  function handleChangeForComplete() {
    dispatch({ types: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
    setToggle(prev => !prev)
  }

  return (
    <s.TodoWrapper>
      <s.InputCheckboxTodo>
        <input
          type="checkbox"
          onChange={handleChangeForComplete}
          checked={toggle}
        />
      </s.InputCheckboxTodo>

      <p style={{ textDecoration: toggle ? 'line-through' : 'none' }}>
        {todo.name}
      </p>

      <Dropdown todo={todo} />
    </s.TodoWrapper>
  )
}

export default memo(Todo)
