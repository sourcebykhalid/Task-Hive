import React, { useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCheck,
  AiOutlineReload,
} from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { Tooltip, Card } from "@material-tailwind/react";
import ViewTaskModal from "./ViewTaskModal";
import Reveal from "./Reveal";

const TaskList = ({
  tasks,
  onEdit,
  onDelete,
  onToggleStatus,
  onSort,
  sortConfig,
}) => {
  const [viewModalState, setViewModalState] = useState({
    isOpen: false,
    task: null,
  });

  const toggleViewModal = (task) => {
    setViewModalState((prevState) => ({
      isOpen: !prevState.isOpen,
      task: prevState.isOpen ? null : task,
    }));
  };

  return (
    <Card className="overflow-x-auto">
      <table className=" border-collapse border border-gray-300 shadow-lg rounded-lg bg-white">
        <thead>
          <tr className="bg-gradient-to-r from-cyan-300 to-blue-500 text-white">
            {["Summary", "D.O.C", "Due Date", "Priority", "Actions"].map(
              (col, index) => (
                <th
                  key={col}
                  className={`py-3 px-3 md:px-6 cursor-pointer border border-gray-300 ${
                    index < 4 ? "text-left" : "text-center"
                  }`}
                  onClick={() => index < 4 && onSort(col.toLowerCase())} // Ensure correct column is passed
                >
                  {col}
                  {sortConfig?.column === col.toLowerCase() &&
                    (sortConfig.direction === "asc" ? " ↑" : " ↓")}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr
              key={task.id}
              className={`transition-all duration-300 ${
                task.completed
                  ? "bg-green-200 hover:bg-green-200"
                  : "bg-yellow-100 hover:bg-yellow-200"
              }`}
            >
              <td className="py-3 px-3 md:px-6">{task.summary}</td>
              <td className="py-3 px-3 md:px-6 text-sm">
                {new Date(task.createdOn).toLocaleDateString()}
              </td>
              <td className="py-3 px-3 md:px-6 text-sm">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "N/A"}
              </td>
              <td className="py-3 px-3 md:px-6">
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    task.priority === "High"
                      ? "bg-red-500 text-white"
                      : task.priority === "Medium"
                      ? "bg-yellow-500 text-white"
                      : "bg-green-500 text-white"
                  }`}
                >
                  {task.priority}
                </span>
              </td>
              <td className="py-5 px-3 md:px-6 flex justify-center space-x-4">
                <Tooltip content="Edit Task">
                  <button
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => onEdit(task)}
                  >
                    <AiOutlineEdit size={20} />
                  </button>
                </Tooltip>
                <Tooltip content="Delete Task">
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => onDelete(task)}
                  >
                    <AiOutlineDelete size={20} />
                  </button>
                </Tooltip>
                <Tooltip
                  content={task.completed ? "Mark as Pending" : "Complete Task"}
                >
                  <button
                    className={
                      task.completed ? "text-gray-500" : "text-green-500"
                    }
                    onClick={() => onToggleStatus(task)}
                  >
                    {task.completed ? (
                      <AiOutlineReload size={20} />
                    ) : (
                      <AiOutlineCheck size={20} />
                    )}
                  </button>
                </Tooltip>
                <Tooltip content="View Task">
                  <button
                    className="text-gray-600 hover:text-gray-800"
                    onClick={() => toggleViewModal(task)}
                  >
                    <GrView size={20} />
                  </button>
                </Tooltip>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {viewModalState.isOpen && (
        <ViewTaskModal
          isOpen={viewModalState.isOpen}
          onClose={toggleViewModal}
          task={viewModalState.task}
        />
      )}
    </Card>
  );
};

export default TaskList;
