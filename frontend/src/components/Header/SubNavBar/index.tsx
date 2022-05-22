import { Emoji } from 'emoji-mart'
import React, { useRef } from 'react'
import { FaStickyNote, FaTimes } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import useCollections from '../../../pages/Collections/hooks/useCollections'
import Title from '../../../styles/Title'
import LoadingIndicator from '../../LoadingIndicator'

import * as s from './style'

interface IProps {
  setNavBar: React.Dispatch<React.SetStateAction<boolean>>
  ref: React.RefObject<HTMLElement>
}

const SubNavBar = React.forwardRef<HTMLDivElement, IProps>((props, ref) => {
  const subNavBarRef = useRef<HTMLDivElement>(null)

  const { data: collections, isLoading, isFetching } = useCollections()

  const handleClickOutside = ({ target }: React.MouseEvent) => {
    if (!subNavBarRef.current?.contains(target as Node)) {
      props.setNavBar(false)
    }
  }

  return (
    <s.SubNavBarWrapper ref={ref} onClick={handleClickOutside}>
      <s.SubNavBar className="nav" ref={subNavBarRef}>
        <s.SubNavBarHeader>
          <Title size="2.8rem" weight="500">
            Collections
          </Title>

          <s.ButtonCloseBar onClick={() => props.setNavBar(false)}>
            <FaTimes size={15} />
          </s.ButtonCloseBar>
        </s.SubNavBarHeader>

        <s.SubNavBarContent>
          {(isLoading || isFetching) && (
            <s.LoadingWrapper>
              <LoadingIndicator color="#11eedd" />
            </s.LoadingWrapper>
          )}

          {collections &&
            !!collections.length &&
            collections.map(collection => (
              <NavLink
                key={collection.id}
                to={`/todo/${collection.id}`}
                className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                onClick={() => props.setNavBar(false)}
              >
                <s.CollectionsItems loading={isLoading || isFetching}>
                  <Emoji emoji={collection.emoji} size={20} native />
                  {collection.name}
                </s.CollectionsItems>
              </NavLink>
            ))}

          {collections?.length === 0 && !isLoading && (
            <s.EmptyCollections>
              <FaStickyNote size={30} />
              <p>You don&#8219;t have any collection</p>
            </s.EmptyCollections>
          )}
        </s.SubNavBarContent>
      </s.SubNavBar>
    </s.SubNavBarWrapper>
  )
})

SubNavBar.displayName = 'SubNavBar'
export default SubNavBar
