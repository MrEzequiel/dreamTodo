import React, { useContext, useEffect } from 'react'
import { TodoContext } from '../../../../../context/TodoListContext'
import { Types } from '../../../../../functions/reducers'
import useForm from '../../../../../hooks/useForm'
import ITodo from '../../../../../interfaces/Todo'
import Modal from '../../../../../components/Modal'

import * as s from './style'
import Button from '../../../../../styles/Button'
import Title from '../../../../../styles/Title'
import TodoPageContext from '../../../../../context/TodoPageContext'

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
  const { id } = useContext(TodoPageContext)
  const titleField = useForm(true, todo?.name ?? '')
  const descriptionField = useForm(false, todo?.description ?? '')

  function validateLink(value: string): string | null {
    if (!value.trim()) {
      return null
    }

    const regex =
      /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/gi

    const spliceValues = value.split(';').map(v => v.trim())

    if (!spliceValues.length) {
      return 'Keep the pattern'
    } else if (!spliceValues.every(valueLink => valueLink.match(regex))) {
      return 'Link Invalid'
    } else {
      return null
    }
  }

  const initialValue = todo?.expanded?.links
    ? todo?.expanded?.links.join(';')
    : ''
  const linkField = useForm(false, initialValue, 'link', validateLink)

  const { dispatch } = useContext(TodoContext)

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    if (
      !(titleField.validate(titleField.value) && !validateLink(linkField.value))
    ) {
      return
    }

    const links = linkField.value.split(';')

    if (type === 'add') {
      dispatch({
        type: Types.Add,
        payload: {
          id_collection: id,
          name: titleField.value,
          description: descriptionField.value,
          expanded: !linkField.value ? undefined : { links }
        }
      })
    } else if (todo?.id && setEdit) {
      dispatch({
        type: Types.Edit,
        payload: {
          id_collection: id,
          id: todo.id,
          name: titleField.value,
          description: descriptionField.value,
          expanded: !linkField.value ? undefined : { links }
        }
      })

      setEdit(false)
    }

    closeModal(false)
  }

  useEffect(() => {
    if (setEdit) return () => setEdit(false)

    if (!modalIsOpen && !todo) {
      descriptionField.setValue('')
      titleField.setValue('')
      linkField.setValue('')
    }
  }, [setEdit, modalIsOpen, todo, descriptionField, titleField, linkField])

  // TODO: style for fields with error
  // https://www.bezkoder.com/wp-content/uploads/2021/10/react-form-validation-example-formik-yup.png
  return (
    <Modal
      size="min(500px, 90%)"
      setCloseModal={closeModal}
      modalIsOpen={modalIsOpen}
    >
      <Title size="2.2rem" separator>
        Add a task
      </Title>

      <s.FormAddTodo onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title *"
          value={titleField.value}
          onChange={titleField.handleChange}
          onBlur={titleField.handleBlur}
        />
        {titleField.error && <p>{titleField.error}</p>}

        <textarea
          placeholder="Description"
          className="description"
          value={descriptionField.value}
          onChange={descriptionField.handleChange}
        />

        <div className="links">
          <input
            type="text"
            placeholder="Links"
            value={linkField.value}
            onChange={linkField.handleChange}
            onBlur={linkField.handleBlur}
          />
          {linkField.error && <p>{linkField.error}</p>}

          <p>Separate links with ; (semicolon)</p>
        </div>

        <s.ButtonsModal>
          <Button type="submit">{type}</Button>
          <Button type="button" onClick={() => closeModal(false)} outlined>
            Cancel
          </Button>
        </s.ButtonsModal>
      </s.FormAddTodo>
    </Modal>
  )
}

export default ModalForm
