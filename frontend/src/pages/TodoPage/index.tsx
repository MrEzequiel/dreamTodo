import { Emoji } from 'emoji-mart'
import { FaAngleLeft } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { getIndividualCollection } from '../../functions/Todo/getTodo'
import ICollection from '../../interfaces/Collection'
import NotFound from '../NotFound'
import TodoContext from './TodoContext'
import FormTodo from './components/FormTodo'
import TodoList from './components/TodoList'

import * as s from './style'

const TodoPage = () => {
  const { collectionName } = useParams()

  const {
    data: collection,
    isLoading,
    isError
  } = useQuery<ICollection[]>(['todo', collectionName], () =>
    getIndividualCollection(collectionName as string)
  )

  return (
    <>
      {isLoading && <p>Loading</p>}

      {!isLoading && !!collection && (
        <TodoContext.Provider
          value={{
            idCollection: collection[0].id,
            collectionName: collection[0].name
          }}
        >
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

          <FormTodo />
          <TodoList list={collection[0].Todo} />
        </TodoContext.Provider>
      )}

      {isError && <NotFound />}
    </>
  )
}

export default TodoPage
