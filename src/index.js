import './style.css';
import { cancelBtn, addNewTodo, addNewWorkspace } from './button-fuctions.js';

const newTodoSubmitBtn = document.getElementById('newTodoFormSubmit');
const newTodoCancelBtn = document.getElementById('newTodoFormCancel')
const newWorkspaceBtn = document.getElementById('newWorkspaceFormSubmit')

// Add new Todo buttons
newTodoSubmitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addNewTodo();
})

newTodoCancelBtn.addEventListener('click', cancelBtn);

// Add new Workspace buttons
newWorkspaceBtn.addEventListener('click', addNewWorkspace);