import { populateWorkspaceDisplay } from "./workspace-display-controller";
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

export { renderWorkspacesNav, addNavEventListeners, highlightCurrentWorkspaceNav }