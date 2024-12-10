import React, { useState, useEffect, useMemo } from "react";
import Header from "./Components/Header";
import Tabs from "./Components/Tabs";
import TaskList from "./Components/TaskList";
import AddTaskButton from "./Components/AddTaskButton";
import TaskModal from "./Components/TaskModal";
import HeroSection from "./Components/Hero";
import { About } from "./Components/About";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("All Tasks");
  const [searchQuery, setSearchQuery] = useState("");
  const [groupBy, setGroupBy] = useState("none");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    column: null,
    direction: null,
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

  // Handle search Function......
  const searchedTasks = filteredTasks.filter((task) =>
    task.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group tasks dynamically........
  const groupTasks = (tasks, groupBy) => {
    if (groupBy === "none") return tasks;

    return tasks.reduce((acc, task) => {
      let key;

      // Grouping by 'createdOn'
      if (groupBy === "createdOn") {
        key = task.createdOn
          ? new Date(task.createdOn).toLocaleDateString("en-CA") // Format: YYYY-MM-DD
          : "No Date";
      }
      // Grouping by 'completed' status
      else if (groupBy === "completed") {
        key = task.completed ? "Completed" : "Pending";
      }
      // Grouping by any other property
      else {
        key = task[groupBy] || "No Value";
      }

      acc[key] = acc[key] || [];
      acc[key].push(task);
      return acc;
    }, {});
  };

  const groupedTasks = Object.entries(groupTasks(searchedTasks, groupBy));

  // Handle Add/Edit Task.......
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

  // Handle Delete Task.....
  const handleDeleteTask = (task) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== task.id));
  };

  // Handle Toggle Task Status.......
  const handleToggleStatus = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };
  const sortedTasks = useMemo(() => {
    let tasksToSort = [...searchedTasks];
    if (sortConfig.direction === "asc") {
      tasksToSort.sort((a, b) => (a.summary > b.summary ? 1 : -1));
    } else if (sortConfig.direction === "desc") {
      tasksToSort.sort((a, b) => (a.summary < b.summary ? 1 : -1));
    } else if (sortConfig.direction === "priority") {
      const priorities = { High: 3, Medium: 2, Low: 1, None: 0 };
      tasksToSort.sort(
        (a, b) => priorities[b.priority] - priorities[a.priority]
      );
    }
    return tasksToSort;
  }, [searchedTasks, sortConfig]);

  const handleSort = (sortType) => {
    setSortConfig({ column: "summary", direction: sortType });
  };

  return (
    <div
      className={`min-h-screen  bg-gradient-to-br from-gray-50 via-blue-gray-100 to-black ${
        isModalOpen ? "inert" : ""
      }`}
    >
      <Header onSearch={setSearchQuery} onGroupBy={setGroupBy} />
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onSort={handleSort}
      />

      <div className="p-0 md:p-4 flex flex-col md:flex-row justify-center items-start gap-x-2 ">
        <div className=" w-screen md:w-2/3">
          {groupBy === "none" ? (
            <TaskList
              tasks={sortedTasks} // Use the sortedTasks here
              onEdit={(task) => {
                setCurrentTask(task);
                setIsModalOpen(true);
              }}
              sortConfig={sortConfig}
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
                  sortConfig={sortConfig}
                />
              </div>
            ))
          )}
        </div>
        <HeroSection className=" md:w-1/3 " />
      </div>
      <About />

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
