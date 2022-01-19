import React from 'react'
import { NavLink } from 'react-router-dom'
import ICollection from '../../../interfaces/Collection'

import * as s from './style'

interface IProps {
  collection: ICollection
}

const Card: React.FC<IProps> = ({ collection }) => {
  function getPercentageTodo() {
    const todos = collection.todo

    if (todos.length === 0) return '0%'

    const total = todos.reduce(
      (acc, item) => (item.complete ? acc + 1 : acc),
      0
    )

    return (total * 100) / todos.length + '%'
  }

  return (
    <NavLink to={`/todo/${collection.id}`}>
      <s.CardWrapper>
        <div className="upper">{collection.emoji.native}</div>

        <div className="down">
          <h2>{collection.title}</h2>
          <p>Tasks: {collection.todo.length}</p>

          <s.Porcetage quant={getPercentageTodo()}>
            <p>{getPercentageTodo()}</p>
            <span></span>
          </s.Porcetage>
        </div>
      </s.CardWrapper>
    </NavLink>
  )
}

export default Card
