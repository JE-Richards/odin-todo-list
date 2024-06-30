import './style.css';
import { cancelBtn, addNewTask } from './button-fuctions.js';

const newTodoSubmitBtn = document.getElementById('newTodoFormSubmit');
const newTodoCancelBtn = document.getElementById('newTodoFormCancel')

newTodoSubmitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    addNewTask();
})

newTodoCancelBtn.addEventListener('click', cancelBtn);