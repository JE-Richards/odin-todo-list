import { Todo } from './todo.js';

function cancelBtn() {
    dialog.close();
}

function addNewTask(){
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

    console.log(new Todo(title, desc, dueDate, priority));
}

export { cancelBtn, addNewTask }