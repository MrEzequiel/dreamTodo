import React, { useContext } from 'react'
import { TodoContext } from '../../../context/TodoListContext'
import { Types } from '../../../functions/reducers'
import useForm from '../../../hooks/useForm'

import * as s from './style'

interface Props {
  closeModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal: React.FC<Props> = ({ closeModal }) => {
  const titleField = useForm()
  const descriptionField = useForm(false)
  const { dispatch } = useContext(TodoContext)

  function validateLink(value: string): string | null {
    const regex =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi

    const spliceValues = value.split(';').map(v => v.trim())

    if (!spliceValues.length) {
      return 'Keep the pattern'
    } else if (!spliceValues.every(valueLink => !regex.test(valueLink))) {
      return 'Link Invalid'
    } else {
      return null
    }
  }

  const linkField = useForm(false, 'link', validateLink)

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    if (
      titleField.validate(titleField.value) &&
      !validateLink(linkField.value)
    ) {
      dispatch({
        type: Types.Add,
        payload: {
          name: titleField.value,
          description: descriptionField.value,
          expanded: {
            links: linkField.value.split(';').map(v => v.trim())
          }
        }
      })

      closeModal(false)
    }
  }

  return (
    <s.ModalWrapper>
      <s.ModalContent>
        <h2>Add a task</h2>

        <s.FormAddTodo onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title *"
            onChange={titleField.handleChange}
            onBlur={titleField.handleBlur}
          />
          {titleField.error && <p>{titleField.error}</p>}

          <input
            type="text"
            placeholder="Description"
            className="description"
            onChange={descriptionField.handleChange}
          />

          <div className="links">
            <input
              type="text"
              placeholder="Links"
              onChange={linkField.handleChange}
              onBlur={linkField.handleBlur}
            />
            {linkField.error && <p>{linkField.error}</p>}

            <p>Separate links with ; (semicolon)</p>
          </div>

          <s.ButtonsModal>
            <button type="submit" className="add">
              Add
            </button>
            <button
              type="button"
              className="cancel"
              onClick={() => closeModal(false)}
            >
              Cancel
            </button>
          </s.ButtonsModal>
        </s.FormAddTodo>
      </s.ModalContent>
    </s.ModalWrapper>
  )
}

export default Modal
