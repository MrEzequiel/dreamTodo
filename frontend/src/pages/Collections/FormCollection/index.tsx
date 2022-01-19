import React, { useContext, useEffect, useRef } from 'react'
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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()

    if (!collectionName.value.trim()) {
      inputEl.current?.focus()
      return
    }

    //TODO: add collection from context
    dispatch({
      type: Types.Add_Collection,
      payload: { title: collectionName.value }
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
