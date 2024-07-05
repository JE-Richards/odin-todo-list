import { Todo } from './todo.js';
import { Workspace, WorkspaceManager } from './workspaces.js';
import { renderWorkspacesNav, highlightCurrentWorkspaceNav, addNavEventListeners } from './sidebar-controller.js';
import { populateWorkspaceDisplay } from './workspace-display-controller.js';

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
    populateWorkspaceDisplay(WorkspaceManager.currentWorkspace, WorkspaceManager.currentWorkspace.getTodoList());
}

function newWorkspaceSubmit() {
    const name = document.getElementById('newWorkspaceName').value;

    WorkspaceManager.addToWorkspace(new Workspace(name));
    WorkspaceManager.setCurrentWorkspace(name);
    renderWorkspacesNav(WorkspaceManager.getWorkspaceList());
    highlightCurrentWorkspaceNav();
    addNavEventListeners(WorkspaceManager.currentWorkspace, WorkspaceManager.currentWorkspace.getTodoList());
    populateWorkspaceDisplay(WorkspaceManager.currentWorkspace, WorkspaceManager.currentWorkspace.getTodoList());
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

function editWorkspaceDelete(event) {
    const btn = event.target;
    const dialog = btn.closest('dialog');
    const workspaceName = document.getElementById('workspaceIdForEdit').value;
    const idx = WorkspaceManager.getWorkspaceList().findIndex(item => item.name === workspaceName);
    const workspaceIsEditable = WorkspaceManager.getWorkspaceList()[idx].isEditable;

    if (workspaceIsEditable) {
        const userConfirm = confirm(`Are you sure you want to delete the ${workspaceName} workspace?`);

        if (userConfirm) {
            WorkspaceManager.deleteWorkspace(workspaceName);
            dialog.close();
            renderWorkspacesNav(WorkspaceManager.getWorkspaceList());
            addNavEventListeners(WorkspaceManager.currentWorkspace, WorkspaceManager.currentWorkspace.getTodoList());

            if (WorkspaceManager.currentWorkspace.name === workspaceName) {
                WorkspaceManager.setCurrentWorkspace('Inbox');
                highlightCurrentWorkspaceNav();
                populateWorkspaceDisplay(WorkspaceManager.currentWorkspace, WorkspaceManager.currentWorkspace.getTodoList());
            }
        }
    }
}

// key: value pair takes the form of (dialog[id]: corresponding function)
const formSubmitFunctions = {
    newTodoForm: newTodoSubmit,
    newWorkspaceForm: newWorkspaceSubmit,
    editWorkspaceForm: editWorkspaceSubmit,
};

export { cancelForm, formSubmitFunctions, editWorkspaceDelete }