import React, { useState, useEffect } from "react";
import Header from "./Components/HeroHeading";
import Tabs from "./Components/Tabs";
import TaskList from "./Components/TaskList";
import AddTaskButton from "./Components/AddTaskButton";
import TaskModal from "./Components/TaskModal";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("All Tasks");
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBy, setGroupBy] = useState("none");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    column: "summary", // Set a default column
    direction: "asc",
  });

  // Load tasks from localStorage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    if (savedTasks && savedTasks.length > 0) {
      setTasks(savedTasks);
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Filter tasks based on active tab
  const filteredTasks = tasks.filter((task) => {
    if (activeTab === "Completed") return task.completed;
    if (activeTab === "Pending") return !task.completed;
    return true;
  });

  // Handle search
  const searchedTasks = filteredTasks.filter((task) =>
    task.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group tasks dynamically
  const groupTasks = (tasks, groupBy) => {
    if (groupBy === "none") return tasks;

    const grouped = tasks.reduce((acc, task) => {
      const key = task[groupBy] || "Other";
      acc[key] = acc[key] || [];
      acc[key].push(task);
      return acc;
    }, {});

    return Object.entries(grouped); // Convert object to array for rendering
  };

  const groupedTasks = groupTasks(searchedTasks, groupBy);

  // Handle Add/Edit Task
  const handleSaveTask = (task) => {
    if (!task.summary || task.summary.trim() === "") {
      // Prevent adding a task without a title
      alert("Task title is required to add a new task.");
      return;
    }

    setTasks((prevTasks) => {
      const updatedTasks = task.id
        ? prevTasks.map((t) => (t.id === task.id ? task : t))
        : [
            {
              ...task,
              id: Date.now(),
              completed: false,
              createdOn: new Date().toISOString(),
            },
            ...prevTasks,
          ];
      console.log("Updated tasks state:", updatedTasks);
      return updatedTasks;
    });

    setIsModalOpen(false);
    setCurrentTask(null);
  };

  // Handle Delete Task
  const handleDeleteTask = (task) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
  };

  // Handle Toggle Task Status
  const handleToggleStatus = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };
  const sortedTasks = [...searchedTasks].sort((a, b) => {
    if (!sortConfig.column) return 0; // No sorting by default

    const aValue = a[sortConfig.column];
    const bValue = b[sortConfig.column];

    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const handleSort = (column) => {
    setSortConfig((prevSortConfig) => {
      if (prevSortConfig.column === column) {
        // Toggle direction if the same column is clicked
        return {
          column,
          direction: prevSortConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      // Default to ascending for a new column
      return { column, direction: "asc" };
    });

    // Sort tasks based on the updated configuration
    const sortedTasks = [...tasks].sort((a, b) => {
      const valueA = a[column];
      const valueB = b[column];

      if (valueA < valueB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valueA > valueB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    setTasks(sortedTasks);
  };

  return (
    <div
      className={`min-h-screen  bg-gradient-to-br from-gray-50 via-blue-gray-100 to-black ${
        isModalOpen ? "inert" : ""
      }`}
    >
      <Header onSearch={setSearchQuery} onGroupBy={setGroupBy} />
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className=" p-0 md:p-4">
        {groupBy === "none" ? (
          <TaskList
            tasks={searchedTasks}
            onEdit={(task) => {
              setCurrentTask(task);
              setIsModalOpen(true);
            }}
            onDelete={handleDeleteTask}
            onToggleStatus={handleToggleStatus}
          />
        ) : (
          groupedTasks.map(([group, tasks]) => (
            <div key={group} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">{group}</h3>
              <TaskList
                tasks={tasks}
                onEdit={(task) => {
                  setCurrentTask(task);
                  setIsModalOpen(true);
                }}
                onDelete={handleDeleteTask}
                onToggleStatus={handleToggleStatus}
                onSort={handleSort}
                sortConfig={sortConfig}
              />
            </div>
          ))
        )}
      </div>

      <AddTaskButton onClick={() => setIsModalOpen(true)} />

      {isModalOpen && (
        <TaskModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveTask}
          task={currentTask}
        />
      )}
    </div>
  );
};

export default App;
