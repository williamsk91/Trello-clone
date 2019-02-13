import React from 'react';
import Column from './Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { connect } from 'react-redux'


// Optimizing the dnd
class InnerList extends React.PureComponent {
    render () {
        const { column, taskMap, index } = this.props;
        const tasks = column.taskIds.map( (taskId) => taskMap[taskId]);
        return <Column column={column} tasks={tasks} index={index} />
    }
}

class App extends React.Component {

    state = {
        newColumn: ''
    }

    onDragEnd = (result) => {
        // console.log(result)
        this.props.onDragEnd(result);
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);

        // appending the new column
        this.props.addColumn(this.state.newColumn);
        
        // empty the new column
        this.setState({
            newColumn: ''
        })
    }

    render() {
        return (
            <DragDropContext 
                onDragEnd={this.onDragEnd}
            >
            <Droppable droppableId='all-columns' direction='horizontal' type='column'>
                { (provided) => (
                    <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        style={{
                            display: 'flex'
                        }}
                    >
                        {this.props.data.columnOrder.map( (columnId, index) => {
                            const column = this.props.data.columns[columnId];

                            return <InnerList key={column.id} column={column} taskMap={this.props.data.tasks} index={index}/>
                        })}
                        {provided.placeholder}
                        
                        {/* Add column form */}
                        <form onSubmit={this.handleSubmit} className='m-1'
                            style={{
                                minWidth: '200px'
                            }}
                        >
                            <div className="input-group">
                                <div className="input-group-prepend">
                                    <span className="input-group-text"><i className="material-icons">add</i></span>
                                </div>
                                <input type="text" placeholder="Add Column" id="newColumn" value={this.state.newColumn} className="validate form-control" onChange={this.handleChange} required/>
                            </div>
                        </form>
                        
                    </div>
                )}
            </Droppable>
            </DragDropContext>    
        )
    }
}

const mapStateToProps = (state) => {
    return {
        data: state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onDragEnd: (result) => dispatch({type: 'ON_DRAG_END', result}),
        addColumn: (columnInfo) => dispatch({type: 'ADD_COLUMN', columnInfo})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App) 