import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import Task from './task'

const Container = styled('div')`
  background-color: white;
  border: 1px solid lightgrey;
  border-radius: 2px;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 8px;
`
const Title = styled('h3')`
  padding: 8px;
`
const TaskList = styled('div')`
  background-color: ${({ isDraggingOver }) => (isDraggingOver ? 'skyblue' : 'inherit')};
  flex: 1;
  padding: 8px;
  transition: background-color .2s ease;
`

const Column = ({ column, index, tasks }) => (
  <Draggable draggableId={column.id} index={index}>
    {({ dragHandleProps, draggableProps, innerRef, placeholder }) => (
      <Container {...draggableProps} innerRef={innerRef}>
        <Title {...dragHandleProps}>{column.title}</Title>
        <Droppable droppableId={column.id} type="tasks">
          {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => (
            <TaskList innerRef={innerRef} {...droppableProps} isDraggingOver={isDraggingOver}>
              {tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
              {placeholder}
            </TaskList>
          )}
        </Droppable>
        {placeholder}
      </Container>
    )}
  </Draggable>
)

Column.defaultProps = {
  index: 0
}

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default Column
