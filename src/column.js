import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import Task from './task'


const Container = styled('div')`
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin: 8px;
`
const Title = styled('h3')`
  padding: 8px;
`
const TaskList = styled('div')`
  padding: 8px;
`

const Column = ({ column, tasks }) => (
  <Container>
    <Title>{column.title}</Title>
    <TaskList>
      {tasks.map(task => <Task key={task.id} task={task} />)}
    </TaskList>
  </Container>
)

Column.propTypes = {
  column: PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired,
  tasks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  }).isRequired).isRequired
}

export default Column
