export type Item = {
    id: number;
    task: string;
    checked: boolean;
    subtasks: SubItem[];
    is_editing: boolean;
}

export type SubItem = {
    id: number;
    task: string;
    checked: boolean;
    is_editing: boolean;
}

export type User = {
    name: string;
}