import React, { memo, useEffect, useRef, useState, useContext } from 'react'
import { FaAngleDown, FaLink } from 'react-icons/fa'
import Dropdown from '../../../../components/Dropdown'

import * as s from './style'
import { TodoContext } from '../../../../context/TodoListContext'
import { Types } from '../../../../functions/reducers'
import ITodo from '../../../../interfaces/Todo'
import TodoPageContext from '../../../../context/TodoPageContext'
import { MdDragIndicator } from 'react-icons/md'
import { useDrag, useDrop } from 'react-dnd'
import type { Identifier } from 'dnd-core'
import ModalForm from '../FormTodo/ModalForm'
import { getEmptyImage } from 'react-dnd-html5-backend'

interface Props {
  todo: ITodo
  index: number
}

interface DragItem {
  id: number
  index: number
  todo: ITodo
  ref: HTMLLIElement
}

const Todo: React.FC<Props> = ({ todo, index }) => {
  const { id } = useContext(TodoPageContext)
  const inputEl = useRef<HTMLInputElement>(null)
  const dropRef = useRef<HTMLLIElement | null>(null)
  const dragRef = useRef<HTMLButtonElement | null>(null)
  const { dispatch } = useContext(TodoContext)

  const [toggle, setToggle] = useState(todo.complete)

  const [hasEdit, setHasEdit] = useState(false)
  const [modal, setModal] = useState(false)
  const [edit, setEdit] = useState(todo.name)
  const [expended, setExpended] = useState(false)

  const expendedTodo = !!todo.description || !!todo.expanded

  function handleChangeForComplete() {
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
    } else {
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

      const nameLink = new URL(link).hostname

      return { link, name: nameLink }
    })

    return htmlLink.map(({ link, name }) => (
      <a href={link} key={link} target="_blank" rel="noreferrer">
        <FaLink />
        {name}
      </a>
    ))
  }

  function handleClickDropdown(type: 'edit' | 'remove') {
    if (type === 'remove') {
      dispatch({
        type: Types.Remove,
        payload: { id_collection: id, id: todo.id }
      })
    }

    if (type === 'edit') {
      setModal(true)
      setHasEdit(true)
    }
  }

  // drag and drop todo
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: todo.complete ? 'TODO_COMPLETED' : 'TODO',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },
    hover(item: DragItem, monitor) {
      if (!dropRef.current) return

      const dragIndex = item.index
      const hoverIndex = index
      if (dragIndex === hoverIndex) return

      const hoverBoundingRect = dropRef.current.getBoundingClientRect()
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      const clientOffset: any = monitor.getClientOffset()
      const hoverClientY = clientOffset.y - hoverBoundingRect.top

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return

      dispatch({
        type: Types.Move,
        payload: {
          id_collection: id,
          dragIndex,
          hoverIndex,
          type: todo.complete ? 'complete' : 'incomplete'
        }
      })

      item.index = hoverIndex
    }
  })

  const [{ isDragging }, drag, preview] = useDrag({
    type: todo.complete ? 'TODO_COMPLETED' : 'TODO',
    item: () => {
      return { id: todo.id, index, todo, ref: dropRef.current }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  drop(drag(dropRef))
  drag(dragRef)

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, []) // eslint-disable-line

  useEffect(() => {
    if (isDragging) {
      setExpended(false)
    }
  }, [isDragging, expendedTodo])

  useEffect(() => {
    if (!hasEdit) return

    if (expendedTodo) {
      setModal(true)
    } else {
      inputEl.current?.focus()
    }
  }, [hasEdit, expendedTodo])

  return (
    <>
      <s.TodoWrapper
        edit={hasEdit && !expendedTodo}
        expended={expended}
        isDragging={isDragging}
        ref={dropRef}
        data-handler-id={handlerId}
      >
        <s.ButtonDrag type="button" ref={dragRef}>
          <MdDragIndicator size={25} />
        </s.ButtonDrag>

        <s.InputCheckboxTodo>
          <input
            type="checkbox"
            onChange={handleChangeForComplete}
            checked={toggle}
          />
        </s.InputCheckboxTodo>

        {hasEdit && !expendedTodo ? (
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

        <ModalForm
          closeModal={setModal}
          modalIsOpen={modal}
          type="edit"
          todo={todo}
          setEdit={setHasEdit}
        />

        <s.ButtonsControl>
          <Dropdown callbackClick={handleClickDropdown} />

          {expendedTodo && (
            <s.ExpendedButton
              type="button"
              onClick={() => setExpended(prev => !prev)}
              expended={expended}
            >
              <FaAngleDown
                size={16}
                style={{ transform: expended ? 'rotate(180deg)' : 'rotate(0)' }}
              />
            </s.ExpendedButton>
          )}
        </s.ButtonsControl>
      </s.TodoWrapper>

      {expended && (
        <s.ExpendedTodo>
          {todo.description && <p>{todo.description}</p>}

          {!!todo.expanded?.links && (
            <s.LinksWrapper>{formateLinks(todo.expanded.links)}</s.LinksWrapper>
          )}
        </s.ExpendedTodo>
      )}
    </>
  )
}

export default memo(Todo)
