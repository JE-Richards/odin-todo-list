import { Todo } from './todo.js';
import { Workspace, WorkspaceManager } from './workspaces.js';

function cancelForm(event) {
    const btn = event.target;
    const form = btn.closest('form');
    const dialog = btn.closest('dialog');

    form.reset();
    dialog.close();
}

function newTodoSubmit() {
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

function newWorkspaceSubmit() {
    const name = document.getElementById('newWorkspaceName').value;

    WorkspaceManager.addToWorkspace(new Workspace(name));
    WorkspaceManager.setCurrentWorkspace(name);
}

// function openNewWorkspaceDialog() {
//     const newWorkspaceDialog = document.getElementById('newWorkspaceDialog');
//     newWorkspaceDialog.showModal();
// }

// key: value pair takes the form of (dialog[id]: corresponding function)
const formSubmitFunctions = {
    newTodoForm: newTodoSubmit,
    newWorkspaceForm: newWorkspaceSubmit,
};

export { cancelForm, formSubmitFunctions }