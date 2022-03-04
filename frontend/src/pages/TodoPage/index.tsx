import { Emoji } from 'emoji-mart'
import React, { useContext, useEffect } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { FaAngleLeft } from 'react-icons/fa'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { TodoContext } from '../../context/TodoListContext'
import TodoPageContext from '../../context/TodoPageContext'
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
    if (!thisCollection && id) navigate('/')
  }, [thisCollection, navigate, id])

  let contextTodoPage
  if (thisCollection && id) {
    contextTodoPage = {
      id,
      thisCollection
    }
  } else {
    navigate('/')
    return null
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <TodoPageContext.Provider value={contextTodoPage}>
        <s.TitleStyle>
          <NavLink to="/" end>
            <button type="button">
              <FaAngleLeft size={20} />
            </button>
          </NavLink>

          <h1>
            <Emoji emoji={thisCollection?.emoji} size={32} native />
            {thisCollection?.title}
          </h1>
        </s.TitleStyle>

        <FormTodo />
        <TodoList />
      </TodoPageContext.Provider>
    </DndProvider>
  )
}

export default TodoPage
