import React, { useContext, useEffect, useMemo } from 'react'
import { FaStickyNote } from 'react-icons/fa'
import { TodoContext } from '../../../context/TodoListContext'
import { useUser } from '../../../context/UserContext'
import { getCollection } from '../../../functions/Collection/getCollection'
import useRequest from '../../../hooks/useRequest'
import ICollection from '../../../interfaces/Collection'
import { Skeleton } from '../../../styles/Skeleton'
import Card from '../Card'
import { CardWrapper } from '../Card/style'

import * as s from './style'

interface IProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

const CollectionCard: React.FC<IProps> = ({ setShowForm }) => {
  const { state } = useContext(TodoContext)
  const { isUser } = useUser()
  const {
    run,
    result: userCollections,
    status
  } = useRequest(getCollection, false)

  useEffect(() => {
    if (isUser) run()
  }, [run, isUser])

  const collections = useMemo(() => {
    if (isUser) {
      return userCollections as ICollection[]
    }

    return state.collections
  }, [state, isUser, userCollections])

  const verificationCollectionIsEmpty = () => {
    if (collections?.length > 0) return false

    if (status === 'resolved' && isUser) return true
    if (!isUser) return true

    return false
  }

  console.log(collections)
  console.log(isUser)

  return (
    <>
      {verificationCollectionIsEmpty() && (
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
      )}

      {!!collections && !!collections.length && (
        <s.CollectionCardWrapper>
          {state.collections.map(collection => (
            <Card key={collection.id} collection={collection} />
          ))}
        </s.CollectionCardWrapper>
      )}

      {isUser && status === 'pending' && (
        <CardWrapper style={{ maxWidth: '280px' }}>
          <div className="upper">
            <Skeleton
              width={50}
              height={50}
              variant="circle"
              style={{ margin: '0 auto' }}
            />
          </div>

          <div className="down">
            <Skeleton height={25} />
            <Skeleton height={15} style={{ marginTop: '5px', width: '80%' }} />
          </div>
        </CardWrapper>
      )}
    </>
  )
}

export default CollectionCard
