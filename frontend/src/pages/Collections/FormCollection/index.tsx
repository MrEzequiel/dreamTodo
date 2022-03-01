import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FaEdit, FaPlus, FaTimes } from 'react-icons/fa'
import { TodoContext } from '../../../context/TodoListContext'
import { Types } from '../../../functions/reducers'
import useForm from '../../../hooks/useForm'
import { FormStyled } from './style'

import 'emoji-mart/css/emoji-mart.css'
import { BaseEmoji, Emoji, Picker } from 'emoji-mart'
import ICollection from '../../../interfaces/Collection'
import Modal from '../../../components/Modal'

interface IProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
  showForm: boolean
  initial?: ICollection
  callback?: (editedCollection: ICollection) => void
}

const FormCollection: React.FC<IProps> = ({
  setShowForm,
  showForm,
  initial,
  callback
}) => {
  const { dispatch } = useContext(TodoContext)
  const inputEl = useRef<HTMLInputElement>(null)
  const collectionName = useForm({ initialValue: initial?.title })

  const [emoji, setEmoji] = useState(false)
  const [selectEmoji, setSelectEmoji] = useState(
    initial?.emoji ?? ':muscle::skin-tone-4:'
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

    if (initial && callback) {
      const editedCollection: ICollection = {
        ...initial,
        title: collectionName.value,
        emoji: selectEmoji
      }
      callback(editedCollection)
    } else {
      dispatch({
        type: Types.Add_Collection,
        payload: { title: collectionName.value, emoji: selectEmoji }
      })
    }

    setShowForm(false)
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
        />

        <button className="button-submit" type="submit">
          {initial ? <FaEdit /> : <FaPlus />}
        </button>
      </FormStyled>
    </Modal>
  )
}

export default FormCollection
