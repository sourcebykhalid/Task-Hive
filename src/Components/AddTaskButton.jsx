import React from "react";
import { FaPlus } from "react-icons/fa";

const AddTaskButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-5 right-5 bg-blue-500 text-black rounded-full p-6 shadow-lg hover:bg-blue-600"
    >
      <FaPlus className=" md:text-3xl font-bold" />
    </button>
  );
};

export default AddTaskButton;
