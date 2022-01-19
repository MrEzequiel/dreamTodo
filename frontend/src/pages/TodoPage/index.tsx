import React, { useContext, useEffect } from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { TodoContext } from '../../context/TodoListContext'
import FormTodo from './components/FormTodo'
import TodoList from './components/TodoList'

import * as s from './style'

const TodoPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const { state } = useContext(TodoContext)
  const thisCollection = state.collections.find(
    collection => collection.id === id
  )

  useEffect(() => {
    if (!thisCollection) navigate('/')
  }, [thisCollection, navigate])

  return (
    <>
      <s.TitleStyle>
        <NavLink to="/" end>
          <button type="button">
            <FaAngleLeft size={20} />
          </button>
        </NavLink>

        <h1>
          <span>{thisCollection?.emoji.native}</span>
          {thisCollection?.title}
        </h1>
      </s.TitleStyle>

      <FormTodo />
      <TodoList />
    </>
  )
}

export default TodoPage
