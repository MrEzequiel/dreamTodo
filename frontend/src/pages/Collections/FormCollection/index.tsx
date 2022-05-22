import React, { useEffect, useMemo, useRef, useState } from 'react'
import { FaEdit, FaPlus, FaTimes } from 'react-icons/fa'
import useForm from '../../../hooks/useForm'
import { FormStyled } from './style'

import 'emoji-mart/css/emoji-mart.css'
import { BaseEmoji, Emoji, Picker } from 'emoji-mart'
import ICollection from '../../../interfaces/Collection'
import Modal from '../../../components/Modal'
import { postCollection } from '../../../functions/Collection/postCollection'
import LoadingIndicator from '../../../components/LoadingIndicator'
import { useMutation, useQueryClient } from 'react-query'
import { putCollection } from '../../../functions/Collection/editCollection'
import { useNotification } from '../../../context/NotificationContext'
import queryKeys from '../../../react-query/queryKeys'

interface IProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  showForm: boolean
  initial?: ICollection
}

const FormCollection: React.FC<IProps> = ({
  setShowForm,
  showForm,
  initial
}) => {
  const { createNotification } = useNotification()
  const inputEl = useRef<HTMLInputElement>(null)
  const collectionName = useForm({ initialValue: initial?.name })

  const [emoji, setEmoji] = useState(false)
  const [selectEmoji, setSelectEmoji] = useState(
    initial?.emoji ?? ':muscle::skin-tone-4:'
  )

  const query = useQueryClient()
  const { mutate: mutatePost, isLoading: loadingPost } = useMutation(
    postCollection,
    {
      onSuccess: () => {
        query.invalidateQueries(queryKeys.collection)
        setShowForm(false)
        createNotification('success', 'Collection created')
      },
      onError: (err: any) => {
        inputEl.current?.focus()

        if (err?.response?.status === 400) {
          createNotification('error', 'Collection name already exists')
        } else {
          createNotification('error', 'Error editing collection')
        }
      }
    }
  )

  const { mutate: mutateEdit, isLoading: lodingEdit } = useMutation(
    putCollection,
    {
      onSuccess: (newCollection: ICollection) => {
        setShowForm(false)
        createNotification('success', 'Collection edited successfully')

        const collections = query.getQueryData(
          queryKeys.collection
        ) as ICollection[]

        if (collections) {
          const newCollections = collections.map(collection => {
            if (collection.id === newCollection.id) {
              return {
                ...collection,
                ...newCollection
              }
            }
            return collection
          })

          query.setQueryData(queryKeys.collection, newCollections)
        } else {
          query.refetchQueries(queryKeys.collection)
        }
      },
      onError: (err: any) => {
        inputEl.current?.focus()

        if (err?.response?.status === 400) {
          createNotification('error', 'Collection name already exists')
        } else {
          createNotification('error', 'Error editing collection')
        }
      }
    }
  )

  const handleEmojiSelect = (emoji: BaseEmoji) => {
    setSelectEmoji(emoji.colons)
  }

  useEffect(() => {
    setEmoji(false)
  }, [selectEmoji])

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!collectionName.value.trim()) {
      inputEl.current?.focus()
      return
    }

    if (initial) {
      mutateEdit({
        idCollection: initial.id,
        name: collectionName.value,
        emoji: selectEmoji
      })
    } else {
      mutatePost({
        name: collectionName.value,
        emoji: selectEmoji
      })
    }
  }

  useEffect(() => {
    if (!showForm && !initial) {
      collectionName.setValue('')
      setSelectEmoji(':muscle::skin-tone-4:')
    }
  }, [showForm, collectionName, initial])

  useEffect(() => {
    if (showForm) inputEl.current?.focus()
  }, [inputEl, showForm])

  return (
    <Modal
      size="min(480px, 80%)"
      setCloseModal={setShowForm}
      modalIsOpen={showForm}
      styleModalContent={{
        background: 'transparent',
        overflow: 'visible'
      }}
    >
      <FormStyled onSubmit={handleSubmit}>
        <button
          type="button"
          className="close-form"
          onClick={() => setShowForm(false)}
          disabled={loadingPost || lodingEdit}
        >
          <FaTimes size={16} />
        </button>

        <button
          type="button"
          className="select-emoji"
          onClick={() => setEmoji(prev => !prev)}
        >
          <Emoji emoji={selectEmoji} size={18} native />
        </button>

        {emoji && (
          <Picker
            native
            title="Pick your emoji"
            emoji="point_up"
            theme="dark"
            style={{
              width: '350px',
              position: 'absolute',
              left: '45px',
              boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.1)'
            }}
            color="#11EEDD"
            onSelect={handleEmojiSelect}
          />
        )}

        <input
          ref={inputEl}
          type="text"
          placeholder="Add collection"
          value={collectionName.value}
          onChange={collectionName.handleChange}
          disabled={loadingPost || lodingEdit}
        />

        <button
          className="button-submit"
          type="submit"
          disabled={loadingPost || lodingEdit}
        >
          {loadingPost || lodingEdit ? (
            <LoadingIndicator />
          ) : initial ? (
            <FaEdit />
          ) : (
            <FaPlus />
          )}
        </button>
      </FormStyled>
    </Modal>
  )
}

export default FormCollection
