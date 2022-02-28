import React, { useRef } from 'react'
import { useDragLayer, XYCoord } from 'react-dnd'
import { CSSTransition } from 'react-transition-group'
import Todo from '..'
import { LayerItem, TodoDragLayerWrapper } from './style'

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset) return { display: 'none' }

  let { x, y } = currentOffset
  const transform = `translate(${x}px, ${y}px)`
  return { transform }
}
const TodoDragLayer: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)
  const obj = useDragLayer(monitor => ({
    item: monitor.getItem(),
    itemType: monitor.getItemType(),
    initialOffset: monitor.getInitialSourceClientOffset(),
    currentOffset: monitor.getSourceClientOffset(),
    isDragging: monitor.isDragging()
  }))

  function renderItem() {
    if (obj.itemType) {
      return (
        <LayerItem
          className="layer-item"
          style={{
            width: `${obj.item.ref.offsetWidth}px`,
            height: `${obj.item.ref.offsetHeight}px`
          }}
        >
          <Todo todo={obj.item.todo} index={1} />
        </LayerItem>
      )
    }
  }

  if (!obj.item) return null

  return (
    <CSSTransition
      in={
        obj.isDragging &&
        (obj.itemType === 'TODO' || obj.itemType === 'TODO_COMPLETED')
      }
      timeout={300}
      classNames="fade"
      nodeRef={ref}
      unmountOnExit
    >
      <TodoDragLayerWrapper ref={ref}>
        <div style={getItemStyles(obj.initialOffset, obj.currentOffset)}>
          {renderItem()}
        </div>
      </TodoDragLayerWrapper>
    </CSSTransition>
  )
}

export default TodoDragLayer
