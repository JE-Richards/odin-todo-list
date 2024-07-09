import { populateWorkspaceDisplay } from "./workspace-display-controller";
import { prepopulateWorkspaceEdit } from "./prepopulate-edit-forms";
import { Workspace, WorkspaceManager } from "./workspaces";

function hexToRGBA(hex, opacity) {
    hex = hex.replace(/^#/, '');

    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function renderWorkspacesNav(array) {
    const nav = document.getElementById('workspacesNav');
    // clear existing nav items
    nav.innerHTML = '';

    array.forEach((obj) => {
        const navButton = document.createElement('button');
        navButton.classList.add('navButton');
        navButton.id = obj.name;
        navButton.innerHTML = `<span class='navBtnName'><span class='navPeriod'>.</span>${obj.name}</span><span class='workspaceEditButton'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>folder-cog-outline</title><path d="M4 4C2.89 4 2 4.89 2 6V18C2 19.11 2.9 20 4 20H12V18H4V8H20V12H22V8C22 6.89 21.1 6 20 6H12L10 4M18 14C17.87 14 17.76 14.09 17.74 14.21L17.55 15.53C17.25 15.66 16.96 15.82 16.7 16L15.46 15.5C15.35 15.5 15.22 15.5 15.15 15.63L14.15 17.36C14.09 17.47 14.11 17.6 14.21 17.68L15.27 18.5C15.25 18.67 15.24 18.83 15.24 19C15.24 19.17 15.25 19.33 15.27 19.5L14.21 20.32C14.12 20.4 14.09 20.53 14.15 20.64L15.15 22.37C15.21 22.5 15.34 22.5 15.46 22.5L16.7 22C16.96 22.18 17.24 22.35 17.55 22.47L17.74 23.79C17.76 23.91 17.86 24 18 24H20C20.11 24 20.22 23.91 20.24 23.79L20.43 22.47C20.73 22.34 21 22.18 21.27 22L22.5 22.5C22.63 22.5 22.76 22.5 22.83 22.37L23.83 20.64C23.89 20.53 23.86 20.4 23.77 20.32L22.7 19.5C22.72 19.33 22.74 19.17 22.74 19C22.74 18.83 22.73 18.67 22.7 18.5L23.76 17.68C23.85 17.6 23.88 17.47 23.82 17.36L22.82 15.63C22.76 15.5 22.63 15.5 22.5 15.5L21.27 16C21 15.82 20.73 15.65 20.42 15.53L20.23 14.21C20.22 14.09 20.11 14 20 14M19 17.5C19.83 17.5 20.5 18.17 20.5 19C20.5 19.83 19.83 20.5 19 20.5C18.16 20.5 17.5 19.83 17.5 19C17.5 18.17 18.17 17.5 19 17.5Z" /></svg></span>`;

        nav.appendChild(navButton);
    });
}

function openNewDialogFunctionality() {
    const openNewDialogButtons = document.querySelectorAll('.openNewDialog');
    // add event listeners to each open dialog button
    openNewDialogButtons.forEach(button => {
        const dialogId = button.id.replace('Open', '');
        const dialog = document.getElementById(dialogId);

        button.addEventListener('click', () => {dialog.showModal()})
    });
}

function highlightCurrentWorkspaceNav(buttonId) {
    const navButtons = document.querySelectorAll('.sidebar nav button'); 
    navButtons.forEach(button => {
        button.classList.remove('active');
        button.style.backgroundColor = '';
        button.style.borderRightColor = '';
        if (button.id === buttonId) {
            const idx = WorkspaceManager.getWorkspaceList().findIndex(item => item.name === buttonId);
            const color = WorkspaceManager.getWorkspaceList()[idx].color;
            const btnRgba = hexToRGBA(color, 0.1);
            const bodyRgba = hexToRGBA(color, 1);
            button.style.backgroundColor = `${btnRgba}`;
            button.style.borderRightColor = `${bodyRgba}`;
            button.classList.add('active');

            const body = document.querySelector('body');
            body.style.backgroundColor = `${bodyRgba}`;
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
            WorkspaceManager.saveToLocalStorage();
        })

        const editSpan = button.querySelector('span.workspaceEditButton');
        if (button.id === 'Inbox') {
            if (editSpan) {
                editSpan.style.display = 'none';
            }
        }
        else {
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
        }
    })
}

// Combine render, highlight, and add event listener to reduce code elsewhere
function navRefresh(allWorkspacesArray, currentWorkspaceName) {
    renderWorkspacesNav(allWorkspacesArray);
    highlightCurrentWorkspaceNav(currentWorkspaceName);
    addNavEventListeners()
}

export { openNewDialogFunctionality, renderWorkspacesNav, addNavEventListeners, highlightCurrentWorkspaceNav, navRefresh }