import React from 'react'
import useCollections from '../hooks/useCollections'

import CollectionCard from '../CollectionCard'
import { Skeleton } from '../../../styles/Skeleton'

import LoadingIndicator from '../../../components/LoadingIndicator'
import { FaStickyNote } from 'react-icons/fa'
import { CardWrapper } from '../CollectionCard/style'

import * as s from './style'

interface IProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

const CollectionList: React.FC<IProps> = ({ setShowForm }) => {
  const { data: collections, isLoading, isRefetching } = useCollections()

  return (
    <>
      {collections && collections.length === 0 && !isLoading && !isRefetching && (
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
        <s.CollectionCardWrapper isFetching={isRefetching}>
          {collections.map(collection => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </s.CollectionCardWrapper>
      )}

      {isRefetching && Boolean(collections?.length) && (
        <s.LoadingWrapper>
          <LoadingIndicator size={40} />
        </s.LoadingWrapper>
      )}

      {(isLoading || isRefetching) && !Boolean(collections?.length) && (
        <CardWrapper style={{ maxWidth: '280px', marginTop: '40px' }}>
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

export default CollectionList
