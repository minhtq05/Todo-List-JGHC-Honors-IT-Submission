import { Item } from '../data/types';

function TodoItem({ task, deleteTask, toggleCompleted }: { task: Item, deleteTask: (id: number) => void, toggleCompleted: (id: number) => void }) {
    function handleChange() {
        toggleCompleted(task.id);
    }

    return (
        <div className="form-control py-2">
            <label className="label border-2 rounded-lg border-yellow-600 bg-white cursor-pointer shadow-lg px-2 pl-5">
                <input
                    type="checkbox"
                    checked={task.checked}
                    onChange={handleChange}
                    className="checkbox"
                />
                <span className={"label-text text-xl text-green-950 " + (task.checked ? "line-through" : "")}>{task.task}</span>
                <button className="btn bg-green-950 text-white" onClick={() => deleteTask(task.id)}>Delete</button>
            </label>
        </div>
    );
}

export default TodoItem;