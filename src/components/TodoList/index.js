import Todo from '../Todo'
import * as s from './styles'

function TodoList({ todos }) {
  console.log(todos)

  return (
    <s.TodoWrapper>
      <h2>
        {todos.length > 1 ? 'Tasks' : 'Task'} - {todos.length}
      </h2>

      <s.TodoListWrapper>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </s.TodoListWrapper>
    </s.TodoWrapper>
  )
}

export default TodoList
