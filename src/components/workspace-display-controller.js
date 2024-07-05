import { Workspace, WorkspaceManager } from "./workspaces";
import { Todo } from "./todo";

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

        todoDiv.dataset.todo = item.title;
        todoTitle.innerHTML = item.title;
        todoDescription.innerHTML = item.description;
        todoDueDate.innerHTML = item.dueDate;
        todoPriority.innerHTML = item.priority;

        todoCheckbox.type = 'checkbox';
        todoCheckbox.checked = item.isComplete;
        todoCheckbox.setAttribute('id', `${item.title}Checkbox`);
        todoCheckbox.addEventListener('change', (event) => {
            let thisTodoDiv = event.target.closest('div');
            let thisTodoTitle = thisTodoDiv.getAttribute('data-todo');
            let thisTodoList = WorkspaceManager.currentWorkspace.getTodoList();
            let idx = thisTodoList.findIndex(item => item.title === thisTodoTitle);

            // toggle whether todo is complete
            Todo.toggleComplete(thisTodoList[idx]);

            // add a complete class to the todo div for use in styling
            (thisTodoList[idx].isComplete === true) ? (thisTodoDiv.classList.add('complete')) : (thisTodoDiv.classList.remove('complete'));
        })

        todoDiv.appendChild(todoCheckbox);
        todoDiv.appendChild(todoTitle);
        todoDiv.appendChild(todoDescription);
        todoDiv.appendChild(todoDueDate);
        todoDiv.appendChild(todoPriority);
        todoDiv.classList.add('todo');

        todoDisplay.appendChild(todoDiv);
    })

    workspaceDisplay.appendChild(todoDisplay);
}

export { populateWorkspaceDisplay }