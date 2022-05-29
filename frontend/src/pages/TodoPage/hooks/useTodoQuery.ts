import { useQuery } from 'react-query'
import { getIndividualCollection } from '../../../functions/Todo/getTodo'
import queryKeys from '../../../react-query/queryKeys'

import ICollection from '../../../interfaces/Collection'

const useTodoQuery = (collectionName: string) => {
  const query = useQuery<ICollection>([queryKeys.todo, collectionName], () =>
    getIndividualCollection(collectionName)
  )

  return query
}

export default useTodoQuery
