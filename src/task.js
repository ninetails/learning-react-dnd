import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'

const Container = styled('div')`
  border: 1px solid lightgrey;
  border-radius: 2px;
  margin-bottom: 8px;
  padding: 8px;
`

const Task = ({ task }) => <Container>{task.content}</Container>

Task.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string
  }).isRequired
}

export default Task
