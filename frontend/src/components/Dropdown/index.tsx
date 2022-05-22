import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'

import { FaEllipsisV, FaEdit, FaTrash } from 'react-icons/fa'
import { CSSTransition } from 'react-transition-group'

import * as s from './style'

interface Props {
  callbackClick?: (arg: 'edit' | 'remove') => void
}

const Dropdown: React.FC<PropsWithChildren<Props>> = ({
  callbackClick,
  children
}) => {
  const DropdownItemEl = useRef<HTMLDivElement>(null)
  const DropdownEl = useRef<HTMLDivElement>(null)
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
    callbackClick?.('remove')
    setOpen(false)
  }

  function handleClickEdit() {
    callbackClick?.('edit')
    setOpen(false)
  }

  return (
    <s.DropdownWrapper ref={DropdownEl}>
      <s.ButtonDropdown onClick={handleClick} active={open}>
        <FaEllipsisV />
      </s.ButtonDropdown>

      <CSSTransition
        nodeRef={DropdownItemEl}
        in={open}
        timeout={300}
        classNames="DropdownStyle"
        unmountOnExit
      >
        <s.DropdownStyle ref={DropdownItemEl}>
          {!children ? (
            <>
              <s.DropdownItens onClick={handleClickEdit}>
                <FaEdit />
                edit
              </s.DropdownItens>

              <s.DropdownItens onClick={handleClickRemove}>
                <FaTrash />
                remove
              </s.DropdownItens>
            </>
          ) : (
            children
          )}
        </s.DropdownStyle>
      </CSSTransition>
    </s.DropdownWrapper>
  )
}

export default Dropdown
