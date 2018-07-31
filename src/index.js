import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import '@atlaskit/css-reset'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import initialData from './initial-data'
import Column from './column'
import styled from 'react-emotion';

const Container = styled('div')`
  display: flex;
`

class App extends Component {
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
                const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

                return <Column key={column.id} column={column} tasks={tasks} index={index} />
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
