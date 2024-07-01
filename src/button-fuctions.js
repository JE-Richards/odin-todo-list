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

    WorkspaceManager.currentWorkspace.addNewTodo(new Todo(title, desc, dueDate, priority));
}

function addNewWorkspace() {
    const name = document.getElementById('newWorkspaceName').value;

    WorkspaceManager.addToWorkspace(new Workspace(name));
    WorkspaceManager.setCurrentWorkspace(name);
}

export { cancelBtn, addNewTodo, addNewWorkspace }