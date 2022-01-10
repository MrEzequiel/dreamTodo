import { useEffect, useRef, useState } from 'react'
import useTodo from '../../../hooks/useTodo'

import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa'
import * as s from './style'

function Dropdown({ todo }) {
  const { dispatch, ACTIONS } = useTodo()
  const DropdownEl = useRef()
  const [open, setOpen] = useState(false)

  function handleClick() {
    setOpen(prev => !prev)
  }

  useEffect(() => {
    function handleOutsideClick({ target }) {
      if (!DropdownEl.current?.contains(target)) {
        window.removeEventListener('click', handleOutsideClick)
        setOpen(prev => !prev)
      }
    }

    if (open) {
      window.addEventListener('click', handleOutsideClick)
    }

    return () => window.removeEventListener('click', handleOutsideClick)
  }, [open])

  function handleClickRemove() {
    dispatch({ types: ACTIONS.REMOVE_TODO, payload: { id: todo.id } })
  }

  return (
    <s.DropdownWrapper ref={DropdownEl}>
      <s.ButtonDropdown onClick={handleClick}>
        <FaEllipsisV />
      </s.ButtonDropdown>

      {!!open && (
        <s.DropdownStyle>
          <s.DropdownItens>
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
