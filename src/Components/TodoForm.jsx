import { useState } from "react";
import { useTodo } from "../Contexts";
import { Input, Textarea, Button, Card } from "@material-tailwind/react";
import Reveal from "./Reveal";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium"); // Priority state
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, description, priority, completed: false });
    setTodo("");
    setDescription("");
    setPriority("P2"); // Reset after adding
  };

  return (
    <Card className="p-6 bg-neutral-900/80 shadow-lg shadow-slate-800">
      <form onSubmit={add} className="space-y-4">
        <Reveal>
          {/* Native Select Dropdown for Priority */}
          <label className="block text-white font-bold mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-2 text-lg text-neutral-900 bg-white rounded-md shadow-md focus:outline-none"
          >
            <option value="P1">P1</option>
            <option value="P2">P2</option>
            <option value="P3">P3</option>
          </select>
        </Reveal>
        <Reveal>
          <Input
            type="text"
            label="Task Title"
            placeholder="Please enter task title"
            className="text-neutral-300 py-3 outline-none font-bold text-lg md:text-xl"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
            required
            size="lg"
            color="white"
          />
        </Reveal>
        <Reveal>
          <Textarea
            label="Task Description"
            placeholder="Add a detailed description of the task"
            className="text-neutral-300 outline-none font-bold text-sm md:text-lg"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            size="lg"
            color="white"
          />
        </Reveal>
        <Reveal>
          <Button
            type="submit"
            className="w-full border-b-4 border-red-500 px-2 hover:bg-green-300 transition-all hover:text-neutral-900 hover:p-3"
            color="green"
            size="lg"
            fullWidth
          >
            Add Task
          </Button>
        </Reveal>
      </form>
    </Card>
  );
}

export default TodoForm;
