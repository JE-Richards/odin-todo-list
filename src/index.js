import './style.css';
import { cancelForm, formSubmitFunctions, editWorkspaceDelete } from "./components/button-fuctions";
import { Workspace, WorkspaceManager } from './components/workspaces.js';
import { renderWorkspacesNav, addNavEventListeners } from './components/sidebar-controller.js';
import { Todo } from './components/todo.js';
import { populateWorkspaceDisplay } from './components/workspace-display-controller.js';

const formCancelButtons = document.querySelectorAll('.cancel');
const openNewDialogButtons = document.querySelectorAll('.openNewDialog');
const dialogs = document.querySelectorAll('dialog');
const workspaceDeleteButton = document.getElementById('editWorkspaceFormDelete');

// add event listeners to each cancel button
formCancelButtons.forEach(button => {
    button.addEventListener('click', cancelForm);
});

// add event listeners to each open dialog button
openNewDialogButtons.forEach(button => {
    const dialogId = button.id.replace('Open', '');
    const dialog = document.getElementById(dialogId);

    button.addEventListener('click', () => {dialog.showModal()})
})

// add event listeners to each form submit button
dialogs.forEach(dialog => {
    const form = dialog.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formId = form.getAttribute('id');
        formSubmitFunctions[formId]();
        form.reset();
        dialog.close();
    })
})

// Add delte functionality to workspace delete button
workspaceDeleteButton.addEventListener('click', (event) => {
    editWorkspaceDelete(event);
});

// create a default workspace and render all workspaces
function createInboxWorkspace() {
    WorkspaceManager.addToWorkspace(
        new Workspace('Inbox')
    );

    WorkspaceManager.setCurrentWorkspace('Inbox');
    WorkspaceManager.currentWorkspace.isEditable = false;
    WorkspaceManager.currentWorkspace.addNewTodo(
        new Todo(
            'Title Test',
            'Description Test',
            "2024-07-22",
            'none'
        )
    )

    renderWorkspacesNav(WorkspaceManager.getWorkspaceList());
    populateWorkspaceDisplay(WorkspaceManager.currentWorkspace, WorkspaceManager.currentWorkspace.getTodoList())
}
createInboxWorkspace();
addNavEventListeners(
    WorkspaceManager.currentWorkspace,
    WorkspaceManager.currentWorkspace.getTodoList()
);

// temporary inclusion for testing purposes
window.WorkspaceManager = WorkspaceManager;
window.Todo = Todo;