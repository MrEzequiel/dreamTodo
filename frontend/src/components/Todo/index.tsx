import React, { memo, useEffect, useRef, useState, useContext } from 'react'
import { ITodo, TodoContext } from '../../context/TodoListContext'
import { Types } from '../../functions/reducers'
import Dropdown from './Dropdown'

import * as s from './style'

interface Props {
  todo: ITodo
}

const Todo: React.FC<Props> = ({ todo }) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const { dispatch } = useContext(TodoContext)

  const [toggle, setToggle] = useState(todo.complete)

  const [hasEdit, setHasEdit] = useState(false)
  const [edit, setEdit] = useState(todo.name)

  function handleChangeForComplete() {
    dispatch({ type: Types.Toggle, payload: { id: todo.id } })
    setToggle(prev => !prev)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEdit(e.target.value)
  }

  function handleBlurInput() {
    if(!edit.trim()) {
      setEdit(todo.name)
    } else {
      dispatch({ type: Types.Edit, payload: { id: todo.id, name: edit } })
    }
    setHasEdit(false)
  }

  useEffect(() => {
    if (hasEdit) inputEl.current?.focus()
  }, [hasEdit])

  return (
    <s.TodoWrapper edit={hasEdit}>
      <s.InputCheckboxTodo>
        <input
          type="checkbox"
          onChange={handleChangeForComplete}
          checked={toggle}
        />
      </s.InputCheckboxTodo>

      {hasEdit ? (
        <s.InputEditTodo
          type="text"
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
