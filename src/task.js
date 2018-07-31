import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled('div')`
  background-color: ${({ isDragDisabled, isDragging }) => (isDragDisabled ? 'lightgrey' : isDragging ? 'lightgreen' : 'white')};
  border-radius: 2px;
  border: 1px solid lightgrey;
  display: flex;
  margin-bottom: 8px;
  padding: 8px;
`

const Task = ({ index, task }) => {
  const isDragDisabled = task.id === 'task-1'

  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {({ draggableProps, dragHandleProps, innerRef }, { isDragging }) => (
        <Container
          {...draggableProps}
          {...dragHandleProps}
          innerRef={innerRef}
          isDragging={isDragging}
          isDragDisabled={isDragDisabled}
        >
          {task.content}
        </Container>
      )}
    </Draggable>
  )
}

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string
  }).isRequired
}

export default Task
