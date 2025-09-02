import { useState } from "react";
import PropTypes from "prop-types";

function TaskItem({ task, toggleComplete, deleteTask, editTask }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(task.text);

    const handleSave = () => {
        if (newText.trim()) {
            editTask(task.id, newText.trim());
            setIsEditing(false);
        }
    };

    return (
        <li>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleComplete(task.id)}
            />
            {isEditing ? (
                <>
                    <input
                        value={newText}
                        onChange={(e) => setNewText(e.target.value)}
                    />
                    <button onClick={handleSave}>💾</button>
                </>
            ) : (
                <span style={{ textDecoration: task.completed ? "line-through" : "none" }}>
                    {task.text}
                </span>
            )}
            <button onClick={() => (isEditing ? setIsEditing(false) : setIsEditing(true))}>
                {isEditing ? "❌" : "✏️"}
            </button>
            <button onClick={() => deleteTask(task.id)}>🗑️</button>
        </li>
    );
}

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    toggleComplete: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
};

export default TaskItem;
