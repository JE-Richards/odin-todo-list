import { Workspace, WorkspaceManager } from "./workspaces";
import { Todo } from "./todo";
import { prepopulateWorkspaceEdit } from "./prepopulate-edit-forms";

function renderWorkspacesNav(array) {
    const nav = document.getElementById('workspacesNav');
    // clear existing nav items
    nav.innerHTML = '';

    array.forEach((obj) => {
        const navButton = document.createElement('button');
        navButton.classList.add('navButton');
        navButton.id = obj.name;
        navButton.innerHTML = `<span class='period'>.</span>${obj.name}<span class='editButton'>Edit</span>`;

        nav.appendChild(navButton);
    });
}

function highlightCurrentWorkspaceNav(buttonId) {
    const navButtons = document.querySelectorAll('.sidebar nav button'); 
    navButtons.forEach(button => {
        button.classList.remove('active');
        if (button.id === buttonId) {
            button.classList.add('active');
        }
    })
}

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

function addNavEventListeners(workspace, workspaceTodoList) {
    const navButtons = document.querySelectorAll('.sidebar nav button');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            highlightCurrentWorkspaceNav();
            populateWorkspaceDisplay(workspace, workspaceTodoList);
        })

        const editSpan = button.querySelector('span.editButton');
        if (editSpan) {
            editSpan.setAttribute('id', `${button.id}Edit`);
            editSpan.addEventListener('click', (event) => {
                // Use stop propagation to prevent the click from triggering the parent button
                event.stopPropagation();

                // Need the form to store a hidden input value which can be referenced to access the correct
                // workspace when submitting the edit
                document.getElementById('workspaceIdForEdit').value = editSpan.parentElement.id;
                prepopulateWorkspaceEdit(workspace);
                const dialog = document.getElementById('editWorkspaceDialog');
                dialog.showModal();
            } )
        }
    })
}

export { renderWorkspacesNav, addNavEventListeners, populateWorkspaceDisplay, highlightCurrentWorkspaceNav }