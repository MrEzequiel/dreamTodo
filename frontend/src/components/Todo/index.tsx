import React, { memo, useEffect, useRef, useState, useContext } from 'react'
import { ITodo, TodoContext } from '../../context/TodoListContext'
import { FaAngleDown, FaLink } from 'react-icons/fa'
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

  function formateLinks(links: string[]) {
    const htmlLink = links.map(link => {
      if (link.match(/https?:\/\/www./g)) {
        const name = link.split(/https?:\/\/www./g)[1].split('.')[0]
        return { link, name }
      } else {
        let newLink: string[] | string = link.split(/https?:\/\//g)

        if (newLink[1]) {
          newLink = newLink[1].split('www.')[0]
        } else newLink = newLink[1]

        const name = newLink.split('.')[0]
        newLink = `https://www.${newLink}`

        return { link: newLink, name }
      }
    })

    return htmlLink.map(({ link, name }) => (
      <a href={link} key={link} target="_blank" rel="noreferrer">
        <FaLink />
        {name}
      </a>
    ))
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
              <FaAngleDown
                size={16}
                style={{ transform: expended ? 'rotate(180deg)' : 'rotate(0)' }}
              />
            </button>
          )}
        </s.ButtonsControl>
      </s.TodoWrapper>

      {expended && (
        <s.ExpendedTodo>
          <p>{todo.description}</p>

          {!!todo.expanded?.links && (
            <s.LinksWrapper>{formateLinks(todo.expanded.links)}</s.LinksWrapper>
          )}
        </s.ExpendedTodo>
      )}
    </>
  )
}

export default memo(Todo)
