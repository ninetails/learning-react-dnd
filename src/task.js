import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled('div')`
  background-color: ${({ isDragging }) => (isDragging ? 'lightgreen' : 'white')};
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 8px;
  padding: 8px;
`

const Task = ({ index, task }) => (
  <Draggable draggableId={task.id} index={index}>
    {({ draggableProps, dragHandleProps, innerRef }, { isDragging }) => (
      <Container
        {...draggableProps}
        {...dragHandleProps}
        innerRef={innerRef}
        isDragging={isDragging}
        >
        {task.content}
      </Container>
    )}
  </Draggable>
)

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string
  }).isRequired
}

export default Task
