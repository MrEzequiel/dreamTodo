import useTodo from '../../hooks/useTodo'
import Todo from '../Todo'
import EmptyTodo from './EmptyTodo'
import * as s from './styles'

function TodoList() {
  const { todos } = useTodo()

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
