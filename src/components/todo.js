import { isValid, format, parseISO } from 'date-fns';

class Todo {
    #title;
    #description;
    #dueDate;
    #priority;

    constructor (title, description, dueDate, priority) {
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
}

export { Todo };