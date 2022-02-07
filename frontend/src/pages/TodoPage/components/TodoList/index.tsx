import { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { TodoContext } from '../../../../context/TodoListContext'
import TodoPageContext from '../../../../context/TodoPageContext'
import Todo from '../Todo'
import EmptyTodo from './EmptyTodo'
import * as s from './styles'

const TodoList: React.FC = () => {
  const { thisCollection } = useContext(TodoPageContext)
  const todos = thisCollection.todo

  if (!todos.complete.length && !todos.incomplete.length) return <EmptyTodo />

  return (
    <s.TodoWrapper>
      {!!todos.incomplete.length && (
        <>
          <h2>
            {todos.incomplete.length > 1 ? 'Tasks' : 'Task'} -{' '}
            <strong>{todos.incomplete.length}</strong>
          </h2>

          <ul>
            {todos.incomplete.map((todo, index) => (
              <Todo key={todo.id} todo={todo} index={index} />
            ))}
          </ul>
        </>
      )}

      {!!todos.complete.length && (
        <>
          <h2>
            Completed - <strong>{todos.complete.length}</strong>
          </h2>

          <ul>
            {todos.complete.map((todo, index) => (
              <Todo key={todo.id} todo={todo} index={index} />
            ))}
          </ul>
        </>
      )}
    </s.TodoWrapper>
  )
}

export default TodoList
