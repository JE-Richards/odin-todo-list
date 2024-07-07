import './style.css';
import { cancelForm, formSubmitFunctions, editWorkspaceDelete } from "./components/button-fuctions";
import { Workspace, WorkspaceManager } from './components/workspaces.js';
import { openNewDialogFunctionality, renderWorkspacesNav, addNavEventListeners, navRefresh } from './components/sidebar-controller.js';
import { Todo } from './components/todo.js';
import { populateWorkspaceDisplay } from './components/workspace-display-controller.js';

const formCancelButtons = document.querySelectorAll('.cancel');
const dialogs = document.querySelectorAll('dialog');
const workspaceDeleteButton = document.getElementById('editWorkspaceFormDelete');

// add event listeners to each cancel button
formCancelButtons.forEach(button => {
    button.addEventListener('click', cancelForm);
});

openNewDialogFunctionality();

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

    navRefresh(
        WorkspaceManager.getWorkspaceList(),
        WorkspaceManager.currentWorkspace.name
    )
    populateWorkspaceDisplay(
        WorkspaceManager.currentWorkspace,
        WorkspaceManager.currentWorkspace.getTodoList()
    )
}
createInboxWorkspace();

// temporary inclusion for testing purposes
window.WorkspaceManager = WorkspaceManager;
window.Todo = Todo;