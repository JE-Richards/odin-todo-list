import { populateWorkspaceDisplay } from "./workspace-display-controller";
import { prepopulateWorkspaceEdit } from "./prepopulate-edit-forms";
import { WorkspaceManager } from "./workspaces";

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

function addNavEventListeners() {
    const navButtons = document.querySelectorAll('.sidebar nav button');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            WorkspaceManager.setCurrentWorkspace(button.getAttribute('id'));
            highlightCurrentWorkspaceNav(button.getAttribute('id'));
            populateWorkspaceDisplay(WorkspaceManager.currentWorkspace, WorkspaceManager.currentWorkspace.getTodoList());
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
                prepopulateWorkspaceEdit(WorkspaceManager.currentWorkspace);
                const dialog = document.getElementById('editWorkspaceDialog');
                dialog.showModal();
            } )
        }
    })
}

// Combine render, highlight, and add event listener to reduce code elsewhere
function navRefresh(allWorkspacesArray, currentWorkspaceName) {
    renderWorkspacesNav(allWorkspacesArray);
    highlightCurrentWorkspaceNav(currentWorkspaceName);
    addNavEventListeners()
}

export { renderWorkspacesNav, addNavEventListeners, highlightCurrentWorkspaceNav, navRefresh }