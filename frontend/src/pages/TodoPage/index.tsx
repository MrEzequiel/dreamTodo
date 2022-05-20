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
import loadingAnimationIcon from '../../assets/loading.svg'

import * as s from './style'

const TodoPage = () => {
  const { collectionName } = useParams()

  const {
    data: collection,
    isLoading,
    isError
  } = useQuery<ICollection>(['todo', collectionName], () =>
    getIndividualCollection(collectionName as string)
  )

  return (
    <>
      {isLoading && (
        <s.LoadingContainer>
          <img src={loadingAnimationIcon} alt="animation" />
          <h3>loading your tasks...</h3>
        </s.LoadingContainer>
      )}

      {!isLoading && !!collection && (
        <TodoContext.Provider
          value={{
            idCollection: collection.id,
            collectionName: collection.name
          }}
        >
          <s.TitleStyle>
            <NavLink to="/" end>
              <button type="button">
                <FaAngleLeft size={20} />
              </button>
            </NavLink>

            <h1>
              <Emoji emoji={collection.emoji} size={32} native />
              {collection.name}
            </h1>
          </s.TitleStyle>

          <FormTodo />
          <TodoList list={collection.Todo} />
        </TodoContext.Provider>
      )}

      {isError && <NotFound />}
    </>
  )
}

export default TodoPage
