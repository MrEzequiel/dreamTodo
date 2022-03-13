import React, { useContext, useEffect, useMemo } from 'react'
import { FaStickyNote } from 'react-icons/fa'
import useCollections from '../../../context/CollectionsContext'
import { TodoContext } from '../../../context/TodoListContext'
import { useUser } from '../../../context/UserContext'
import { getCollection } from '../../../functions/Collection/getCollection'
import { Types } from '../../../functions/reducers'
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
  const [collections, setCollections] = useCollections()
  console.log(collections)
  const { isUser } = useUser()

  const {
    run,
    result: userCollections,
    status
  } = useRequest<ICollection[]>(getCollection, false)

  useEffect(() => {
    if (isUser) {
      run()
    }
  }, [isUser, run])

  useEffect(() => {
    if (status === 'resolved' && userCollections) {
      setCollections(userCollections)
    }
  }, [status, userCollections, setCollections])

  return (
    <>
      {collections.length === 0 && status === 'resolved' && (
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

      {collections.length > 0 && status === 'resolved' && (
        <s.CollectionCardWrapper>
          {collections.map(collection => (
            <Card key={collection.id} collection={collection} />
          ))}
        </s.CollectionCardWrapper>
      )}

      {status === 'pending' && (
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
