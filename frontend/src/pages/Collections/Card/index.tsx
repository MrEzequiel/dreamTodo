import React, { useContext, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { TodoContext } from '../../../context/TodoListContext'
import { Types } from '../../../functions/reducers'
import Dropdown from '../../../components/Dropdown'
import ICollection from '../../../interfaces/Collection'
import FormCollection from '../FormCollection'

import * as s from './style'

interface IProps {
  collection: ICollection
}

const Card: React.FC<IProps> = ({ collection }) => {
  const { dispatch } = useContext(TodoContext)
  const [hasEdit, setHasEdit] = useState(false)

  function getPercentageTodo() {
    const todos = collection.todo

    if (todos.length === 0) return '0%'

    const total = todos.reduce(
      (acc, item) => (item.complete ? acc + 1 : acc),
      0
    )

    return ((total * 100) / todos.length).toFixed() + '%'
  }

  function handleClickDropdown(types: 'edit' | 'remove') {
    if (types === 'remove') {
      dispatch({
        type: Types.Remove_Collection,
        payload: { id: collection.id }
      })
    }

    if (types === 'edit') {
      setHasEdit(true)
    }
  }

  function handleCollectionEdit(newCollection: ICollection) {
    dispatch({ type: Types.Edit_Collection, payload: { ...newCollection } })
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

          <s.Porcetage quant={getPercentageTodo()}>
            <p>{getPercentageTodo()}</p>
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
    </>
  )
}

export default Card
