import React, { useEffect } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import { useNotification } from '../../../../../context/NotificationContext'
import { useTodoContext } from '../../../TodoContext'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import validationSchema from './validationSchema'
import { postTodo } from '../../../../../functions/Todo/postTodo'
import { putTodo } from '../../../../../functions/Todo/putTodo'

import ICollection from '../../../../../interfaces/Collection'
import ITodo from '../../../../../interfaces/Todo'

import Modal from '../../../../../components/Modal'
import Button from '../../../../../styles/Button'
import Title from '../../../../../styles/Title'

import * as s from './style'
import InputStyle, {
  HelperTextStyle,
  TextAreaStyle
} from '../../../../../styles/Input'
import queryKeys from '../../../../../react-query/queryKeys'

interface ReturnTodo extends ITodo {
  id_collection: string
}

interface Props {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
  modalIsOpen: boolean
  type: 'add' | 'edit'
  todo?: ITodo
  setEdit?: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalForm: React.FC<Props> = ({
  closeModal,
  modalIsOpen,
  type,
  todo,
  setEdit
}) => {
  const queryClient = useQueryClient()
  const { collectionName, idCollection } = useTodoContext()

  const { control, setValue, handleSubmit } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: todo?.title || '',
      description: todo?.description || ''
    }
  })
  const { createNotification } = useNotification()

  const { mutate: mutatePostTodo, isLoading } = useMutation(postTodo, {
    onSuccess: (data: ReturnTodo) => {
      const collection = queryClient.getQueryData([
        'todo',
        collectionName
      ]) as ICollection

      if (collection) {
        const newDataCollections: ICollection = {
          ...collection,
          Todo: [...collection.Todo, data]
        }

        queryClient.setQueryData(['todo', collectionName], newDataCollections)
        queryClient.invalidateQueries('collection')
      } else {
        queryClient.refetchQueries(['todo', collectionName])
      }

      createNotification('success', 'Todo added successfully')
      closeModal(false)
    },

    onError: (error: any) => {
      if (error?.response?.status === 400) {
        createNotification('error', 'Todo already exists')
      } else {
        createNotification('error', 'ops!, Something went wrong')
      }
    }
  })

  const { mutate: mutatePutTodo, isLoading: isLoadingPut } = useMutation(
    putTodo,
    {
      onSuccess: (data: ITodo) => {
        const collection = queryClient.getQueryData([
          queryKeys.todo,
          collectionName
        ]) as ICollection

        if (collection) {
          const newCollections: ICollection = {
            ...collection,
            Todo: collection.Todo.map(todoItem => {
              if (todoItem.id === data.id) {
                return data
              }

              return todoItem
            })
          }

          queryClient.setQueryData(
            [queryKeys.todo, collectionName],
            newCollections
          )
          queryClient.invalidateQueries(queryKeys.collection)
        } else {
          queryClient.refetchQueries([queryKeys.todo, collectionName])
        }

        createNotification('success', 'Todo updated successfully')
        closeModal(false)
      },

      onError: (error: any) => {
        if (error?.response && error.response?.status === 400) {
          createNotification('error', 'Todo already exists')
        } else {
          createNotification('error', 'ops!, Something went wrong')
        }
      }
    }
  )

  const onSubmit = handleSubmit(data => {
    if (type === 'add') {
      mutatePostTodo({
        name: data.title,
        description: data.description,
        idCollection
      })
    } else if (todo?.id && setEdit) {
      mutatePutTodo({
        idTodo: todo.id,
        name: data.title,
        description: data.description
      })
      setEdit(false)
    }
  })

  useEffect(() => {
    if (setEdit) return () => setEdit(false)

    if (!modalIsOpen && !todo) {
      setValue('title', '')
      setValue('description', '')
    }
  }, [setEdit, modalIsOpen, todo]) // eslint-disable-line

  return (
    <Modal
      size="min(500px, 90%)"
      setCloseModal={closeModal}
      modalIsOpen={modalIsOpen}
    >
      <Title size="2.2rem" separator>
        Add a task
      </Title>

      <s.FormAddTodo onSubmit={onSubmit}>
        <Controller
          control={control}
          name="title"
          render={({ field, fieldState }) => (
            <div>
              <InputStyle
                type="text"
                placeholder="Title *"
                {...field}
                isValid={!Boolean(fieldState?.error)}
              />
              {fieldState.error && (
                <HelperTextStyle isError>
                  {fieldState.error.message}
                </HelperTextStyle>
              )}
            </div>
          )}
        />

        <Controller
          control={control}
          name="description"
          render={({ field, fieldState }) => (
            <div>
              <TextAreaStyle
                placeholder="Description"
                className="description"
                isValid={!Boolean(fieldState?.error)}
                {...field}
              />
              {fieldState?.error && (
                <HelperTextStyle isError>
                  {fieldState.error.message}
                </HelperTextStyle>
              )}
            </div>
          )}
        />

        <div className="links">
          <InputStyle type="text" placeholder="Links" disabled />
          <p className="alert">Comming soon</p>
        </div>

        <s.ButtonsModal>
          <Button type="submit" loading={isLoading || isLoadingPut}>
            {type}
          </Button>
          <Button
            type="button"
            onClick={() => closeModal(false)}
            outlined
            color="secondary"
          >
            Cancel
          </Button>
        </s.ButtonsModal>
      </s.FormAddTodo>
    </Modal>
  )
}

export default ModalForm
