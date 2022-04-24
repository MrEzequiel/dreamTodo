import React from 'react'
import { FaStickyNote } from 'react-icons/fa'
import { useQuery } from 'react-query'
import LoadingIndicator from '../../../components/LoadingIndicator'
import { getCollection } from '../../../functions/Collection/getCollection'
import ICollection from '../../../interfaces/Collection'
import { Skeleton } from '../../../styles/Skeleton'
import Card from '../Card'
import { CardWrapper } from '../Card/style'

import * as s from './style'

interface IProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

const CollectionCard: React.FC<IProps> = ({ setShowForm }) => {
  const {
    data: collections,
    isLoading,
    isFetching
  } = useQuery<ICollection[]>('collection', getCollection, {
    refetchOnWindowFocus: false
  })

  return (
    <>
      {collections && collections.length === 0 && !isLoading && (
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

      {collections && collections.length > 0 && !isLoading && (
        <s.CollectionCardWrapper
          style={{
            opacity: isFetching && collections.length ? 0.5 : 1,
            pointerEvents: isFetching && collections.length ? 'none' : 'auto',
            transition: 'all 0.3s ease-in-out'
          }}
        >
          {collections.map(collection => (
            <Card key={collection.id} collection={collection} />
          ))}

          {isFetching && Boolean(collections.length) && (
            <s.LoadingWrapper>
              <LoadingIndicator size={40} />
            </s.LoadingWrapper>
          )}
        </s.CollectionCardWrapper>
      )}

      {isLoading && (
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
