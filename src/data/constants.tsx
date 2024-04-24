import { Item } from "./types";
import { easeInOut } from "framer-motion";

export const todos: Item[] = [
    {
        id: 0,
        task: "Grocery Shopping",
        checked: false,
        is_editing: false,
        subtasks: [
            {
                id: 0,
                task: "Buy fruits",
                checked: false,
                is_editing: false,

            },
            {
                id: 1,
                task: "Get vegetables",
                checked: false,
                is_editing: false,
            },
            {
                id: 2,
                task: "Pick up bread",
                checked: false,
                is_editing: false,
            },
            {
                id: 3,
                task: "Grab milk",
                checked: false,
                is_editing: false,
            }
        ],
    },
    {
        id: 1,
        task: "Do homeworks due on Sunday",
        checked: false,
        is_editing: false,
        subtasks: [
            {
                id: 0,
                task: "Math",
                checked: false,
                is_editing: false,
            },
            {
                id: 1,
                task: "English",
                checked: false,
                is_editing: false,
            },
            {
                id: 2,
                task: "Science",
                checked: false,
                is_editing: false,
            },
            {
                id: 3,
                task: "History",
                checked: false,
                is_editing: false,
            },
            {
                id: 4,
                task: "Geography",
                checked: false,
                is_editing: false,
            }
        ],
    }
];


export const spring = {
    type: "spring",
    damping: 30,
    stiffness: 400,
    ease: easeInOut,
};