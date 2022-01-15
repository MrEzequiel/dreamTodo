import React, { useEffect, useRef, useState, useContext } from 'react'

import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa'
import * as s from './style'
import { ITodo, TodoContext } from '../../../context/TodoListContext'
import { Types } from '../../../functions/reducers'

interface Props {
  todo: ITodo
  setHasEdit: React.Dispatch<React.SetStateAction<boolean>>
}

const Dropdown: React.FC<Props> = ({ todo, setHasEdit }) => {
  const DropdownEl = useRef<HTMLDivElement>(null)
  const { dispatch } = useContext(TodoContext)
  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen(prev => !prev)
  }

  useEffect(() => {
    function handleOutsideClick({ target }: any) {
      if (!DropdownEl.current?.contains(target)) {
        setOpen(false)
      }
    }

    if (open) {
      window.addEventListener('click', handleOutsideClick)
    } else {
      window.removeEventListener('click', handleOutsideClick)
    }

    return () => window.removeEventListener('click', handleOutsideClick)
  }, [open])

  function handleClickRemove() {
    dispatch({ type: Types.Remove, payload: { id: todo.id } })
  }

  function handleClickEdit() {
    setHasEdit(true)
    setOpen(false)
  }

  return (
    <s.DropdownWrapper ref={DropdownEl}>
      <s.ButtonDropdown onClick={handleClick}>
        <FaEllipsisV />
      </s.ButtonDropdown>

      {!!open && (
        <s.DropdownStyle>
          <s.DropdownItens onClick={handleClickEdit}>
            <FaEdit />
            edit
          </s.DropdownItens>

          <s.DropdownItens onClick={handleClickRemove}>
            <FaTrash />
            remove
          </s.DropdownItens>
        </s.DropdownStyle>
      )}
    </s.DropdownWrapper>
  )
}

export default Dropdown
