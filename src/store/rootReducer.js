import initState from '../initial-data'

// trivial way to set task and column ids
let taskIdNumber = 12;  
let columnIdNumber = 4;
const rootReducer = (state = initState, action) => {
    switch (action.type){
        case 'ON_DRAG_END': {
            const {destination, source, draggableId, type} = action.result;
            
            // no destination
            if(!destination) {
                return state;
            }

            //if no change
            if (
                destination.droppableId === source.droppableId &&
                destination.index === source.index
            ) {
                return state;
            }

            //column change
            if( type === 'column') {
                const newColumnOrder = Array.from(state.columnOrder);
                newColumnOrder.splice(source.index, 1);
                newColumnOrder.splice(destination.index, 0, draggableId);

                const newState = {
                    ...state,
                    columnOrder: newColumnOrder
                };

                return newState;
            }

            //reordered required
            const start = state.columns[source.droppableId];
            const finish = state.columns[destination.droppableId];

            //within same column
            if( start === finish ){
                const newTaskIds = Array.from(start.taskIds);
                newTaskIds.splice(source.index, 1);
                newTaskIds.splice(destination.index, 0, draggableId);

                const newColumn = {
                    ...start,
                    taskIds: newTaskIds
                }

                const newState = {
                    ...state,
                    columns: {
                        ...state.columns,
                        [newColumn.id]: newColumn
                    }
                }
                return newState;
            }

            //different columns 
            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1);
            const newStart = {
                ...start,
                taskIds: startTaskIds
            }

            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            const newFinish = {
                ...finish,
                taskIds: finishTaskIds
            }
            
            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish
                }
            }
            return newState; 
        }

        case 'ADD_TASK': {

            // trivial way to assign task's id
            let taskId = `task-${taskIdNumber}`;
            taskIdNumber++;  

            // appending the new task
            const newTask = {
                [taskId]: {id: taskId, content: action.taskInfo.newTask}
            }

            // new state
            const newState = {
                ...state,
                tasks: {
                    ...state.tasks,
                    ...newTask
                },
                columns: {
                    ...state.columns,
                    [action.taskInfo.columnId]: {
                        ...state.columns[action.taskInfo.columnId],
                        taskIds: [
                            ...state.columns[action.taskInfo.columnId].taskIds,
                            taskId
                        ]
                    }
                }
            }

            return newState;    
        }
        case 'ADD_COLUMN': {
            // trivial way to assign columns's id
            let columnId = `column-${columnIdNumber}`;
            columnIdNumber++;  

            // appending the new column
            const newColumn = {
                [columnId]: {
                    id: columnId,
                    title: action.columnInfo,
                    taskIds: []
                }
            }

            // new state
            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    ...newColumn
                },
                columnOrder: [...state.columnOrder, columnId]
            }
            return newState;
        }
        case 'DELETE_TASK': {
            // new tasks
            const newTasks = state.tasks;
            delete newTasks[action.taskId];

            // new columns
            const newColumns = state.columns;
            for (var column in state.columns){
                newColumns[column] = {
                    ...newColumns[column],
                    taskIds: newColumns[column].taskIds.filter( (id) => id !== action.taskId)
                }
            }

            // new state
            const newState = {
                ...state,
                tasks: newTasks,
                columns: newColumns
            }

            return newState;
        }
        case 'DELETE_COLUMN': {
            const {columnId} = action;
            
            // new columnOrder
            const newColumnOrder = state.columnOrder.filter( (id) => id !== columnId);

            // new tasks
            const taskIdsToDelete = state.columns[columnId].taskIds;

            const newTasks = state.tasks;
            for(let i = 0; i < taskIdsToDelete.length; i++){
                delete newTasks[taskIdsToDelete[i]];
            }

            // new columns
            const newColumns = state.columns;
            delete newColumns[columnId]
            
            // new state
            const newState = {
                // ...state is added in case other data is added in the future.
                ...state,
                tasks: newTasks,
                columns: newColumns,
                columnOrder: newColumnOrder
            }

            return newState;
        }
        default:
            return state;
    }
}

export default rootReducer