import React, { useRef, useState, useContext, useEffect } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useMutation, useQueryClient } from 'react-query'
import { useParams } from 'react-router-dom'
import { CSSTransition } from 'react-transition-group'
import Modal from '../../../../components/Modal'
import { TodoContext } from '../../../../context/TodoListContext'
import TodoPageContext from '../../../../context/TodoPageContext'
import { Types } from '../../../../functions/reducers'
import { postTodo } from '../../../../functions/Todo/postTodo'
import ICollection from '../../../../interfaces/Collection'
import ITodo from '../../../../interfaces/Todo'
import Button from '../../../../styles/Button'
import { useTodoContext } from '../../TodoContext'
import ModalForm from './ModalForm'

import * as s from './styles'

interface ReturnTodo extends ITodo {
  id_collection: 'b5eaab2d-16b1-42c5-bb6e-f18f427e938f'
}

const FormTodo: React.FC = () => {
  const { idCollection, collectionName } = useTodoContext()
  const queryClient = useQueryClient()
  const inputEl = useRef<HTMLInputElement>(null)

  const [name, setName] = useState('')
  const [focus, setFocus] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const { mutate: mutatePostTodo, isLoading } = useMutation(postTodo, {
    onSuccess: (data: ReturnTodo) => {
      setName('')
      inputEl.current?.focus()

      const dataCollections = queryClient.getQueryData([
        'todo',
        collectionName
      ]) as ICollection[]

      if (dataCollections) {
        const newDataCollections = dataCollections.map(collection => {
          if (collection.id === idCollection) {
            return {
              ...collection,
              Todo: [data, ...collection.Todo]
            }
          }

          return collection
        })

        queryClient.setQueryData(['todo', collectionName], newDataCollections)
      }
    }
  })

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()
    if (!name.trim()) return

    mutatePostTodo({
      idCollection,
      name
    })
  }

  useEffect(() => () => setOpenModal(false), [])

  return (
    <s.FormWrapper>
      <s.FormStyle onSubmit={handleSubmit} inFocus={focus}>
        <s.InputStyle
          ref={inputEl}
          type="text"
          value={name}
          placeholder="add a task"
          onChange={e => {
            setName(e.target.value)
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => setTimeout(() => setFocus(false), 200)}
        />
        <Button
          type="submit"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            width: '40px',
            height: '40px'
          }}
          loading={isLoading}
        >
          <FaPlus />
        </Button>
      </s.FormStyle>

      {focus && (
        <s.MoreInformation onClick={() => setOpenModal(true)}>
          More information
        </s.MoreInformation>
      )}

      {/* <ModalForm closeModal={setOpenModal} modalIsOpen={openModal} type="add" /> */}
    </s.FormWrapper>
  )
}

export default FormTodo
