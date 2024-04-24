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
                task: "Fruits: apples, oranges, pears",
                checked: false,
                is_editing: false,

            },
            {
                id: 1,
                task: "Vegetables: carrots, broccoli, spinach",
                checked: false,
                is_editing: false,
            },
            {
                id: 2,
                task: "Bread",
                checked: false,
                is_editing: false,
            },
            {
                id: 3,
                task: "Milk",
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