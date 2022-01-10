import { useRef, useState } from 'react'
import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa'
import * as s from './style'

function Dropdown({ todo }) {
  const DropdownEl = useRef()
  const [open, setOpen] = useState(false)

  function handleOutsideClick({ target }) {
    if (!DropdownEl.current.contains(target)) {
      setOpen(prev => !prev)
      window.removeEventListener('click', handleOutsideClick)
    }
  }

  function handleClick() {
    setOpen(prev => !prev)

    setTimeout(() => window.addEventListener('click', handleOutsideClick))

    if (!open) window.removeEventListener('click', handleOutsideClick)
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

          <s.DropdownItens>
            <FaTrash />
            remove
          </s.DropdownItens>
        </s.DropdownStyle>
      )}
    </s.DropdownWrapper>
  )
}

export default Dropdown
