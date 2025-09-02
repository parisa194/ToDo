import PropTypes from "prop-types";
import TaskItem from "./TaskItem";

function TaskList({ tasks, toggleComplete, deleteTask, editTask }) {
    return (
        <ul className="task-list">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    toggleComplete={toggleComplete}
                    deleteTask={deleteTask}
                    editTask={editTask}
                />
            ))}
        </ul>
    );
}

TaskList.propTypes = {
    tasks: PropTypes.array.isRequired,
    toggleComplete: PropTypes.func.isRequired,
    deleteTask: PropTypes.func.isRequired,
    editTask: PropTypes.func.isRequired,
};

export default TaskList;
