import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import styled from 'react-emotion'
import '@atlaskit/css-reset'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import initialData from './initial-data'
import Column from './column'

const Container = styled('div')`
  display: flex;
`

class InnerList extends PureComponent {
  propTypes = {
    column: PropTypes.shape({
      id: PropTypes.string.isRequired
    }).isRequired,
    index: PropTypes.number.isRequired,
    taskMap: PropTypes.objectOf(PropTypes.shape({
      id: PropTypes.string.isRequired
    })).isRequired
  }

  render() {
    const { column, taskMap, index } = this.props
    const tasks = column.taskIds.map(taskId => taskMap[taskId])
    return <Column column={column} tasks={tasks} index={index} />
  }
}

class App extends PureComponent {
  state = initialData

  onDragEnd = result => {
    const { destination, source, draggableId, type } = result

    if (!destination) {
      return
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return
    }

    if (type === 'column') {
      const newColumnOrder = [...this.state.columnOrder]
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      const newState = {
        ...this.state,
        columnOrder: newColumnOrder
      }

      this.setState(newState)
      return
    }

    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = [...start.taskIds]
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds
      }

      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn
        }
      }

      this.setState(newState)
    } else {
      const startTasksIds = [...start.taskIds]
      startTasksIds.splice(source.index, 1)
      const newStart = {
        ...start,
        taskIds: startTasksIds
      }

      const finishTaskIds = [...finish.taskIds]
      finishTaskIds.splice(destination.index, 0, draggableId)
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds
      }

      const newState = {
        ...this.state.columns,
        columns: {
          ...this.state.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish
        }
      }
      this.setState(newState)
    }
  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="all-columns" direction="horizontal" type="column">
          {({ droppableProps, innerRef, placeholder }) => (
            <Container {...droppableProps} innerRef={innerRef}>
              {this.state.columnOrder.map((columnId, index) => {
                const column = this.state.columns[columnId]

                return <InnerList key={column.id} column={column} taskMap={this.state.tasks} index={index} />
              })}
              {placeholder}
            </Container>
          )}
        </Droppable>
      </DragDropContext>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
