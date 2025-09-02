import { useState } from "react";

function TaskForm({ addTask }) {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (text.trim() === "") {
            alert("Por favor escribe una tarea antes de agregar.");
            return;
        }

        addTask(text);
        setText(""); // limpiar el input
    };

    return (
        <form onSubmit={handleSubmit} className="task-form">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribe una tarea..."
            />
            <button type="submit">Agregar</button>
        </form>
    );
}

export default TaskForm;
