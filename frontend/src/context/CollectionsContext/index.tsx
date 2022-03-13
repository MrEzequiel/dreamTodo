import React, { createContext, useContext } from 'react'
import ICollection from '../../interfaces/Collection'

interface ICollectionsContext {
  collections: ICollection[]
  setCollections: React.Dispatch<React.SetStateAction<ICollection[]>>
}

export const CollectionsContext = createContext({} as ICollectionsContext)

export const CollectionsProvider: React.FC = ({ children }) => {
  const [collections, setCollections] = React.useState<ICollection[]>([])

  return (
    <CollectionsContext.Provider
      value={{
        collections,
        setCollections
      }}
    >
      {children}
    </CollectionsContext.Provider>
  )
}

const useCollections = (): [
  ICollection[],
  React.Dispatch<React.SetStateAction<ICollection[]>>
] => {
  const context = useContext(CollectionsContext)

  if (!context) {
    throw new Error(
      'useCollections must be used within a <CollectionsProvider />'
    )
  }

  return [context.collections, context.setCollections]
}

export default useCollections
