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
        task: "Do chemistry lab homeworks",
        checked: false,
        is_editing: false,
        subtasks: [
            {
                id: 0,
                task: "Prelab plan",
                checked: false,
                is_editing: false,
            },
            {
                id: 1,
                task: "Prelab quiz",
                checked: false,
                is_editing: false,
            },
            {
                id: 2,
                task: "Postlab submission",
                checked: false,
                is_editing: false,
            },
        ],
    }
];


export const spring = {
    type: "spring",
    damping: 30,
    stiffness: 400,
    ease: easeInOut,
};