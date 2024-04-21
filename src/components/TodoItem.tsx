import { useState, useEffect } from 'react';
import { Item, SubItem } from '../data/types';
import { easeInOut, motion } from 'framer-motion';

const spring = {
    type: "spring",
    damping: 30,
    stiffness: 400,
    ease: easeInOut,
};

function TodoItem({
    task,
    deleteTask,
    toggleCompleted,
    addSubtask,
    deleteSubtask,
    toggleSubtaskCompleted,
    toggleTaskEdit,
    editTask,
    toggleSubtaskEdit,
    editSubtask,
}: {
    task: Item, deleteTask: (id: number) => void,
    toggleCompleted: (id: number) => void,
    addSubtask: (id: number) => void,
    deleteSubtask: (id: number, subTaskId: number) => void,
    toggleSubtaskCompleted: (id: number, subTaskId: number) => void,
    toggleTaskEdit: (id: number) => void,
    editTask: (id: number, value: string) => void,
    toggleSubtaskEdit: (id: number, subTaskId: number) => void,
    editSubtask: (id: number, subTaskId: number, value: string) => void
}) {
    function handleChange() {
        toggleCompleted(task.id);
    }

    const [isMobile, setIsMobile] = useState(false);

    function handleResize() {
        if (window.innerWidth < 720) {
            setIsMobile(true);
        } else {
            setIsMobile(false);
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
    })

    return (
        <motion.div
            layout
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={spring}
            className="form-control rounded-lg bg-white shadow-2xl px-1 my-5"
        >
            <label className="label flex cursor-pointer">
                <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={handleChange}
                    className="checkbox checkbox-lg flex-none ml-2"
                />
                {task.is_editing ?
                    (<input
                        type='text'
                        className="input input-bordered w-full ml-3 shadow-md"
                        value={task.task}
                        placeholder='Edit Your Task'
                        onChange={(e) => {
                            editTask(task.id, e.currentTarget.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                toggleTaskEdit(task.id);
                            }
                        }}
                    />) :
                    (<strong className={"label-text text-xl text-green-950 w-full ml-3 hyphens-auto break-words overflow-hidden " + (task.checked ? "line-through" : "")}>{task.task}</strong>)
                }
                <button className={`btn flex-1 object-none object-right min-w-${isMobile ? 12 : 20}`} onClick={() => addSubtask(task.id)}>{isMobile ? "+" : "Add Subtask"}</button>
                <button className="btn flex-1 object-none object-right min-w-14 mx-2 shadow-2xl" onClick={() => toggleTaskEdit(task.id)}><img src="../../public/pen.png" alt="" /></button>
                <button className="btn text-lg bg-gray-300 text-black w-12 min-w-12" onClick={() => deleteTask(task.id)}><p className='rotate-45'>+</p></button>
            </label>
            {
                task.subtasks.map(subtask => (
                    <TodoSubItem
                        key={subtask.id}
                        subtask={subtask}
                        deleteSubtask={(subtaskId) => deleteSubtask(task.id, subtaskId)}
                        toggleSubtaskCompleted={(subtaskId) => toggleSubtaskCompleted(task.id, subtaskId)}
                        toggleSubtaskEdit={(subtaskId) => toggleSubtaskEdit(task.id, subtaskId)}
                        editSubtask={(subtaskId, value) => editSubtask(task.id, subtaskId, value)}
                    />
                ))
            }
        </motion.div >
    );
}


function TodoSubItem({
    subtask,
    deleteSubtask,
    toggleSubtaskCompleted,
    toggleSubtaskEdit,
    editSubtask,
}: {
    subtask: SubItem,
    deleteSubtask: (id: number) => void,
    toggleSubtaskCompleted: (id: number) => void
    toggleSubtaskEdit: (id: number) => void
    editSubtask: (id: number, value: string) => void
}) {
    return (
        <motion.div
            layout
            transition={spring}
            className="form-control ml-11"
        >
            <label className="label flex cursor-pointer">
                <input
                    type="checkbox"
                    checked={subtask.checked}
                    onChange={() => toggleSubtaskCompleted(subtask.id)}
                    className="checkbox checkbox-lg flex-none ml-2"
                />
                {subtask.is_editing ?
                    (<input
                        type='text'
                        className="input input-bordered w-full ml-3 shadow-md"
                        value={subtask.task}
                        placeholder="Edit Your Subtask"
                        onChange={(e) => {
                            editSubtask(subtask.id, e.currentTarget.value);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                toggleSubtaskEdit(subtask.id);
                            }
                        }}
                    />) :
                    (<p className={"label-text text-lg text-green-950 w-full mx-3 " + (subtask.checked ? "line-through" : "")}>{subtask.task}</p>)
                }
                <button className="btn flex-1 object-none object-right min-w-14 mx-2 shadow-2xl" onClick={() => toggleSubtaskEdit(subtask.id)}><img src="../../public/pen.png" alt="" /></button>
                <button className="btn text-lg bg-gray-300 text-black w-12 min-w-12 shwdow-2xl" onClick={() => deleteSubtask(subtask.id)}><p className='rotate-45'>+</p></button>
            </label>
        </motion.div>
    );
}

export default TodoItem;