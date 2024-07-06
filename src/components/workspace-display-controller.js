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
    contentHeader.innerHTML = `<span class='period'>.</span>${workspace.name}`;
    contentHeaderDiv.appendChild(contentHeader);
    workspaceDisplay.appendChild(contentHeaderDiv);
    workspaceDisplay.appendChild(hr);

    //populate todo display
    todoDisplay.setAttribute('id', 'todoDisplay');

    workspaceTodoList.forEach(item => {
        const todoDiv = document.createElement('div');
        const todoCheckbox = document.createElement('input');
        const todoTitle = document.createElement('h1');
        const todoDescription = document.createElement('p');
        const todoDueDate = document.createElement('p');
        const todoPriority = document.createElement('p');
        const todoButtons = document.createElement('span');
        const todoEdit = document.createElement('button');
        const todoMove = document.createElement('button');
        const todoDelete = document.createElement('button');
        let thisTodoIdx = WorkspaceManager.currentWorkspace.getTodoList().findIndex(x => x.title === item.title);
        let thisTodo = WorkspaceManager.currentWorkspace.getTodoList()[thisTodoIdx];

        todoDiv.dataset.todo = item.title;
        todoTitle.innerHTML = item.title;
        todoDescription.innerHTML = item.description;
        todoDueDate.innerHTML = item.dueDate;
        todoPriority.innerHTML = item.priority;

        todoCheckbox.type = 'checkbox';
        todoCheckbox.checked = item.isComplete;
        todoCheckbox.setAttribute('id', `${item.title}Checkbox`);
        todoCheckbox.addEventListener('change', () => {
            // toggle whether todo is complete
            Todo.toggleComplete(thisTodo);

            // add a complete class to the todo div for use in styling
            (thisTodo.isComplete === true) ? (todoDiv.classList.add('complete')) : (todoDiv.classList.remove('complete'));
        })

        // set up the edit button
        todoEdit.innerHTML = 'EDIT';
        todoEdit.classList.add('todoChanges');
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
        todoMove.innerHTML = 'MOVE';
        todoMove.classList.add('todoChanges');
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
        todoDelete.innerHTML = 'DELETE';
        todoDelete.classList.add('todoChanges');
        todoDelete.setAttribute('type', 'button');

        todoDelete.addEventListener('click', () => {
            WorkspaceManager.currentWorkspace.deleteTodo(item.title);
            populateWorkspaceDisplay(WorkspaceManager.currentWorkspace, WorkspaceManager.currentWorkspace.getTodoList());
        })

        todoButtons.appendChild(todoEdit);
        todoButtons.appendChild(todoMove);
        todoButtons.appendChild(todoDelete);

        todoDiv.appendChild(todoCheckbox);
        todoDiv.appendChild(todoTitle);
        todoDiv.appendChild(todoDescription);
        todoDiv.appendChild(todoDueDate);
        todoDiv.appendChild(todoPriority);
        todoDiv.appendChild(todoButtons);
        todoDiv.classList.add('todo');

        todoDisplay.appendChild(todoDiv);
    })

    workspaceDisplay.appendChild(todoDisplay);
}

export { populateWorkspaceDisplay }