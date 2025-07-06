import React from "react";

const TaskCard = ({ task, onDelete, onToggle }) => {
  return (
    <div className={`task-card ${task.completed ? "completed" : ""}`}>
      <h3>{task.title}</h3>
      <p>Due: {task.dueDate?.slice(0, 10)}</p>
      <p>Status: {task.completed ? "✅ Completed" : "⏳ Pending"}</p>

      <div style={{ marginTop: "10px" }}>
        <button onClick={() => onToggle(task._id)} className="btn toggle-btn">
          {task.completed ? "Mark Pending" : "Mark Done"}
        </button>
        <button onClick={() => onDelete(task._id)} className="btn delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
