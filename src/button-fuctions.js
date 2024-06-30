import { Todo } from './todo.js';
import { Workspace, WorkspaceManager } from './workspaces.js';

function cancelBtn() {
    dialog.close();
}

function addNewTodo() {
    const title = document.getElementById('newTodoTitle').value;
    const desc = document.getElementById('newTodoDesc').value;
    const dueDate = document.getElementById('newTodoDueDate').value;
    let priority = null;

    const newTodoPriorityRadios = document.getElementsByName('newTodoPriority');
    for (let i=0; i < newTodoPriorityRadios.length; i++) {
        if (newTodoPriorityRadios[i].checked) {
            priority = newTodoPriorityRadios[i].value;
        }
    }
}

function addNewWorkspace() {
    const name = document.getElementById('newWorkspaceName').value;

    WorkspaceManager.addToWorkspace(new Workspace(name));
}

export { cancelBtn, addNewTodo, addNewWorkspace }