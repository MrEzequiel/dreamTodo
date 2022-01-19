import React, {
  memo,
  useEffect,
  useRef,
  useState,
  useContext,
  useCallback
} from 'react'
import { FaAngleDown, FaLink } from 'react-icons/fa'
import Dropdown from './Dropdown'

import * as s from './style'
import Modal from '../FormTodo/Modal'
import { TodoContext } from '../../../../context/TodoListContext'
import { Types } from '../../../../functions/reducers'
import ITodo from '../../../../interfaces/Todo'
import { useParams } from 'react-router-dom'

interface Props {
  todo: ITodo
}

const Todo: React.FC<Props> = ({ todo }) => {
  const { id } = useParams()
  const inputEl = useRef<HTMLInputElement>(null)
  const { dispatch } = useContext(TodoContext)

  const [toggle, setToggle] = useState(todo.complete)

  const [hasEdit, setHasEdit] = useState(false)
  const [modal, setModal] = useState(false)
  const [edit, setEdit] = useState(todo.name)
  const [expended, setExpended] = useState(false)

  const expendedTodo = useCallback(() => {
    return !!todo.description || !!todo.expanded
  }, [todo.description, todo.expanded])

  function handleChangeForComplete() {
    if (!id) return
    dispatch({
      type: Types.Toggle,
      payload: { id_collection: id, id: todo.id }
    })
    setToggle(prev => !prev)
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEdit(e.target.value)
  }

  function handleBlurInput() {
    if (!edit.trim()) {
      setEdit(todo.name)
    } else if (id) {
      dispatch({
        type: Types.Edit,
        payload: {
          id_collection: id,
          id: todo.id,
          name: edit,
          description: undefined,
          expanded: undefined
        }
      })
    }
    setHasEdit(false)
  }

  function formateLinks(links: string[]) {
    const htmlLink = links.map(link => {
      let newLink: any = link.split(/https?:\/\//g)
      newLink = newLink[0] === '' ? newLink[1] : newLink[0]
      link = `https://${newLink}`

      newLink = newLink.split('www.')
      newLink = newLink[0] === '' ? newLink[1] : newLink[0]
      newLink = newLink.split('.')[0]

      return { link, name: newLink }
    })

    return htmlLink.map(({ link, name }) => (
      <a href={link} key={link} target="_blank" rel="noreferrer">
        <FaLink />
        {name}
      </a>
    ))
  }

  useEffect(() => {
    if (!hasEdit) return

    if (expendedTodo()) {
      setModal(true)
    } else {
      inputEl.current?.focus()
    }
  }, [hasEdit, expendedTodo])

  return (
    <>
      <s.TodoWrapper edit={hasEdit && !expendedTodo()} expended={expended}>
        <s.InputCheckboxTodo>
          <input
            type="checkbox"
            onChange={handleChangeForComplete}
            checked={toggle}
          />
        </s.InputCheckboxTodo>

        {hasEdit && !expendedTodo() ? (
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

        {modal && (
          <Modal
            closeModal={setModal}
            type="edit"
            todo={todo}
            setEdit={setHasEdit}
          />
        )}

        <s.ButtonsControl>
          <Dropdown todo={todo} setHasEdit={setHasEdit} />

          {expendedTodo() && (
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
          <p>
            {todo.description?.split('\n').map(description => (
              <>
                {description}
                <br />
              </>
            ))}
          </p>

          {!!todo.expanded?.links && (
            <s.LinksWrapper>{formateLinks(todo.expanded.links)}</s.LinksWrapper>
          )}
        </s.ExpendedTodo>
      )}
    </>
  )
}

export default memo(Todo)
