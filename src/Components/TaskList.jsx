import React, { useState } from "react";
import {
  AiOutlineEdit,
  AiOutlineDelete,
  AiOutlineCheck,
  AiOutlineReload,
} from "react-icons/ai";
import { GrView } from "react-icons/gr";
import { Tooltip } from "@material-tailwind/react";
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
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  // Open modal for viewing task details
  const handleOpenViewModal = (task) => {
    setSelectedTask(task);
    setIsViewModalOpen(true);
  };

  // Close modal
  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedTask(null);
  };

  const { column, direction } = sortConfig || {};

  return (
    <Reveal>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 shadow-lg rounded-lg bg-white">
          <thead>
            <tr className="bg-gradient-to-r from-cyan-300 to-blue-500 text-white">
              <th
                className="py-3 px-6 cursor-pointer border border-gray-300 text-left "
                onClick={() => onSort("summary")}
              >
                Summary{" "}
                {column === "summary" ? (direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th
                className="py-3 px-6 cursor-pointer border border-gray-300 text-left"
                onClick={() => onSort("createdOn")}
              >
                D.O.C{" "}
                {column === "createdOn"
                  ? direction === "asc"
                    ? "↑"
                    : "↓"
                  : ""}
              </th>
              <th
                className="py-3 px-6 cursor-pointer border border-gray-300 text-left"
                onClick={() => onSort("priority")}
              >
                Priority{" "}
                {column === "priority" ? (direction === "asc" ? "↑" : "↓") : ""}
              </th>
              <th className="py-3 px-6 border border-gray-300 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className={`transition-all duration-300 ${
                  task.completed
                    ? "bg-green-100 hover:bg-green-200"
                    : "bg-yellow-100 hover:bg-yellow-200"
                }`}
              >
                <td className="py-3 px-6 border border-gray-300">
                  <span className=" text-gray-700 font-semibold">
                    {task.summary}
                  </span>
                </td>
                <td className="py-3 px-6 border border-gray-300 text-sm">
                  {new Date(task.createdOn).toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td className="py-3 px-6 border border-gray-300">
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
                <td className="py-5 px-6 border border-gray-300 flex justify-center space-x-4">
                  <Tooltip content="Edit Task" placement="top">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => onEdit(task)}
                    >
                      <AiOutlineEdit size={20} />
                    </button>
                  </Tooltip>
                  <Tooltip content="Delete Task" placement="top">
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => onDelete(task)}
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </Tooltip>
                  <Tooltip
                    content={
                      task.completed ? "Mark as Pending" : "Complete Task"
                    }
                    placement="top"
                  >
                    <button
                      className={`${
                        task.completed ? "text-gray-500" : "text-green-500"
                      } hover:opacity-80`}
                      onClick={() => onToggleStatus(task)}
                    >
                      {task.completed ? (
                        <AiOutlineReload size={20} />
                      ) : (
                        <AiOutlineCheck size={20} />
                      )}
                    </button>
                  </Tooltip>
                  <Tooltip content="View Task" placement="top">
                    <button
                      className="text-gray-600 hover:text-gray-800"
                      onClick={() => handleOpenViewModal(task)}
                    >
                      <GrView size={20} />
                    </button>
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* View Task Modal */}
        {isViewModalOpen && selectedTask && (
          <ViewTaskModal
            isOpen={isViewModalOpen}
            onClose={handleCloseViewModal}
            task={selectedTask}
          />
        )}
      </div>
    </Reveal>
  );
};

export default TaskList;
