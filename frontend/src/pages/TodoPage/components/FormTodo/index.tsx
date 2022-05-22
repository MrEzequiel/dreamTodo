import React, { useRef, useState, useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useTodoContext } from '../../TodoContext'

import { postTodo } from '../../../../functions/Todo/postTodo'
import { FaPlus } from 'react-icons/fa'
import { CSSTransition } from 'react-transition-group'

import ModalForm from './ModalForm'
import Button from '../../../../styles/Button'
import * as s from './styles'

import ICollection from '../../../../interfaces/Collection'
import ITodo from '../../../../interfaces/Todo'
import queryKeys from '../../../../react-query/queryKeys'

interface ReturnTodo extends ITodo {
  id_collection: string
}

const FormTodo: React.FC = () => {
  const { idCollection, collectionName } = useTodoContext()
  const queryClient = useQueryClient()
  const inputEl = useRef<HTMLInputElement>(null)
  const moreInformationRef = useRef<HTMLAnchorElement>(null)

  const [name, setName] = useState('')
  const [focus, setFocus] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const { mutate: mutatePostTodo, isLoading } = useMutation(postTodo, {
    onSuccess: (data: ReturnTodo) => {
      setName('')
      inputEl.current?.focus()

      const collection = queryClient.getQueryData([
        queryKeys.todo,
        collectionName
      ]) as ICollection

      if (collection) {
        const newCollection: ICollection = {
          ...collection,
          Todo: [...collection.Todo, data]
        }

        queryClient.setQueryData(
          [queryKeys.todo, collectionName],
          newCollection
        )
        queryClient.invalidateQueries(queryKeys.collection)
      }
    }
  })

  const handleSubmit = (e: React.SyntheticEvent) => {
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
          placeholder="make coffee"
          onChange={e => {
            setName(e.target.value)
          }}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <Button
          type="submit"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            width: '45px',
            height: '40px'
          }}
          loading={isLoading}
        >
          <FaPlus />
        </Button>
      </s.FormStyle>

      <CSSTransition
        in={focus}
        timeout={700}
        unmountOnExit
        classNames="collapse"
        nodeRef={moreInformationRef}
      >
        <s.MoreInformation
          onClick={() => setOpenModal(true)}
          ref={moreInformationRef}
        >
          More information
        </s.MoreInformation>
      </CSSTransition>

      <ModalForm closeModal={setOpenModal} modalIsOpen={openModal} type="add" />
    </s.FormWrapper>
  )
}

export default FormTodo
