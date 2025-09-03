import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  

  // Guardar en localStorage cuando cambian las tareas
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (!text.trim()) {
      alert("⚠️ Escribe una tarea antes de agregar.");
      return;
    }
    setTasks([...tasks, { id: Date.now(), text, completed: false }]);
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: newText } : task
      )
    );
  };

  // estadísticas
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-container">
      <h1>📋 Lista de Tareas</h1>

      {/* Formulario */}
      <TaskForm addTask={addTask} />

      {/* Lista */}
      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        editTask={editTask}
      />

      {/* Estadísticas con tabla */}
      <div className="stats">
        <h2>📊 Estadísticas</h2>
        <table>
          <thead>
            <tr>
              <th>Total</th>
              <th>Completadas</th>
              <th>Pendientes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{total}</td>
              <td>{completed}</td>
              <td>{total - completed}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      
    </div>
  );
}

export default App;