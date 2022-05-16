import React from 'react'
import Todo from '../Todo'
import EmptyTodo from './EmptyTodo'

import * as s from './styles'
import ITodo from '../../../../interfaces/Todo'

interface TodoListProps {
  list: ITodo[]
}

const TodoList: React.FC<TodoListProps> = ({ list }) => {
  if (list.length === 0) return <EmptyTodo />

  const todosIncomplete = list.filter(todo => !todo.complete)
  const todosCompleted = list.filter(todo => todo.complete)

  return (
    <s.TodoWrapper>
      {!!todosIncomplete.length && (
        <>
          <h2>
            {todosIncomplete.length > 1 ? 'Tasks' : 'Task'} -{' '}
            <strong>{todosIncomplete.length}</strong>
          </h2>

          <ul>
            {todosIncomplete.map(todo => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </ul>
        </>
      )}

      {!!todosCompleted.length && (
        <>
          <h2>
            Completed - <strong>{todosCompleted.length}</strong>
          </h2>

          <ul>
            {todosCompleted.map(todo => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </ul>
        </>
      )}
    </s.TodoWrapper>
  )
}

export default TodoList
