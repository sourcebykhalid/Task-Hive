import { useState, useEffect } from "react";
import { TodoProvider } from "./Contexts";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";
import Reveal from "./Components/Reveal";
import HeroHeading from "./Components/HeroHeading";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [
      { id: Date.now(), ...todo, createdAt: new Date().toLocaleDateString() },
      ...prev,
    ]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem("todos"));
    if (savedTodos && savedTodos.length > 0) {
      setTodos(savedTodos);
    } else {
      localStorage.setItem("todos", JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
        <HeroHeading />

        <div className="flex flex-col md:flex-row justify-center items-start pt-6 w-full px-4 md:px-8">
          <div className="max-w-3xl md:w-1/3 mx-4 md:mx-auto px-6 py-6 bg-neutral-800 text-white rounded-lg shadow-lg">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-100 mb-6 text-center">
              <Reveal>Stay on Top of Your Tasks</Reveal>
            </h1>
            <div className="mb-6">
              <TodoForm />
            </div>
          </div>

          <div className="w-full md:w-2/3 grid md:grid-cols-2 gap-6 p-4">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
