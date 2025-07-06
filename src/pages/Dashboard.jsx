import React, { useEffect, useState, useRef } from "react";
import API from "../services/api";
import "./Dashboard.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [myTasks, setMyTasks] = useState([]);
  const [sharedTasks, setSharedTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("Newest");
  const [darkMode, setDarkMode] = useState(false);

  const myTasksRef = useRef(null);
  const sharedTasksRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      const uid = localStorage.getItem("uid")?.trim();

      if (!uid) {
        toast.error("❌ User UID missing. Please log in again.");
        return;
      }

      const all = Array.isArray(res.data) ? res.data : [];

      const mine = all.filter((task) => task.createdBy === uid);
      const shared = all.filter((task) => task.createdBy !== uid);

      setMyTasks(mine);
      setSharedTasks(shared);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      toast.error("❌ Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (!newTask) return;

    try {
      const uid = localStorage.getItem("uid");

      const res = await API.post("/tasks", {
        title: newTask,
        dueDate,
        createdBy: uid,
      });

      setMyTasks((prev) => [...prev, res.data]);
      setNewTask("");
      setDueDate("");
      toast.success("✅ Task added successfully");
    } catch (err) {
      console.error("Task creation failed:", err);
      toast.error("❌ Failed to add task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await API.delete(`/tasks/${taskId}`);
      setMyTasks((prev) => prev.filter((t) => t._id !== taskId));
      toast.success("🗑️ Task deleted");
    } catch (err) {
      console.error("Failed to delete task:", err);
      toast.error("❌ Failed to delete task");
    }
  };

  const handleToggleTask = async (taskId) => {
    try {
      const task = myTasks.find((t) => t._id === taskId);
      const updated = { ...task, completed: !task.completed };
      const res = await API.put(`/tasks/${taskId}`, updated);
      setMyTasks((prev) =>
        prev.map((t) => (t._id === taskId ? res.data : t))
      );
      toast.success(`✅ Task marked as ${updated.completed ? "Done" : "Pending"}`);
    } catch (err) {
      console.error("Failed to toggle task:", err);
      toast.error("❌ Failed to update status");
    }
  };

  const handleShareTask = async (taskId) => {
    const email = prompt("Enter email to share this task with:");
    if (!email) return;

    try {
      await API.put(`/tasks/${taskId}/share`, { email });
      toast.success("📤 Task shared successfully");
    } catch (err) {
      console.error("Failed to share task:", err);
      toast.error("❌ Failed to share task");
    }
  };

  const handleEditTask = async (task) => {
    const newTitle = prompt("Edit title:", task.title);
    const newDueDate = prompt(
      "Edit due date (YYYY-MM-DD):",
      task.dueDate?.split("T")[0] || ""
    );

    if (!newTitle) return;

    try {
      const updated = {
        ...task,
        title: newTitle,
        dueDate: newDueDate || null,
      };

      const res = await API.put(`/tasks/${task._id}`, updated);
      setMyTasks((prev) =>
        prev.map((t) => (t._id === task._id ? res.data : t))
      );
      toast.success("✏️ Task updated");
    } catch (err) {
      console.error("Failed to edit task:", err);
      toast.error("❌ Failed to edit task");
    }
  };

  const handleToggleSharedTask = async (task) => {
    try {
      const updated = { ...task, completed: !task.completed };
      const res = await API.put(`/tasks/${task._id}`, updated);
      setSharedTasks((prev) =>
        prev.map((t) => (t._id === task._id ? res.data : t))
      );
      toast.success(`✅ Shared Task marked as ${updated.completed ? "Done" : "Pending"}`);
    } catch (err) {
      console.error("Failed to toggle shared task:", err);
      toast.error("❌ Failed to update shared task");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    toast.info("👋 Logged out");
    navigate("/");
  };

  const filteredMyTasks = myTasks
    .filter((task) =>
      filterStatus === "All"
        ? true
        : filterStatus === "Completed"
        ? task.completed
        : !task.completed
    )
    .sort((a, b) => {
      if (sortOrder === "Newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === "Oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return 0;
    });

  const scrollToRef = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="dashboard-layout">
      <div className="sidebar">
        <h2>📌 DoneZo</h2>
        <ul>
          <li onClick={() => scrollToRef(myTasksRef)}>My Tasks</li>
          <li onClick={() => scrollToRef(sharedTasksRef)}>Shared With Me</li>
          <li onClick={() => setDarkMode((prev) => !prev)}>
            {darkMode ? "🌞 Light Mode" : "🌙 Dark Mode"}
          </li>
          <li onClick={handleLogout} style={{ marginTop: "2rem", color: "red", cursor: "pointer" }}>
            🚪 Logout
          </li>
        </ul>
      </div>

      <div className="main-content">
        <div className="dashboard-header">
          <h1 className="dashboard-title">📝 Your Tasks</h1>
        </div>

        <form onSubmit={handleCreateTask} className="task-form">
          <input
            type="text"
            placeholder="Enter new task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="task-input"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="task-date"
          />
          <button type="submit" className="task-button">
            ➕ Add Task
          </button>
        </form>

        <div className="filters">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">All</option>
            <option value="Completed">✅ Completed</option>
            <option value="Pending">⏳ Pending</option>
          </select>
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
            <option value="Newest">Newest First</option>
            <option value="Oldest">Oldest First</option>
          </select>
        </div>

        <h2 ref={myTasksRef}>📌 My Tasks</h2>
        <div className="task-list">
          {filteredMyTasks.length === 0 ? (
            <p>No tasks found.</p>
          ) : (
            filteredMyTasks.map((task) => (
              <div key={task._id} className={`task-card ${task.completed ? "completed" : ""}`}>
                <h3>{task.title}</h3>
                <p>📅 Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</p>
                <p>Status: {task.completed ? "✅ Completed" : "⏳ Pending"}</p>
                <div className="task-actions">
                  <button onClick={() => handleToggleTask(task._id)} className="toggle-button">
                    {task.completed ? "Mark Pending" : "Mark Done"}
                  </button>
                  <button onClick={() => handleDeleteTask(task._id)} className="delete-button">
                    🗑️ Delete
                  </button>
                  <button onClick={() => handleShareTask(task._id)} className="share-button">
                    🔗 Share
                  </button>
                  <button onClick={() => handleEditTask(task)} className="edit-button">
                    ✏️ Edit
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <h2 ref={sharedTasksRef}>🤝 Tasks Shared With Me</h2>
        <div className="task-list">
          {sharedTasks.length === 0 ? (
            <p>No tasks shared with you.</p>
          ) : (
            sharedTasks.map((task) => (
              <div key={task._id} className={`task-card shared ${task.completed ? "completed" : ""}`}>
                <h3>{task.title}</h3>
                <p>📅 Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}</p>
                <p>Status: {task.completed ? "✅ Completed" : "⏳ Pending"}</p>
                <div className="task-actions">
                  <button onClick={() => handleToggleSharedTask(task)} className="toggle-button">
                    {task.completed ? "Mark Pending" : "Mark Done"}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
