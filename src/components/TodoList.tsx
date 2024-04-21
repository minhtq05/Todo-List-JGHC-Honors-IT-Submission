import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { todos } from '../data/constants';
import { Item, SubItem } from '../data/types';


export default function TodoList() {
    const [tasks, setTasks] = useState([
        ...todos
    ]);

    const [text, setText] = useState('');
    const [invalidText, setInvalidText] = useState('');

    useEffect(() => {
        if (invalidText) {
            setTimeout(() => {
                setInvalidText('');
            }, 3000);
        }
    }, [invalidText]);

    useEffect(() => {
        const res: Item[] = []
        tasks.forEach(task => {
            if (!task.checked) {
                res.push(task)
            }
        })
        tasks.forEach(task => {
            if (task.checked) {
                res.push(task)
            }
        })
        if (JSON.stringify(res) !== JSON.stringify(tasks)) {
            setTasks(res);
        }
    }, [tasks]);

    function addTask(value: string) {
        value = value.trim();
        if ((tasks.filter(task => task.task === value)).length > 0) {
            setInvalidText('Task already exists!');
            return;
        }
        const newTask: Item = {
            id: Date.now(),
            task: value,
            checked: false,
            subtasks: [],
            is_editing: false,
        }
        setTasks([...tasks, newTask]);
        setText('');
    }

    function deleteTask(id: number) {
        setTasks(tasks.filter(task => task.id !== id));
    }

    function toggleCompleted(id: number) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                let res = { ...task, checked: !task.checked };
                if (task.checked === false) {
                    res = { ...res, subtasks: task.subtasks.map(subtask => ({ ...subtask, checked: true })) };
                }
                return res;
            } else {
                return task;
            }
        }))
    }

    function addSubTask(id: number) {
        const newSubtask: SubItem = {
            id: Date.now(),
            task: '',
            checked: false,
            is_editing: true,
        }
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, subtasks: [...task.subtasks, newSubtask] };
            } else {
                return task;
            }
        }))
    }

    function deleteSubtask(id: number, subtaskId: number) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, subtasks: task.subtasks.filter(subtask => subtask.id !== subtaskId) };
            } else {
                return task;
            }
        }))
    }

    function toggleSubtaskCompleted(id: number, subTaskId: number) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                let res = { ...task, subtasks: task.subtasks.map(subtask => subtask.id === subTaskId ? { ...subtask, checked: !subtask.checked } : subtask) };
                const allSubtasksChecked = res.subtasks.every(subtask => subtask.checked);
                res = {
                    ...res,
                    checked: allSubtasksChecked,
                }
                return res;
            }
            else {
                return task;
            }
        }))
    }

    function toggleTaskEdit(id: number) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, is_editing: !task.is_editing, };
            } else {
                return task;
            }
        }))
    }

    function editTask(id: number, value: string) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, task: value, };
            } else {
                return task;
            }
        }))
    }

    function toggleEditSubtask(id: number, subTaskId: number) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, subtasks: task.subtasks.map(subtask => subtask.id === subTaskId ? { ...subtask, is_editing: !subtask.is_editing } : subtask) };
            } else {
                return task;
            }
        }))
    }

    function editSubtask(id: number, subTaskId: number, value: string) {
        setTasks(tasks.map(task => {
            if (task.id === id) {
                return { ...task, subtasks: task.subtasks.map(subtask => subtask.id === subTaskId ? { ...subtask, task: value } : subtask) };
            } else {
                return task;
            }
        }))
    }

    return (
        <div
            className="p-8"
        >
            <div className="text-stone-50 text-4xl font-mono font-black my-4 ">Todo List</div>
            <div className="w-full inline-flex">
                <input
                    type="text"
                    className="input input-bordered w-full mr-2 shadow-2xl"
                    value={text}
                    onChange={e => { setText(e.target.value) }}
                    placeholder='What do you have in mind?'
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            addTask(text);
                        }
                    }}
                />
                {<button
                    className={"btn w-1/12 min-w-24 bg-green-950 border-0 text-white shadow-2xl " + ((text.length > 0) ? '' : 'btn-disabled')} onClick={() => { addTask(text) }}>Add</button>
                }
            </div>
            {
                (invalidText !== '') &&
                <div
                    role="alert"
                    className="alert alert-error my-2"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{invalidText}</span>
                </div>
            }
            {tasks.map(task => (
                <TodoItem
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleCompleted={toggleCompleted}
                    addSubtask={addSubTask}
                    deleteSubtask={deleteSubtask}
                    toggleSubtaskCompleted={toggleSubtaskCompleted}
                    toggleTaskEdit={toggleTaskEdit}
                    editTask={editTask}
                    toggleSubtaskEdit={toggleEditSubtask}
                    editSubtask={editSubtask}
                />
            ))}
        </div>
    );



}