import React, { useEffect, useState } from "react";
import { getAuth, signOut } from "firebase/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const auth = getAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);

  // ✅ Fetch tasks from backend
  const fetchTasks = async () => {
    const user = auth.currentUser;
    if (!user) return navigate("/");

    const idToken = await user.getIdToken();

    try {
      const response = await axios.get("http://localhost:5000/api/tasks", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("❌ Failed to fetch tasks:", error);
    }
  };

  // ✅ Handle new task creation
  const handleCreateTask = async () => {
    const user = auth.currentUser;
    if (!user) return alert("Please log in again");

    const idToken = await user.getIdToken();

    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title, completed: false },
        {
          headers: {
           Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      setTitle("");
      fetchTasks();
    } catch (error) {
      console.error("❌ Error creating task:", error);
    }
  };

  // ✅ Logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  // ✅ Auto fetch on page load
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-xl mt-10">
      <h2 className="text-xl font-bold mb-4">
        👋 Hello, {auth.currentUser?.displayName} <br />
        <span className="text-sm text-gray-500">{auth.currentUser?.email}</span>
      </h2>

      <button
        onClick={handleLogout}
        className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Logout
      </button>

      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="flex-grow px-3 py-2 border rounded"
        />
        <button
          onClick={handleCreateTask}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Task
        </button>
      </div>

      <div>
        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet.</p>
        ) : (
          <ul className="list-disc pl-5 space-y-1">
            {tasks.map((task) => (
              <li key={task._id} className={task.completed ? "line-through" : ""}>
                {task.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
