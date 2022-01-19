import Picker, { IEmojiData } from 'emoji-picker-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { TodoContext } from '../../../context/TodoListContext'
import { Types } from '../../../functions/reducers'
import useForm from '../../../hooks/useForm'
import { ModalWrapper } from '../../../styles/Form'
import { FormStyled } from './style'

interface IProps {
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>
}

const FormCollection: React.FC<IProps> = ({ setShowForm }) => {
  const { dispatch } = useContext(TodoContext)
  const inputEl = useRef<HTMLInputElement>(null)
  const collectionName = useForm()

  const [emoji, setEmoji] = useState(false)
  const [chosenEmoji, setChosenEmoji] = useState<IEmojiData>({
    unified: '1f4aa-1f3fe',
    emoji: '💪🏾',
    originalUnified: '1f4aa',
    names: ['flexed biceps', 'muscle'],
    activeSkinTone: 'neutral'
  })

  const onEmojiClick = (event: any, emojiObject: IEmojiData) => {
    setChosenEmoji(emojiObject)
  }

  useEffect(() => {
    setEmoji(false)
  }, [chosenEmoji])

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!collectionName.value.trim()) {
      inputEl.current?.focus()
      return
    }

    //TODO: add collection from context
    dispatch({
      type: Types.Add_Collection,
      payload: { title: collectionName.value, emoji: chosenEmoji }
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
          className="select-emoji"
          onClick={() => setEmoji(prev => !prev)}
        >
          {chosenEmoji.emoji}
        </button>

        {emoji && (
          <Picker
            onEmojiClick={onEmojiClick}
            disableAutoFocus={true}
            disableSearchBar={true}
            pickerStyle={{
              width: '300px',
              position: 'absolute',
              left: '45px',
              boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.1)'
            }}
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
