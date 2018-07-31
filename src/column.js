import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import { Droppable } from 'react-beautiful-dnd'
import Task from './task'

const Container = styled('div')`
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
  background-color: ${({ isDraggingOver }) => (isDraggingOver ? 'skyblue' : 'white')};
  flex: 1;
  padding: 8px;
  transition: background-color .2s ease;
`

const Column = ({ column, isDropDisabled, tasks }) => (
  <Container>
    <Title>{column.title}</Title>
    <Droppable
      droppableId={column.id}
      isDropDisabled={isDropDisabled}
      >
      {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => (
        <TaskList innerRef={innerRef} {...droppableProps} isDraggingOver={isDraggingOver}>
          {tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
          {placeholder}
        </TaskList>
      )}
    </Droppable>
  </Container>
)

Column.defaultProps = {
  isDropDisabled: false
}

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  isDropDisabled: PropTypes.bool,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default Column
