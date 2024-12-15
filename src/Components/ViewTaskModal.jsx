import React from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";

const ViewTaskModal = ({ isOpen, onClose, task }) => {
  if (!task) return null;

  return (
    <Dialog
      className={`w-full h-fit md:w-2/3 ${
        task.completed ? " bg-green-100" : ""
      } `}
      open={isOpen}
      handler={onClose}
    >
      <DialogHeader className="border-b-2 border-indigo-700">
        {task.summary}
      </DialogHeader>
      <DialogBody className="overflow-y-scroll max-h-[500px] px-4">
        <p>
          <strong className="font-bold text-blue-gray-900">Description:</strong>{" "}
          {task.description}
        </p>
        <p>
          <strong className="font-bold text-blue-gray-900">Priority:</strong>{" "}
          {task.priority}
        </p>
        <p>
          <strong className="font-bold text-blue-gray-900">Created On:</strong>{" "}
          {new Date(task.createdOn).toLocaleDateString()}
        </p>
        <p>
          <strong className="font-bold text-blue-gray-900">Due Date:</strong>{" "}
          {new Date(task.dueDate).toLocaleDateString()}
        </p>
        <p
          className={`${
            task.completed
              ? " font-extrabold text-green-600"
              : " text-gray-900 font-extrabold"
          } `}
        >
          <strong className={`font-bold text-blue-gray-900 `}>Status:</strong>{" "}
          {task.completed ? "Completed" : "Pending"}
        </p>
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="red" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ViewTaskModal;
