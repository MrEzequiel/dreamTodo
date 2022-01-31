import React, { useContext } from 'react'
import { FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import { TodoContext } from '../../../context/TodoListContext'
import Title from '../../../styles/Title'

import * as s from './style'

interface IProps {
  setNavBar: React.Dispatch<React.SetStateAction<boolean>>
  ref: React.RefObject<HTMLElement>
}

const SubNavBar = React.forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const { state } = useContext(TodoContext)

  return (
    <s.SubNavBarWrapper ref={ref}>
      <s.SubNavBar className="nav">
        <s.SubNavBarHeader>
          <Title size="2.8rem" weight="500">
            Collections
          </Title>

          <s.ButtonCloseBar onClick={() => props.setNavBar(false)}>
            <FaTimes size={15} />
          </s.ButtonCloseBar>
        </s.SubNavBarHeader>

        <s.SubNavBarContent>
          {state.collections.map(collection => (
            <NavLink
              key={collection.id}
              to={`/todo/${collection.id}`}
              className={({ isActive }) => (isActive ? 'active' : 'inactive')}
              onClick={() => props.setNavBar(false)}
            >
              <s.CollectionsItems>
                <span>{collection.emoji.native}</span>
                {collection.title}
              </s.CollectionsItems>
            </NavLink>
          ))}
        </s.SubNavBarContent>
      </s.SubNavBar>
    </s.SubNavBarWrapper>
  )
})

SubNavBar.displayName = 'SubNavBar'
export default SubNavBar
