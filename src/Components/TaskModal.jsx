import React, { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Select,
  Option,
  Button,
  Textarea,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskModal = ({ isOpen, onClose, onSave, task }) => {
  const [summary, setSummary] = useState(task?.summary || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "None");
  const [dueDate, setDueDate] = useState(task?.dueDate || "");

  const handleSave = () => {
    if (!summary || !description) {
      toast.error("Please fill in all the required fields!");
      return;
    }

    const taskData = {
      ...task,
      summary,
      description,
      priority,
      dueDate,
    };
    onSave(taskData);

    // success toast
    toast.success("Task saved successfully!");
    onClose();
  };

  return (
    <>
      <Dialog
        open={isOpen}
        handler={onClose}
        className="md:w-2/3  mx-auto md:p-4 z-10"
      >
        <DialogHeader className="text-lg font-bold text-gray-800">
          {task ? "Edit Task" : "Add Task"}
        </DialogHeader>
        <DialogBody className="flex flex-col space-y-6 md:p-6">
          <Input
            label="Summary"
            required
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            className="w-full"
          />
          <Textarea
            label="Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full"
          />
          <div className="flex flex-col md:flex-row justify-center md:justify-between items-center w-full gap-y-2">
            <Select
              label="Priority"
              value={priority}
              onChange={(e) => setPriority(e)}
              className="md:w-1/2"
              menuProps={{
                className: "bg-white shadow-md  cursor-pointer",
              }}
            >
              <Option value="None">None</Option>
              <Option value="Low">Low</Option>
              <Option value="Medium">Medium</Option>
              <Option value="High">High</Option>
            </Select>

            <Input
              label="Due Date"
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className=" w-full md:w-1/2 cursor-pointer"
            />
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-end space-x-3 p-4">
          <Button variant="text" color="red" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="gradient"
            className=" text-gray-50 font-bold"
            color="green"
            onClick={handleSave}
          >
            Save Task
          </Button>
        </DialogFooter>
      </Dialog>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </>
  );
};

export default TaskModal;
