import React from "react";
import { FaPlus } from "react-icons/fa";

const AddTaskButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5  bg-gradient-to-br from-cyan-500 to-blue-600 text-gray-900 rounded-full p-5 shadow-lg hover:bg-cyan-700 z-50 hover:scale-95 transition-all "
    >
      <FaPlus className=" md:text-4xl font-bold" />
    </button>
  );
};

export default AddTaskButton;
