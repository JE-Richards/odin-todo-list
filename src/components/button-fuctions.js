import { Todo } from './todo.js';
import { Workspace, WorkspaceManager } from './workspaces.js';
import { renderWorkspacesNav, highlightCurrentWorkspaceNav, addNavEventListeners, navRefresh } from './sidebar-controller.js';
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
    WorkspaceManager.saveToLocalStorage();
}

function editTodoSubmit() {
    const title = document.getElementById('editTodoTitle').value;
    const desc = document.getElementById('editTodoDesc').value;
    const dueDate = document.getElementById('editTodoDueDate').value;
    let priority = null;

    const editTodoPriorityRadios = document.getElementsByName('editTodoPriority');
    for (let i=0; i < editTodoPriorityRadios.length; i++) {
        if (editTodoPriorityRadios[i].checked) {
            priority = editTodoPriorityRadios[i].value;
        }
    }

    // Select the todo object
    const todoId = document.getElementById('todoIdForEdit').value;
    let idx = WorkspaceManager.currentWorkspace.getTodoList().findIndex(item => item.title === todoId);
    let todo = WorkspaceManager.currentWorkspace.getTododList()[idx];

    // edit the todo
    todo.title = title;
    todo.description = desc;
    todo.dueDate = dueDate;
    todo.priority = priority;

    populateWorkspaceDisplay(WorkspaceManager.currentWorkspace, WorkspaceManager.currentWorkspace.getTodoList());
    WorkspaceManager.saveToLocalStorage();
}

function moveTodoSubmit() {
    // get workspace todo is currently in
    const todoCurrentWorkspace = document.getElementById('currentWorkspaceName').value;

    // get the new workplace to store the todo in
    const todoNewWorkspace = document.getElementById('moveToWorkspaceName').value;

    // get the todo title
    const todoTitle = document.getElementById('todoIdForMove').value;

    // find the respective indices of the workspaces
    const todoCurrentWorkspaceIdx = WorkspaceManager.getWorkspaceList().findIndex(item => item.name === todoCurrentWorkspace);
    const todoNewWorkspaceIdx = WorkspaceManager.getWorkspaceList().findIndex(item => item.name === todoNewWorkspace);

    // get the workspace to-do lists
    const currentWorkspacePreMove = WorkspaceManager.getWorkspaceList()[todoCurrentWorkspaceIdx];
    const currentWorkspaceTodoList = currentWorkspacePreMove.getTodoList();
    const newWorkspaceForMove = WorkspaceManager.getWorkspaceList()[todoNewWorkspaceIdx];

    // find the todo index in current list
    const todoIdx = currentWorkspaceTodoList.findIndex(item => item.title === todoTitle);

    // move the todo
    let todo = currentWorkspaceTodoList.splice(todoIdx, 1);
    newWorkspaceForMove.addNewTodo(...todo);

    // refresh display
    populateWorkspaceDisplay(WorkspaceManager.currentWorkspace, WorkspaceManager.currentWorkspace.getTodoList());
    WorkspaceManager.saveToLocalStorage();
}

function newWorkspaceSubmit() {
    const name = document.getElementById('newWorkspaceName').value;
    const color = document.getElementById('newWorkspaceCol').value;

    WorkspaceManager.addToWorkspace(new Workspace(name, color));
    WorkspaceManager.setCurrentWorkspace(name);
    navRefresh(
        WorkspaceManager.getWorkspaceList(),
        name
    );
    populateWorkspaceDisplay(WorkspaceManager.currentWorkspace, WorkspaceManager.currentWorkspace.getTodoList());
    WorkspaceManager.saveToLocalStorage();
}

function editWorkspaceSubmit() {
    // get needed values for edit
    const editedName = document.getElementById('editWorkspaceName').value;
    const editedColor = document.getElementById('editWorkspaceCol').value;
    const workspaceName = document.getElementById('workspaceIdForEdit').value;

    // run the edit function
    WorkspaceManager.editWorkspace(workspaceName, editedName, editedColor);

    // make the edited workspace the current workspace to make populating the workspace display easier
    WorkspaceManager.setCurrentWorkspace(editedName);

    // refresh nav
    navRefresh(
        WorkspaceManager.getWorkspaceList(),
        editedName
    )
    
    // Populate the workspace display making the edited workspace the active workspace
    populateWorkspaceDisplay(
        WorkspaceManager.currentWorkspace,
        WorkspaceManager.currentWorkspace.getTodoList()
    );

    WorkspaceManager.saveToLocalStorage();
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

            // if deleting currently selected workspace, set current workspace to inbox for display refresh
            if (WorkspaceManager.currentWorkspace.name === workspaceName) {
                WorkspaceManager.setCurrentWorkspace('Inbox');
            }

            navRefresh(
                WorkspaceManager.getWorkspaceList(),
                WorkspaceManager.currentWorkspace.name
            )

            WorkspaceManager.saveToLocalStorage();
            dialog.close();
        }
    }
}

// key: value pair takes the form of (dialog[id]: corresponding function)
const formSubmitFunctions = {
    newTodoForm: newTodoSubmit,
    editTodoForm: editTodoSubmit,
    newWorkspaceForm: newWorkspaceSubmit,
    editWorkspaceForm: editWorkspaceSubmit,
    moveTodoForm: moveTodoSubmit
};

export { cancelForm, formSubmitFunctions, editWorkspaceDelete, editTodoSubmit }