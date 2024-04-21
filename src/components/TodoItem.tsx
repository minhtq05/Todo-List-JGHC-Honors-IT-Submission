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
                <button className="btn flex-1 object-none object-right min-w-14 mx-2 shadow-2xl" onClick={() => toggleTaskEdit(task.id)}>
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M4253 5080 c-78 -20 -114 -37 -183 -83 -44 -29 -2323 -2296 -2361 -2349 -21 -29 -329 -1122 -329 -1168 0 -56 65 -120 122 -120 44 0 1138 309 1166 329 15 11 543 536 1174 1168 837 838 1157 1165 1187 1212 74 116 105 270 82 407 -7 39 -30 105 -53 154 -36 76 -55 99 -182 226 -127 127 -150 145 -226 182 -135 65 -260 78 -397 42z m290 -272 c55 -27 258 -231 288 -288 20 -38 24 -60 24 -140 0 -121 -18 -160 -132 -279 l-82 -86 -303 303 -303 303 88 84 c49 46 108 93 132 105 87 42 203 41 288 -2z m-383 -673 l295 -295 -933 -932 -932 -933 -295 295 c-162 162 -295 299 -295 305 0 13 1842 1855 1855 1855 6 0 143 -133 305 -295z m-1822 -2284 c-37 -12 -643 -179 -645 -178 -1 1 30 115 68 252 38 138 79 285 91 329 l21 78 238 -238 c132 -132 233 -241 227 -243z" /><path d="M480 4584 c-209 -56 -370 -206 -444 -414 l-31 -85 0 -1775 c0 -1693 1 -1778 18 -1834 37 -120 77 -187 167 -277 63 -63 104 -95 157 -121 146 -73 3 -69 2113 -66 l1895 3 67 26 c197 77 336 218 401 409 22 64 22 74 25 710 3 579 2 648 -13 676 -21 40 -64 64 -114 64 -33 0 -49 -7 -79 -34 l-37 -34 -5 -634 c-5 -631 -5 -633 -28 -690 -41 -102 -118 -179 -220 -220 l-57 -23 -1834 -3 c-1211 -1 -1853 1 -1890 8 -120 22 -227 104 -277 213 l-29 62 0 1760 0 1760 29 63 c37 80 122 161 203 194 l58 23 630 5 c704 6 664 1 700 77 23 48 13 95 -31 138 l-35 35 -642 -1 c-533 0 -651 -3 -697 -15z" /></g></svg>
                </button>
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
                <button className="btn flex-1 object-none object-right min-w-14 mx-2 shadow-2xl" onClick={() => toggleSubtaskEdit(subtask.id)}>
                    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.000000 512.000000" preserveAspectRatio="xMidYMid meet"><g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none"><path d="M4253 5080 c-78 -20 -114 -37 -183 -83 -44 -29 -2323 -2296 -2361 -2349 -21 -29 -329 -1122 -329 -1168 0 -56 65 -120 122 -120 44 0 1138 309 1166 329 15 11 543 536 1174 1168 837 838 1157 1165 1187 1212 74 116 105 270 82 407 -7 39 -30 105 -53 154 -36 76 -55 99 -182 226 -127 127 -150 145 -226 182 -135 65 -260 78 -397 42z m290 -272 c55 -27 258 -231 288 -288 20 -38 24 -60 24 -140 0 -121 -18 -160 -132 -279 l-82 -86 -303 303 -303 303 88 84 c49 46 108 93 132 105 87 42 203 41 288 -2z m-383 -673 l295 -295 -933 -932 -932 -933 -295 295 c-162 162 -295 299 -295 305 0 13 1842 1855 1855 1855 6 0 143 -133 305 -295z m-1822 -2284 c-37 -12 -643 -179 -645 -178 -1 1 30 115 68 252 38 138 79 285 91 329 l21 78 238 -238 c132 -132 233 -241 227 -243z" /><path d="M480 4584 c-209 -56 -370 -206 -444 -414 l-31 -85 0 -1775 c0 -1693 1 -1778 18 -1834 37 -120 77 -187 167 -277 63 -63 104 -95 157 -121 146 -73 3 -69 2113 -66 l1895 3 67 26 c197 77 336 218 401 409 22 64 22 74 25 710 3 579 2 648 -13 676 -21 40 -64 64 -114 64 -33 0 -49 -7 -79 -34 l-37 -34 -5 -634 c-5 -631 -5 -633 -28 -690 -41 -102 -118 -179 -220 -220 l-57 -23 -1834 -3 c-1211 -1 -1853 1 -1890 8 -120 22 -227 104 -277 213 l-29 62 0 1760 0 1760 29 63 c37 80 122 161 203 194 l58 23 630 5 c704 6 664 1 700 77 23 48 13 95 -31 138 l-35 35 -642 -1 c-533 0 -651 -3 -697 -15z" /></g></svg>
                </button>
                <button className="btn text-lg bg-gray-300 text-black w-12 min-w-12 shwdow-2xl" onClick={() => deleteSubtask(subtask.id)}><p className='rotate-45'>+</p></button>
            </label>
        </motion.div>
    );
}

export default TodoItem;