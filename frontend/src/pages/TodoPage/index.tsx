import { Emoji } from 'emoji-mart'
import React, { useContext, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { FaAngleLeft } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { TodoContext } from '../../context/TodoListContext'
import TodoPageContext from '../../context/TodoPageContext'
import { getIndividualCollection } from '../../functions/Todo/getTodo'
import ICollection from '../../interfaces/Collection'
import NotFound from '../NotFound'
import FormTodo from './components/FormTodo'
import TodoList from './components/TodoList'

import * as s from './style'

const TodoPage = () => {
  const { collectionName } = useParams()

  const {
    data: collection,
    isLoading,
    isError
  } = useQuery<ICollection[]>(
    ['todo', collectionName],
    () => getIndividualCollection(collectionName as string),
    {
      refetchOnWindowFocus: false
    }
  )

  return (
    <>
      {isLoading && <p>Loading</p>}

      {!isLoading && !!collection && (
        <>
          <s.TitleStyle>
            <NavLink to="/" end>
              <button type="button">
                <FaAngleLeft size={20} />
              </button>
            </NavLink>

            <h1>
              <Emoji emoji={collection[0].emoji} size={32} native />
              {collection[0].name}
            </h1>
          </s.TitleStyle>

          <FormTodo id={collection[0].id} />
          {/* <TodoList /> */}
        </>
      )}

      {isError && <NotFound />}
    </>
  )
}

export default TodoPage
