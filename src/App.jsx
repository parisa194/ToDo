import { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm.jsx";
import TaskList from "./components/TaskList.jsx";
import "./App.css";
import logo from "./assets/logo.png"; // 👈 Importar logo

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

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

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;

  return (
    <div className="app-container">
      {/* 👇 Logo agregado */}
      <img src={logo} alt="Homework Check" className="logo" />

      <h1>📋 Lista de Tareas</h1>

      <TaskForm addTask={addTask} />

      <TaskList
        tasks={tasks}
        toggleComplete={toggleComplete}
        deleteTask={deleteTask}
        editTask={editTask}
      />

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
