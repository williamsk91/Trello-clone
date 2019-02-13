const initialData = {
    tasks: {
        'task-1': {id: 'task-1', content: 'Try adding a task'},
        'task-2': {id: 'task-2', content: 'you can move a task around (try moving me to the next column)'},
        'task-3': {id: 'task-3', content: "and, of course, delete task (you can delete me. Don't worry, I don't hold grudges)"},
        'task-4': {id: 'task-4', content: 'React'},
        'task-5': {id: 'task-5', content: 'Redux'},
        'task-6': {id: 'task-6', content: 'React-beautiful-dnd'},
        'task-7': {id: 'task-7', content: 'Bootstrap'},
        'task-8': {id: 'task-8', content: 'Materialize css'},
        'task-9': {id: 'task-9', content: 'This is a work in progress. Some updates might be coming in the future'},
        'task-10': {id: 'task-10', content: 'Ability to edit created task and column names'},
        'task-11': {id: 'task-11', content: 'Connect to a backend database with user authentication'}
    },
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Trello Clone',
            taskIds: ['task-1', 'task-2', 'task-3']
        },
        'column-2': {
            id: 'column-2',
            title: 'Stack',
            taskIds: ['task-4', 'task-5', 'task-6', 'task-7', 'task-8']
        },
        'column-3': {
            id: 'column-3',
            title: 'Future update',
            taskIds: ['task-9', 'task-10', 'task-11']
        }
    },
    //facilitate reordering of the columns
    columnOrder: ['column-1', 'column-2', 'column-3']
}

export default initialData