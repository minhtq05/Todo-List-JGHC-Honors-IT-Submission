import { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import { todos } from '../data/constants';
import { Item } from '../data/types';

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

    function addTask(task: string) {
        if ((tasks.filter(t => t.task === task)).length > 0) {
            setInvalidText('Task already exists!');
            return;
        }
        const newTask: Item = {
            id: new Date(),
            task: task,
            checked: false,
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
                return { ...task, checked: !task.checked };
            } else {
                return task;
            }
        }))
    }

    return (
        <div className='p-7'>
            <span className="text-stone-50 text-3xl">Todo List</span>
            <div className="w-full inline-flex py-2">
                <input
                    type="text"
                    className="input input-bordered w-full mr-2"
                    value={text}
                    onChange={e => { setText(e.target.value) }}
                    placeholder='What do you have in mind?'
                />
                {<button
                    className={"btn w-1/12 min-w-24 bg-green-950 border-0 text-white " + ((text.length > 0) ? '' : 'btn-disabled')} onClick={() => { addTask(text) }}>Add</button>
                }
            </div>
            {
                (invalidText !== '') &&
                <div className="label">
                    <span className="label-text-alt text-red-500">{invalidText}</span>
                </div>
            }
            {
                tasks.map(task => {
                    return (
                        <TodoItem
                            key={task.id}
                            task={task}
                            deleteTask={deleteTask}
                            toggleCompleted={toggleCompleted}
                        />
                    )
                })
            }
        </div >
    );



}