function prepopulateWorkspaceEdit(workspace) {
    document.getElementById('editWorkspaceName').value = workspace.name;
}

export { prepopulateWorkspaceEdit }