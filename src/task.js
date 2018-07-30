import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled('div')`
  background-color: ${({ isDragging }) => (isDragging ? 'lightgreen' : 'white')};
  border-radius: 2px;
  border: 1px solid lightgrey;
  display: flex;
  margin-bottom: 8px;
  padding: 8px;
`

const Handle = styled('div')`
  background-color: orange;
  border-radius: 4px;
  height: 20px;
  margin-right: 8px;
  width: 20px;
`

const Task = ({ index, task }) => (
  <Draggable draggableId={task.id} index={index}>
    {({ draggableProps, dragHandleProps, innerRef }, { isDragging }) => (
      <Container
        {...draggableProps}
        innerRef={innerRef}
        isDragging={isDragging}
        >
        <Handle {...dragHandleProps} />
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
