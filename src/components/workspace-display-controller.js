import { Workspace, WorkspaceManager } from "./workspaces";
import { Todo } from "./todo";
import { prepopulateTodoEdit } from "./prepopulate-edit-forms";

// Not happy with function as it is heavily coupled with the Workspace and WorkspaceManager
function populateWorkspaceDisplay(workspace, workspaceTodoList) {
    const workspaceDisplay = document.getElementById('workspaceDisplay');
    const contentHeaderDiv = document.createElement('div');
    const contentHeader = document.createElement('h1');
    const hr = document.createElement('hr');
    const todoDisplay = document.createElement('div')

    // clear previous content
    workspaceDisplay.innerHTML = '';

    // populate a content header
    contentHeader.innerHTML = `<span class='displayPeriod'>.</span>${workspace.name}`;
    contentHeaderDiv.appendChild(contentHeader);
    workspaceDisplay.appendChild(contentHeaderDiv);
    workspaceDisplay.appendChild(hr);

    //populate todo display
    todoDisplay.setAttribute('id', 'todoDisplay');

    workspaceTodoList.forEach(item => {
        const todoDiv = document.createElement('div');
        const todoContent = document.createElement('div');
        const todoCheckbox = document.createElement('input');
        const todoTitle = document.createElement('h1');
        const todoDescription = document.createElement('p');
        const todoDueDate = document.createElement('p');
        const todoButtons = document.createElement('span');
        const todoEdit = document.createElement('button');
        const todoMove = document.createElement('button');
        const todoDelete = document.createElement('button');
        let thisTodoIdx = WorkspaceManager.currentWorkspace.getTodoList().findIndex(x => x.title === item.title);
        let thisTodo = WorkspaceManager.currentWorkspace.getTodoList()[thisTodoIdx];

        todoDiv.dataset.todo = item.title;

        todoTitle.innerHTML = item.title;
        todoTitle.classList.add('todoTitle');

        todoDescription.innerHTML = item.description;
        todoDescription.classList.add('todoDescription');

        todoDueDate.innerHTML = item.dueDate;
        todoDueDate.classList.add('todoDueDate');

        todoCheckbox.type = 'checkbox';
        todoCheckbox.classList.add('todoCheckbox');
        todoCheckbox.classList.add(`${item.priority}`)
        todoCheckbox.checked = item.isComplete;
        todoCheckbox.setAttribute('id', `${item.title}Checkbox`);
        todoCheckbox.addEventListener('change', () => {
            // toggle whether todo is complete
            Todo.toggleComplete(thisTodo);

            // add a complete class to the todo div for use in styling
            (thisTodo.isComplete === true) ? (todoDiv.classList.add('complete')) : (todoDiv.classList.remove('complete'));
        })

        // set up the edit button
        todoEdit.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>file-edit-outline</title><path d="M10 20H6V4H13V9H18V12.1L20 10.1V8L14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H10V20M20.2 13C20.3 13 20.5 13.1 20.6 13.2L21.9 14.5C22.1 14.7 22.1 15.1 21.9 15.3L20.9 16.3L18.8 14.2L19.8 13.2C19.9 13.1 20 13 20.2 13M20.2 16.9L14.1 23H12V20.9L18.1 14.8L20.2 16.9Z" /></svg>'
        todoEdit.classList.add('todoChanges', 'todoEdit');
        todoEdit.setAttribute('type', 'button');

        todoEdit.addEventListener('click', () => {
            // Need the form to store a hidden input value which can be referenced to access the correct todo when 
            // submitting the edit
            document.getElementById('todoIdForEdit').value = item.title;
            prepopulateTodoEdit(thisTodo);
            const dialog = document.getElementById('editTodoDialog');
            dialog.showModal();
        })

        // set up the move todo button
        todoMove.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>file-move-outline</title><path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 20.41 4.12 20.8 4.34 21.12C4.41 21.23 4.5 21.33 4.59 21.41C4.95 21.78 5.45 22 6 22H13.53C13 21.42 12.61 20.75 12.35 20H6V4H13V9H18V12C18.7 12 19.37 12.12 20 12.34V8L14 2M18 23L23 18.5L20 15.8L18 14V17H14V20H18V23Z" /></svg>';
        todoMove.classList.add('todoChanges', 'todoMove');
        todoMove.setAttribute('type', 'button');

        todoMove.addEventListener('click', () => {
            // set the current workspace name, which the user can't change
            document.getElementById('currentWorkspaceName').value = WorkspaceManager.currentWorkspace.name;

            // set a hidden input value for the todo title which can be referenced when submitting the form
            document.getElementById('todoIdForMove').value = item.title;

            // populate the form select input with the names of all workspaces
            const moveSelectInput = document.getElementById('moveToWorkspaceName');
            const workspaceList = WorkspaceManager.getWorkspaceList();

            if (workspaceList.length > 0) {
                
                workspaceList.forEach(item => {
                    const newOption = document.createElement('option');
                    newOption.value = item.name;
                    newOption.innerHTML = item.name;
                    moveSelectInput.appendChild(newOption);
                })
            }

            const dialog = document.getElementById('moveTodoDialog');
            dialog.showModal();
        })

        // set up the delete button
        todoDelete.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>trash-can-outline</title><path d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" /></svg>';
        todoDelete.classList.add('todoChanges', 'todoDelete');
        todoDelete.setAttribute('type', 'button');

        todoDelete.addEventListener('click', () => {
            WorkspaceManager.currentWorkspace.deleteTodo(item.title);
            populateWorkspaceDisplay(WorkspaceManager.currentWorkspace, WorkspaceManager.currentWorkspace.getTodoList());
        })

        todoButtons.appendChild(todoEdit);
        todoButtons.appendChild(todoMove);
        todoButtons.appendChild(todoDelete);
        todoButtons.classList.add('todoOptions');

        todoContent.appendChild(todoCheckbox);
        todoContent.appendChild(todoTitle);
        todoContent.appendChild(todoDescription);
        todoContent.appendChild(todoDueDate);
        todoContent.classList.add('todoContent');

        todoDiv.appendChild(todoContent);
        todoDiv.appendChild(todoButtons);
        todoDiv.classList.add('todo');

        todoDisplay.appendChild(todoDiv);
    })

    workspaceDisplay.appendChild(todoDisplay);
}

export { populateWorkspaceDisplay }