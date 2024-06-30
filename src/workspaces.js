class Workspace {
    // a static array to contain all created workspaces
    static #workspaceList = [];

    #name;
    #todoList;
    constructor (name) {
        if (!name || typeof name !== 'string') {
            throw new Error("Workspace name must be a non-empty string");
        }

        this.#name = name;
        this.#todoList = []
    }

    static getWorkspaceList() {
        return Workspace.#workspaceList;
    }

    static addToWorkspace(workspace) {
        Workspace.#workspaceList.push(workspace);
    }

    static deleteWorkspace(workspace) {
        let idx = Workspace.#workspaceList.findIndex(workspace);
        Workspace.#workspaceList.splice(idx, 1);
    }

    get name() {
        return this.#name;
    }

    set name(newName) {
        if (!newName || typeof newName !== 'string') {
            throw new Error("Title must be a non-empty string");
        }

        this.#name = newName;
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