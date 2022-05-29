import { useQuery } from 'react-query'
import { getCollection } from '../../../functions/Collection/getCollection'

import ICollection from '../../../interfaces/Collection'
import queryKeys from '../../../react-query/queryKeys'

const useCollections = () => {
  const query = useQuery<ICollection[]>(queryKeys.collection, getCollection, {
    staleTime: 1000 * 60 * 2 // 2 minutes
  })

  return query
}

export default useCollections
