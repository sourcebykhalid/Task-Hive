import { useState } from "react";
import { useTodo } from "../Contexts";
import { Input, Textarea, Button, Card } from "@material-tailwind/react";
import Reveal from "./Reveal";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const [description, setDescription] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ todo, description, completed: false });
    setTodo("");
    setDescription("");
  };

  return (
    <Card className="p-6 bg-neutral-900/80 shadow-lg shadow-slate-800 ">
      <form onSubmit={add} className="space-y-4">
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
            Add Note
          </Button>
        </Reveal>
      </form>
    </Card>
  );
}

export default TodoForm;
