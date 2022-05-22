import React, { memo, useRef, useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useTodoContext } from '../../TodoContext'
import { useNotification } from '../../../../context/NotificationContext'

import { FaAngleDown, FaLink } from 'react-icons/fa'
import * as s from './style'

import { CSSTransition } from 'react-transition-group'
import ModalForm from '../FormTodo/ModalForm'
import Dropdown from '../../../../components/Dropdown'

import ICollection from '../../../../interfaces/Collection'
import ITodo from '../../../../interfaces/Todo'

import { putCompletedTodo } from '../../../../functions/Todo/putTodo'
import { deleteTodo } from '../../../../functions/Todo/deleteTodo'
import queryKeys from '../../../../react-query/queryKeys'

interface TodoProps {
  todo: ITodo
}

const Todo: React.FC<TodoProps> = memo(
  ({ todo }) => {
    const { collectionName } = useTodoContext()
    const queryClient = useQueryClient()

    const moreInformationRef = useRef<HTMLDivElement>(null)
    const { createNotification } = useNotification()

    const [toggle, setToggle] = useState(todo.complete)
    const [extendDescription, setExtendDescription] = useState(false)

    const [hasEdit, setHasEdit] = useState(false)
    const [modalEditIsOpen, setModalEditIsOpen] = useState(false)
    const [expended, setExpended] = useState(false)

    const expendedTodo = !!todo.description || !!todo.expanded

    const { mutate: mutateDeleteTodo, isLoading: loadingDeleting } =
      useMutation(deleteTodo, {
        onSuccess: () => {
          createNotification('success', 'Todo deleted successfully')

          const collection = queryClient.getQueryData([
            queryKeys.todo,
            collectionName
          ]) as ICollection

          if (collection) {
            const newDataCollections: ICollection = {
              ...collection,
              Todo: collection.Todo.filter(
                (todoItem: ITodo) => todoItem.id !== todo.id
              )
            }

            queryClient.setQueryData(
              [queryKeys.todo, collectionName],
              newDataCollections
            )
            queryClient.invalidateQueries(queryKeys.collection)
          }
        },

        onError: () => {
          createNotification('error', 'Oops! Something went wrong')
        }
      })

    const { mutate: mutateCompleteTodo, isLoading: isLoadingCompleting } =
      useMutation(putCompletedTodo, {
        onSuccess: () => {
          const collection = queryClient.getQueryData([
            queryKeys.todo,
            collectionName
          ]) as ICollection

          if (collection) {
            // interactions for the completed todo is the last
            const newCollections: ICollection = (() => {
              let completedTodo = {} as ITodo

              const newCollectionsWithoutCompletedTodo = {
                ...collection,
                Todo: collection.Todo.filter((todoItem: ITodo) => {
                  if (todoItem.id === todo.id) {
                    completedTodo = {
                      ...todoItem,
                      complete: !todoItem.complete
                    }
                    return false
                  } else {
                    return true
                  }
                })
              }

              return {
                ...newCollectionsWithoutCompletedTodo,
                Todo: [
                  ...newCollectionsWithoutCompletedTodo.Todo,
                  completedTodo
                ]
              }
            })()

            queryClient.setQueryData(
              [queryKeys.todo, collectionName],
              newCollections
            )
            queryClient.invalidateQueries(queryKeys.collection)
          }
        },

        onError: () => {
          createNotification('error', 'Oops! Something went wrong')
        }
      })

    const handleChangeForComplete = () => {
      mutateCompleteTodo({
        idTodo: todo.id,
        completed: !toggle
      })
      setToggle(prev => !prev)
    }

    function formateLinks(links: string[]) {
      const htmlLink = links.map(link => {
        let newLink: any = link.split(/https?:\/\//g)
        newLink = newLink[0] === '' ? newLink[1] : newLink[0]
        link = `https://${newLink}`

        const nameLink = new URL(link).hostname

        return { link, name: nameLink }
      })

      return htmlLink.map(({ link, name }) => (
        <a href={link} key={link} target="_blank" rel="noreferrer">
          <FaLink />
          {name}
        </a>
      ))
    }

    function handleClickDropdown(type: 'edit' | 'remove') {
      if (type === 'remove') {
        mutateDeleteTodo({ idTodo: todo.id })
      }

      if (type === 'edit') {
        setModalEditIsOpen(true)
      }
    }

    return (
      <>
        <s.TodoWrapper
          edit={hasEdit && !expendedTodo}
          isLoading={loadingDeleting || isLoadingCompleting}
          expended={expended}
        >
          <s.InputCheckboxTodo>
            <input
              type="checkbox"
              onChange={handleChangeForComplete}
              checked={toggle}
              disabled={loadingDeleting || isLoadingCompleting}
            />
          </s.InputCheckboxTodo>

          <p style={{ textDecoration: toggle ? 'line-through' : 'none' }}>
            {todo.title}
          </p>

          <ModalForm
            closeModal={setModalEditIsOpen}
            modalIsOpen={modalEditIsOpen}
            type="edit"
            todo={todo}
            setEdit={setHasEdit}
          />

          <s.ButtonsControl>
            <Dropdown callbackClick={handleClickDropdown} />

            {expendedTodo && (
              <s.ExpendedButton
                type="button"
                onClick={() => setExpended(prev => !prev)}
                expended={expended}
              >
                <FaAngleDown
                  size={16}
                  style={{
                    transform: expended ? 'rotate(180deg)' : 'rotate(0)'
                  }}
                />
              </s.ExpendedButton>
            )}
          </s.ButtonsControl>
        </s.TodoWrapper>

        <CSSTransition
          in={expended}
          timeout={600}
          classNames="expended"
          unmountOnExit
          nodeRef={moreInformationRef}
        >
          <s.ExpendedTodo ref={moreInformationRef}>
            <div>
              {todo.description && (
                <p>
                  {extendDescription ? (
                    todo.description
                  ) : (
                    <span>
                      {todo.description.slice(0, 100)}

                      {todo.description.length > 100 && (
                        <span
                          onClick={() => setExtendDescription(prev => !prev)}
                          className="more"
                        >
                          {'  '}...more
                        </span>
                      )}
                    </span>
                  )}
                </p>
              )}

              {!!todo.expanded?.links && (
                <s.LinksWrapper>
                  {formateLinks(todo.expanded.links)}
                </s.LinksWrapper>
              )}
            </div>
          </s.ExpendedTodo>
        </CSSTransition>
      </>
    )
  },
  (prev, next) => {
    return JSON.stringify(prev.todo) === JSON.stringify(next.todo)
  }
)

Todo.displayName = 'Todo'
export default Todo
