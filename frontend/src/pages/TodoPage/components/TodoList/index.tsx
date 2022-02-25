import React, { useContext } from 'react'
import TodoPageContext from '../../../../context/TodoPageContext'
import Todo from '../Todo'
import TodoDragLayer from '../Todo/TodoDragLayer'
import EmptyTodo from './EmptyTodo'
import FlipMove from 'react-flip-move'

import * as s from './styles'

const TodoList: React.FC = () => {
  const { thisCollection } = useContext(TodoPageContext)
  const todos = thisCollection.todo

  if (!todos.complete.length && !todos.incomplete.length) return <EmptyTodo />

  const enterAnimation: FlipMove.AnimationProp = {
    from: { transform: 'translateX(-20px)', opacity: '0' },
    to: { transform: 'initial', opacity: '1' }
  }

  const leaveAnimation: FlipMove.AnimationProp = {
    from: { transform: 'translateX(0)', opacity: '1' },
    to: { transform: 'translateX(-20px)', opacity: '0' }
  }

  return (
    <s.TodoWrapper>
      {!!todos.incomplete.length && (
        <>
          <h2>
            {todos.incomplete.length > 1 ? 'Tasks' : 'Task'} -{' '}
            <strong>{todos.incomplete.length}</strong>
          </h2>

          <FlipMove
            typeName="ul"
            enterAnimation={enterAnimation}
            leaveAnimation={leaveAnimation}
            duration={400}
            easing="ease"
          >
            {todos.incomplete.map((todo, index) => (
              <Todo key={todo.id} todo={todo} index={index} />
            ))}
          </FlipMove>
        </>
      )}

      {!!todos.complete.length && (
        <>
          <h2>
            Completed - <strong>{todos.complete.length}</strong>
          </h2>

          <FlipMove
            typeName="ul"
            enterAnimation={enterAnimation}
            leaveAnimation={leaveAnimation}
            duration={400}
            easing="ease"
          >
            {todos.complete.map((todo, index) => (
              <Todo key={todo.id} todo={todo} index={index} />
            ))}
          </FlipMove>
        </>
      )}

      {/* Drag n drop layer */}
      <TodoDragLayer />
    </s.TodoWrapper>
  )
}

export default TodoList
