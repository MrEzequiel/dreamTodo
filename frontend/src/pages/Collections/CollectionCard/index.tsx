import React, { useContext, useEffect, useState } from 'react'
import { FaStickyNote } from 'react-icons/fa'
import { TodoContext } from '../../../context/TodoListContext'
import ICollection from '../../../interfaces/Collection'
import Card from '../Card'

import * as s from './style'

interface IProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

const CollectionCard: React.FC<IProps> = ({ setShowForm }) => {
  const { state } = useContext(TodoContext)

  return (
    <s.CollectionCardWrapper>
      {state.collections.length === 0 ? (
        <s.EmptyCollection>
          <FaStickyNote size={30} />
          <p>
            You don&#8219;t have any collection
            <br />
            <a
              href="#"
              onClick={e => {
                e.preventDefault()
                setShowForm(true)
              }}
            >
              click here
            </a>{' '}
            to add
          </p>
        </s.EmptyCollection>
      ) : (
        state.collections.map(collection => (
          <Card key={collection.id} collection={collection} />
        ))
      )}
    </s.CollectionCardWrapper>
  )
}

export default CollectionCard
