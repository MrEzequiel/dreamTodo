import { memo, useEffect, useRef, useState } from 'react'
import useTodo from '../../hooks/useTodo'
import Dropdown from './Dropdown'

import * as s from './style'

function Todo({ todo }) {
  const inputEl = useRef()
  const { dispatch, ACTIONS } = useTodo()
  const [toggle, setToggle] = useState(todo.complete)

  const [hasEdit, setHasEdit] = useState(false)
  const [edit, setEdit] = useState(todo.name)

  function handleChangeForComplete() {
    dispatch({ types: ACTIONS.TOGGLE_TODO, payload: { id: todo.id } })
    setToggle(prev => !prev)
  }

  function handleChange(e) {
    setEdit(e.target.value)
  }

  function handleBlurInput() {
    dispatch({ types: ACTIONS.EDIT_TODO, payload: { id: todo.id, name: edit } })
    setHasEdit(false)
  }

  useEffect(() => {
    if (hasEdit) inputEl.current?.focus()
  }, [hasEdit])

  return (
    <s.TodoWrapper>
      <s.InputCheckboxTodo>
        <input
          type="checkbox"
          onChange={handleChangeForComplete}
          checked={toggle}
        />
      </s.InputCheckboxTodo>

      {hasEdit ? (
        <s.InputEditTodo
          value={edit}
          onChange={handleChange}
          ref={inputEl}
          onBlur={handleBlurInput}
        />
      ) : (
        <p style={{ textDecoration: toggle ? 'line-through' : 'none' }}>
          {todo.name}
        </p>
      )}

      <Dropdown todo={todo} setHasEdit={setHasEdit} />
    </s.TodoWrapper>
  )
}

export default memo(Todo)
