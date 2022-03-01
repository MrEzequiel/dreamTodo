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
import { Emoji } from 'emoji-mart'

interface IProps {
  collection: ICollection
}

const Card: React.FC<IProps> = ({ collection }) => {
  const { dispatch } = useContext(TodoContext)
  const [hasEdit, setHasEdit] = useState(false)
  const [confirmed, setConfirmed] = useState(false)

  const getPercentageTodo = useMemo(() => {
    const todos = collection.todo

    if (todos.complete.length === 0) return '0%'

    const todosTotal = todos.complete.length + todos.incomplete.length

    return ((todos.complete.length * 100) / todosTotal).toFixed() + '%'
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
          <Emoji emoji={collection.emoji} size={50} native />

          <Dropdown callbackClick={handleClickDropdown} />
        </div>

        <div className="down">
          <h2>
            <NavLink to={`/todo/${collection.id}`}>{collection.title}</NavLink>
          </h2>

          <p>
            Tasks:{' '}
            {collection.todo.complete.length +
              collection.todo.incomplete.length}
          </p>

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
        callback={handleCollectionEdit}
      />

      <Modal
        size="min(500px, 80%)"
        setCloseModal={setConfirmed}
        modalIsOpen={confirmed}
      >
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
    </>
  )
}

export default memo(Card)
