import { format, parse } from 'date-fns';

function prepopulateWorkspaceEdit(workspace) {
    document.getElementById('editWorkspaceName').value = workspace.name;
}

function prepopulateTodoEdit(todo) {
    document.getElementById('editTodoTitle').value = todo.title;
    document.getElementById('editTodoDesc').value = todo.description;

    const dueDate = todo.dueDate;
    if (dueDate) {
        const parsedDate = parse(dueDate, 'dd MMM yyyy', new Date());
        const formattedDate = format(parsedDate, 'yyyy-MM-dd');
        document.getElementById('editTodoDueDate').value = formattedDate;
    }

    const todoPriority = todo.priority;
    if (todoPriority) {
        const radio = document.querySelector(`input[name="editTodoPriority"][value=${todoPriority}]`);
        if (radio) {
            radio.checked = 'checked';
        }
    }
}

export { prepopulateWorkspaceEdit, prepopulateTodoEdit }