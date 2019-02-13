import React, { Component } from 'react'
// import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'
import { connect } from 'react-redux'

export class Task extends Component {

    handleDeleteTask = (e) => {
        this.props.deleteTask(e.target.id)
    }

  render() {
    return (
        <Draggable 
            draggableId={this.props.task.id} 
            index={this.props.index}
        >
            { (provided, snapshot) => (         
                <div 
                className='card card-body'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    
                        <div className='card-text' style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                        <div>{this.props.task.content}</div>
                        <button 
                            style={{
                                width: '25px',
                                height: '25px',
                                padding: '0px'
                            }}
                            className='btn btn-danger btn-sm' 
                            onClick={this.handleDeleteTask} id={this.props.task.id}><i className="material-icons" id={this.props.task.id}>delete_forever</i></button>
                        
                        </div>
                        
                </div>        
            )}
        </Draggable>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteTask: (taskId) => dispatch({type: 'DELETE_TASK', taskId})
    }
}

export default connect(null, mapDispatchToProps)(Task)