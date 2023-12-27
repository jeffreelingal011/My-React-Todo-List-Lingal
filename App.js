import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; //npm install bootstrap
import "./App.css";

const TodoApp = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  const handleCreate = () => {
    const newTaskWithSequence = `Task ${tasks.length + 1}: ${newTask}`;
    setTasks([...tasks, newTaskWithSequence]);
    setNewTask("");
  };

  const handleUpdate = () => {
    if (selectedTask !== null && newTask.trim() !== "") {
      setTasks((prevTasks) =>
        prevTasks.map((task, index) =>
          index === selectedTask ? `Task ${selectedTask + 1}: ${newTask}` : task
        )
      );

      setNewTask("");
      setSelectedTask(null);
    }
  };

  const handleDelete = () => {
    if (selectedTask !== null) {
      setTasks((prevTasks) =>
        prevTasks
          .filter((_, index) => index !== selectedTask)
          .map(
            (task, index) => `Task ${index + 1}: ${task.split(":")[1].trim()}`
          )
      );
      setNewTask("");
      setSelectedTask(null);
    }
  };

  return (
    <div className="container mt-5">
      <h1>To-Do List Application</h1>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <button className="btn btn-primary mr-2" onClick={handleCreate}>
          Create
        </button>
        <button className="btn btn-warning mr-2" onClick={handleUpdate}>
          Update
        </button>
        <button className="btn btn-danger" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <div className="task-list-container">
        <ul className="list-group task-list">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={`list-group-item ${
                selectedTask === index ? "active" : ""
              }`}
              onClick={() => setSelectedTask(index)}
            >
              {task}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TodoApp;