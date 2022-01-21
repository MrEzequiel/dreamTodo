import React, { useContext, useState, memo, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { TodoContext } from '../../../context/TodoListContext'
import { Types } from '../../../functions/reducers'
import Dropdown from '../../../components/Dropdown'
import Modal from '../../../components/Modal'
import ICollection from '../../../interfaces/Collection'
import FormCollection from '../FormCollection'
import Button from '../../../styles/Button'

import * as s from './style'
import Title from '../../../styles/Title'

interface IProps {
  collection: ICollection
}

const Card: React.FC<IProps> = ({ collection }) => {
  const { dispatch } = useContext(TodoContext)
  const [hasEdit, setHasEdit] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const getPercentageTodo = useMemo(() => {
    const todos = collection.todo

    if (todos.length === 0) return '0%'

    const total = todos.reduce(
      (acc, item) => (item.complete ? acc + 1 : acc),
      0
    )

    return ((total * 100) / todos.length).toFixed() + '%'
  }, [collection.todo])

  function handleClickDropdown(types: 'edit' | 'remove') {
    if (types === 'remove') {
      setConfirmed(true)
    }

    if (types === 'edit') {
      setHasEdit(true)
    }
  }

  function handleCollectionEdit(newCollection: ICollection) {
    dispatch({ type: Types.Edit_Collection, payload: { ...newCollection } })
  }

  function handleCollectionRemove() {
    dispatch({
      type: Types.Remove_Collection,
      payload: { id: collection.id }
    })
  }

  return (
    <>
      <s.CardWrapper>
        <div className="upper">
          {collection.emoji.native}

          <Dropdown callbackClick={handleClickDropdown} />
        </div>

        <div className="down">
          <h2>
            <NavLink to={`/todo/${collection.id}`}>{collection.title}</NavLink>
          </h2>

          <p>Tasks: {collection.todo.length}</p>

          <s.Porcetage quant={getPercentageTodo}>
            <p>{getPercentageTodo}</p>
            <span></span>
          </s.Porcetage>
        </div>
      </s.CardWrapper>

      {hasEdit && (
        <FormCollection
          setShowForm={setHasEdit}
          initial={collection}
          callback={handleCollectionEdit}
        />
      )}

      {confirmed && (
        <Modal size="min(500px, 80%)" setCloseModal={setConfirmed}>
          <Title size="2.2rem" weight="300" separator>
            Want to delete collection
            <strong>{` "${collection.title}"`}?</strong>
          </Title>

          <s.ControlsButton>
            <Button onClick={handleCollectionRemove}>Yes</Button>
            <Button outlined onClick={() => setConfirmed(false)}>
              No
            </Button>
          </s.ControlsButton>
        </Modal>
      )}
    </>
  )
}

export default memo(Card)
