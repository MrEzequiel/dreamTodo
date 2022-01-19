import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TodoContext } from '../../../../context/TodoListContext'
import Todo from '../Todo'
import EmptyTodo from './EmptyTodo'
import * as s from './styles'

const TodoList: React.FC = () => {
  const { id } = useParams()
  const { state } = useContext(TodoContext)
  const todos = state.collections.find(
    colleection => colleection.id === id
  )?.todo

  if (!todos) return null
  if (!todos.length) return <EmptyTodo />

  const todosCompleted = todos.filter(todo => todo.complete)
  const todosNotCompleted = todos.filter(todo => !todo.complete)

  return (
    <s.TodoWrapper>
      {!!todosNotCompleted.length && (
        <>
          <h2>
            {todosNotCompleted.length > 1 ? 'Tasks' : 'Task'} -{' '}
            <strong>{todosNotCompleted.length}</strong>
          </h2>

          <ul>
            {todosNotCompleted.map(todo => (
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
