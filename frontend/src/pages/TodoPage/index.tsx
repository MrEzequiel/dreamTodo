import React from 'react'
import { FaAngleLeft } from 'react-icons/fa'
import FormTodo from './components/FormTodo'
import TodoList from './components/TodoList'

import * as s from './style'

interface Props {}

const TodoPage = (props: Props) => {
  return (
    <>
      <s.TitleStyle>
        <button type="button">
          <FaAngleLeft size={20} />
        </button>
        To Do
      </s.TitleStyle>

      <FormTodo />
      <TodoList />
    </>
  )
}

export default TodoPage
