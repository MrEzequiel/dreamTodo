import React, { useState, memo, useMemo } from 'react'

import { NavLink } from 'react-router-dom'
import Dropdown from '../../../components/Dropdown'
import Modal from '../../../components/Modal'
import ICollection from '../../../interfaces/Collection'
import FormCollection from '../FormCollection'
import Button from '../../../styles/Button'

import * as s from './style'
import Title from '../../../styles/Title'
import { Emoji } from 'emoji-mart'
import { useMutation, useQueryClient } from 'react-query'
import deleteCollection from '../../../functions/Collection/deleteCollection'
import { useNotification } from '../../../context/NotificationContext'

interface IProps {
  collection: ICollection
}

const Card: React.FC<IProps> = ({ collection }) => {
  const { createNotification } = useNotification()
  const [hasEdit, setHasEdit] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const query = useQueryClient()
  const { isLoading, mutate: mutateDelete } = useMutation(deleteCollection, {
    onSuccess: (data, idCollection: string) => {
      setConfirmed(false)
      createNotification('success', 'Collection deleted successfully')

      const collections = query.getQueryData('collection') as ICollection[]

      if (collections) {
        const newCollections = collections.filter(
          (collection: ICollection) => collection.id !== idCollection
        )
        query.setQueryData('collection', newCollections)
      } else {
        query.refetchQueries('collection')
      }
    },

    onError: () => {
      createNotification('error', 'Error deleting collection')
    }
  })

  const getPercentageTodo = useMemo(() => {
    const todos = collection.Todo

    if (todos?.length === 0 || !todos) return '0%'

    const total = todos.reduce(
      (acc, item) => (item.complete ? acc + 1 : acc),
      0
    )
    return `${((total * 100) / todos.length).toFixed()}%`
  }, [collection.Todo])

  function handleClickDropdown(types: 'edit' | 'remove') {
    if (types === 'remove') {
      setConfirmed(true)
    }

    if (types === 'edit') {
      setHasEdit(true)
    }
  }

  return (
    <>
      <s.CardWrapper>
        <div className="upper">
          <Emoji emoji={collection.emoji} size={50} native />

          <Dropdown callbackClick={handleClickDropdown} />
        </div>

        <div className="down">
          <h2>
            <NavLink to={`/todo/${collection.name}`}>{collection.name}</NavLink>
          </h2>

          <p>Tasks: {collection.Todo.length}</p>

          <s.Porcetage quant={getPercentageTodo}>
            <p>{getPercentageTodo}</p>
            <span></span>
          </s.Porcetage>
        </div>
      </s.CardWrapper>

      <FormCollection
        setShowForm={setHasEdit}
        showForm={hasEdit}
        initial={collection}
      />

      <Modal
        size="min(500px, 80%)"
        setCloseModal={setConfirmed}
        modalIsOpen={confirmed}
      >
        <Title size="2.2rem" weight="300" separator>
          Want to delete collection
          <strong>{` "${collection.name}"`}?</strong>
        </Title>

        <s.ControlsButton>
          <Button outlined onClick={() => setConfirmed(false)}>
            No
          </Button>
          <Button
            onClick={() => mutateDelete(collection.id)}
            loading={isLoading}
          >
            Yes
          </Button>
        </s.ControlsButton>
      </Modal>
    </>
  )
}

export default memo(Card)
