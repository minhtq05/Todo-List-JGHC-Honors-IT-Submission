import { Item } from "./types";

export const todos: Item[] = [
    {
        id: Date.now() - 1,
        task: "Do laundry",
        checked: false,
        subtasks: [],
        is_editing: false,
    },
    {
        id: Date.now(),
        task: "Do homeworks due on Sunday",
        checked: false,
        subtasks: [],
        is_editing: false,
    }
]