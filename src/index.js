import './style.css';
import { cancelForm, formSubmitFunctions } from "./components/button-fuctions";
import { Workspace, WorkspaceManager } from './components/workspaces.js';

const formCancelButtons = document.querySelectorAll('.cancel');
const openDialogButtons = document.querySelectorAll('.openDialog');
const dialogs = document.querySelectorAll('dialog');

// add event listeners to each cancel button
formCancelButtons.forEach(button => {
    button.addEventListener('click', cancelForm);
});

// add event listeners to each open dialog button
openDialogButtons.forEach(button => {
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

// temporary inclusion for testing purposes
window.WorkspaceManager = WorkspaceManager;