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
            {todosNotCompleted.length}
          </h2>

          <s.TodoListWrapper>
            {todosNotCompleted.map(todo => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </s.TodoListWrapper>
        </>
      )}

      {!!todosCompleted.length && (
        <>
          <h2>Completed - {todosCompleted.length}</h2>

          <s.TodoListWrapper>
            {todosCompleted.map(todo => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </s.TodoListWrapper>
        </>
      )}
    </s.TodoWrapper>
  )
}

export default TodoList
