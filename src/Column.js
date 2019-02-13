import React, { Component } from 'react'
// import styled from 'styled-components'
import Task from './Task'
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { connect } from 'react-redux';

class InnerList extends Component {
    shouldComponentUpdate = (nextProps) => {
        if(nextProps.tasks === this.props.tasks) {
            return false;
        }
        return true;
    }

    render () {
        // placeholder card if no task
        if( this.props.tasks.length === 0 ){
            return (
                <div className="card card-body">
                    <div className="card-text text-secondary">
                        Drop a task here or create a new task
                    </div>
                </div>
            )
        }

        // returns tasks
        return this.props.tasks.map( (task, index) => (
        <Task key={task.id} task={task} index={index} />
        ));   
    }
}

export class Column extends Component {
    state = {
        newTask: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const taskInfo = {
            ...this.state,
            columnId: this.props.column.id
        }

        // appending the new task
        this.props.addTask(taskInfo);
        
        // empty the new task
        this.setState({
            newTask: ''
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleDeleteColumn = (e) => {
        this.props.deleteColumn(e.target.id)
    }

    render() {
        
    return (
        <Draggable 
            draggableId={this.props.column.id} index={this.props.index} >
            
            { (provided) => (
                // column 
                <div 
                    className='card m-1'
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    style={{
                        // width attribute doesn't seem to work
                        minWidth: '300px',
                        maxWidth: '300px'
                    }}
                >
                    <div className="card-body">
                        {/* column title */}
                        <div className='card-title'
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                            {...provided.dragHandleProps}>
                            <h5>{this.props.column.title}</h5>
                            <button 
                                style={{
                                    width: '25px',
                                    height: '25px',
                                    padding: '0px'
                                }}
                                className='btn btn-danger btn-sm'
                                onClick={this.handleDeleteColumn} id={this.props.column.id}><i className="material-icons" id={this.props.column.id}>delete_forever</i></button>
                        </div>

                        {/* droppable task list */}
                        <Droppable 
                            droppableId={this.props.column.id}
                            type='task'
                            >
                            { (provided, snapshot) => (
                                <div
                                    style={{
                                        minHeight: '200px'
                                    }}
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <InnerList tasks={this.props.tasks} />
                                    {provided.placeholder}
                                </div>
                            )}   
                        </Droppable>
                    </div> 
                    
                        
                    {/* Add task form */}
                    <form className='mt-auto'
                        onSubmit={this.handleSubmit}>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text"><i className="material-icons">add</i></span>
                            </div>
                            <input type="text" placeholder="Add task" id="newTask" value={this.state.newTask} className="validate form-control" onChange={this.handleChange} required />
                        </div>
                    </form>

                </div>
            )}
        </Draggable>
        
    )
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (taskInfo) => dispatch({type: 'ADD_TASK', taskInfo}),
        deleteColumn: (columnId) => dispatch({type: 'DELETE_COLUMN', columnId})
    }
}

export default connect(null, mapDispatchToProps)(Column)
