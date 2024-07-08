import { isValid, format, parseISO, parse } from 'date-fns';

class Todo {
    #title;
    #description;
    #dueDate;
    #priority;
    #isComplete;

    constructor (title, description, dueDate, priority, isComplete=false) {
        if (!title || typeof title !== 'string') {
            throw new Error("Title must be a non-empty string");
        }

        const parsedDate = parseISO(dueDate);

        if (isValid(parsedDate) === false) {
            throw new Error("Due date must be a valid date");
        }

        this.#title = title;
        this.#description = description;
        this.#dueDate = format(parsedDate, 'dd MMM yyyy');
        this.#priority = priority;
        this.#isComplete = isComplete;
    }

    get title() {
        return this.#title;
    }

    get description() {
        return this.#description;
    }

    get dueDate() {
        return this.#dueDate;
    }

    get priority() {
        return this.#priority;
    }

    get isComplete() {
        return this.#isComplete;
    }

    set title(newTitle) {
        if (!newTitle || typeof newTitle !== 'string') {
            throw new Error("Title must be a non-empty string");
        }

        this.#title = newTitle;
    }

    set description(newDescription) {
        this.#description = newDescription;
    }

    set dueDate(newDueDate) {
        let parsedDate = parseISO(newDueDate);

        if (isValid(parsedDate) === false) {
            throw new Error("Due date must be a valid date");
        }

        this.#dueDate = format(parsedDate, 'dd MMM yyyy');
    }

    set priority(newPriority) {
        this.#priority = newPriority;
    }

    set isComplete(newStatus) {
        this.#isComplete = newStatus;
    }

    static toggleComplete(todo) {
        (todo.isComplete === false) ? (todo.isComplete = true) : (todo.isComplete = false);
    }

    static serialize(todo) {
        return {
            title: todo.#title,
            description: todo.#description,
            dueDate: todo.#dueDate,
            priority: todo.#priority,
            isComplete: todo.#isComplete
        }
    }

    static deserialize(data) {
        const date = new Date(data.dueDate);

        // get full year
        let year = date.getFullYear();

        // getMonth is zero based months, so add 1 to get correct month
        // slice to ensure leading zero kept
        let month = ('0' + (date.getMonth() + 1)).slice(-2);

        // slice to make sure leading zeros kept for days < 10
        let day = ('0' + date.getDate()).slice(-2);

        // format for correct input to Todo
        let formattedDate = `${year}-${month}-${day}`;

        return new Todo(data.title, data.description, formattedDate, data.priority, data.isComplete);
    }
}

export { Todo };