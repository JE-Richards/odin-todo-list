class Workspace {

    #name;
    #todoList;
    #isEditable;

    constructor (name) {
        if (!name || typeof name !== 'string') {
            throw new Error("Workspace name must be a non-empty string");
        }

        this.#name = name;
        this.#todoList = []
        this.#isEditable = Boolean(true);
    }
   
    get name() {
        return this.#name;
    }

    get isEditable() {
        return this.#isEditable;
    }

    set name(newName) {
        if (!newName || typeof newName !== 'string') {
            throw new Error("Title must be a non-empty string");
        }

        this.#name = newName;
    }

    set isEditable(newStatus) {
        if (typeof newStatus !== 'boolean') {
            throw new Error("Workspace.isEditable must be a Boolean")
        }

        this.#isEditable = Boolean(newStatus);
    }

    getTodoList() {
        return this.#todoList;
    }

    addNewTodo(todo) {
        this.#todoList.push(todo);
    }

    deleteTodo(todoTitle) {
        let idx = this.#todoList.findIndex(todoTitle);
        this.#todoList.splice(idx, 1);
    }
}

class WorkspaceManager {
    // a static array to contain all created workspaces
    static #workspaceList = [];
    static currentWorkspace = null;

    static getWorkspaceList() {
        return [...WorkspaceManager.#workspaceList];
    }

    static addToWorkspace(workspace) {
        WorkspaceManager.#workspaceList.push(workspace);
    }

    static deleteWorkspace(workspaceName) {
        let idx = WorkspaceManager.#workspaceList.findIndex(item => item.name === workspaceName);
        WorkspaceManager.#workspaceList.splice(idx, 1);
    }

    static editWorkspace(workspaceName, editedName) {
        let idx = WorkspaceManager.#workspaceList.findIndex(item => item.name === workspaceName);
        
        WorkspaceManager.#workspaceList[idx].name = editedName;
    }

    static setCurrentWorkspace(workspaceName) {
        let idx = WorkspaceManager.#workspaceList.findIndex(item => item.name === workspaceName);

        if (idx !== -1) {
            WorkspaceManager.currentWorkspace = WorkspaceManager.#workspaceList[idx];
        }
        else {
            throw new Error("Workspace not found");
        }
    }

}

export { Workspace, WorkspaceManager }