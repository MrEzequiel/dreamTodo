import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { TodoContext } from '../../../context/TodoListContext'
import { Types } from '../../../functions/reducers'
import useForm from '../../../hooks/useForm'
import { ModalWrapper } from '../../../styles/Form'
import { FormStyled } from './style'

import 'emoji-mart/css/emoji-mart.css'
import { EmojiData, BaseEmoji, Picker } from 'emoji-mart'

interface IProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

const FormCollection: React.FC<IProps> = ({ setShowForm }) => {
  const { dispatch } = useContext(TodoContext)
  const inputEl = useRef<HTMLInputElement>(null)
  const collectionName = useForm()

  const [emoji, setEmoji] = useState(false)
  const [selectEmoji, setSelectEmoji] = useState<BaseEmoji>({
    id: 'muscle',
    name: 'Flexed Biceps',
    colons: ':muscle::skin-tone-4:',
    emoticons: [],
    unified: '1f4aa-1f3fd',
    skin: 4,
    native: '💪🏽'
  })

  const handleEmojiSelect = (emoji: BaseEmoji) => {
    setSelectEmoji(emoji)
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

    dispatch({
      type: Types.Add_Collection,
      payload: { title: collectionName.value, emoji: selectEmoji }
    })
    setShowForm(false)
  }

  useEffect(() => {
    inputEl.current?.focus()
  }, [])

  return (
    <ModalWrapper>
      <FormStyled onSubmit={handleSubmit}>
        <button
          type="button"
          className="close-form"
          onClick={() => setShowForm(false)}
        >
          <FaTimes size={15} />
        </button>

        <button
          type="button"
          className="select-emoji"
          onClick={() => setEmoji(prev => !prev)}
        >
          {selectEmoji.native}
        </button>

        {emoji && (
          <Picker
            set="apple"
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
          onChange={collectionName.handleChange}
        />

        <button className="button-submit" type="submit">
          <FaPlus />
        </button>
      </FormStyled>
    </ModalWrapper>
  )
}

export default FormCollection
