import { Emoji } from 'emoji-mart'
import { FaAngleLeft, FaCloudUploadAlt } from 'react-icons/fa'
import { useIsMutating } from 'react-query'
import { NavLink, useParams } from 'react-router-dom'
import NotFound from '../NotFound'
import TodoContext from './TodoContext'
import FormTodo from './components/FormTodo'
import TodoList from './components/TodoList'
import loadingAnimationIcon from '../../assets/loading.svg'

import * as s from './style'
import queryKeys from '../../react-query/queryKeys'
import useTodoQuery from './hooks/useTodoQuery'
import LoadingIndicator from '../../components/LoadingIndicator'

const TodoPage = () => {
  const { collectionName } = useParams()

  const {
    data: collection,
    isLoading,
    isError
  } = useTodoQuery(collectionName as string)
  const isFetching = useIsMutating() > 0

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
            <div className="title">
              <NavLink to="/" end>
                <button type="button">
                  <FaAngleLeft size={20} />
                </button>
              </NavLink>

              <h1>
                <Emoji emoji={collection.emoji} size={32} native />
                {collection.name}
              </h1>
            </div>

            <div className="icon-loading">
              {isFetching ? (
                <LoadingIndicator />
              ) : (
                <FaCloudUploadAlt
                  size={26}
                  color="#606060"
                  title="save to cloud"
                />
              )}
            </div>
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
