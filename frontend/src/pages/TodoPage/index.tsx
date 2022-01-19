import React, { useContext, useEffect } from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
import FormTodo from './components/FormTodo'
import TodoList from './components/TodoList'

import * as s from './style'

const TodoPage = () => {
  return (
    <>
      <s.TitleStyle>
        <NavLink to="" end>
          <button type="button">
            <FaAngleLeft size={20} />
          </button>
        </NavLink>
        To Do
      </s.TitleStyle>

      <FormTodo />
      <TodoList />
    </>
  )
}

export default TodoPage
