import React, { memo, useEffect, useRef, useState, useContext } from 'react'
import { ITodo, TodoContext } from '../../context/TodoListContext'
import { FaAngleDown } from 'react-icons/fa'
import { Types } from '../../functions/reducers'
import Dropdown from './Dropdown'

import * as s from './style'
import { link } from 'fs'

interface Props {
  todo: ITodo
}

const Todo: React.FC<Props> = ({ todo }) => {
  const inputEl = useRef<HTMLInputElement>(null)
  const { dispatch } = useContext(TodoContext)

  const [toggle, setToggle] = useState(todo.complete)

  const [hasEdit, setHasEdit] = useState(false)
  const [edit, setEdit] = useState(todo.name)
  const [expended, setExpended] = useState(false)

  function handleChangeForComplete() {
    dispatch({ type: Types.Toggle, payload: { id: todo.id } })
    setToggle(prev => !prev)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEdit(e.target.value)
  }

  function handleBlurInput() {
    if (!edit.trim()) {
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
    <>
      <s.TodoWrapper edit={hasEdit} expended={expended}>
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

        <s.ButtonsControl>
          <Dropdown todo={todo} setHasEdit={setHasEdit} />

          {(!!todo.description || !!todo.expanded) && (
            <button
              type="button"
              className="extended"
              onClick={() => setExpended(prev => !prev)}
            >
              <FaAngleDown size={16} />
            </button>
          )}
        </s.ButtonsControl>
      </s.TodoWrapper>

      {expended && (
        <s.ExpendedTodo>
          <p>{todo.description}</p>

          {todo.expanded?.links && (
            <s.LinksWrapper>
              {todo.expanded?.links.map(link => (
                <a href={link} key={link}>
                  {link}
                </a>
              ))}
            </s.LinksWrapper>
          )}
        </s.ExpendedTodo>
      )}
    </>
  )
}

export default memo(Todo)
