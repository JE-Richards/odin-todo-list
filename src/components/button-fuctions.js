import { Todo } from './todo.js';
import { Workspace, WorkspaceManager } from './workspaces.js';
import { renderWorkspacesNav, populateWorkspaceDisplay, highlightCurrentWorkspaceNav } from './sidebar-controller.js';

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

function editWorkspaceSubmit() {
    // get needed values for edit
    const editedName = document.getElementById('editWorkspaceName').value;
    const workspaceName = document.getElementById('workspaceIdForEdit').value;

    // run the edit function
    WorkspaceManager.editWorkspace(workspaceName, editedName);

    // make the edited workspace the current workspace to make populating the workspace display easier
    WorkspaceManager.setCurrentWorkspace(editedName);

    // render the updated workspace nav and apply the correct highlighting
    renderWorkspacesNav(WorkspaceManager.getWorkspaceList());
    highlightCurrentWorkspaceNav();
    
    // Populate the workspace display making the edited workspace the active workspace
    populateWorkspaceDisplay(
        WorkspaceManager.currentWorkspace,
        WorkspaceManager.currentWorkspace.getTodoList()
    );
}

// key: value pair takes the form of (dialog[id]: corresponding function)
const newFormSubmitFunctions = {
    newTodoForm: newTodoSubmit,
    newWorkspaceForm: newWorkspaceSubmit,
    editWorkspaceForm: editWorkspaceSubmit,
};

export { cancelForm, newFormSubmitFunctions }