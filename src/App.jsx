import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Default from "./components/Default";
import TodoItem from "./components/TodoItem";
import TodoModal from "./components/TodoModal";
import { v4 as uuIdv4 } from "uuid";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const toggleShow = () => {
    setIsFinished(!isFinished);
  };

  const handleChange = (e) => setTodo(e.target.value);

  const handleAdd = () => {
    setTodos([
      ...todos,
      {
        Id: uuIdv4(),
        todo,
        date: new Date().toDateString(),
        time: new Date().toLocaleTimeString(),
        isCompleted: false,
      },
    ]);
    setTodo("");
  };

  const handleEdit = (Id) => {
    const todoToEdit = todos.find((todo) => todo.Id === Id);
    if (todoToEdit) {
      setCurrentTodo({ ...todoToEdit });
      setIsModalOpen(true);
    }
  };

  const handleSave = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.Id === currentTodo.Id ? { ...todo, ...currentTodo } : todo
      )
    );
    setIsModalOpen(false);
    setCurrentTodo(null);
  };

  const handleDelete = async (Id) => {
    const newTodos = todos.filter((item) => item.Id !== Id);
    setTodos(newTodos);
  };

  const handleCheck = (Id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.Id === Id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-[75%] my-5 bg-violet-200 p-5 rounded-3xl">
        <span className="text-2xl text-purple-900 font-bold">Add Your Todo:</span>
        <div className="addTodo flex gap-3 justify-center px-4 my-3">
          <input
            type="text"
            value={todo}
            onChange={handleChange}
            placeholder="Add New Todo"
            className="w-[70%] shadow-xl p-3 rounded-md border-none outline-none bg-purple-50"
          />
          <button
            type="button"
            onClick={handleAdd}
            className="bg-purple-900 text-white px-6 shadow-2xl py-2 rounded-lg font-bold transition-transform duration-300 hover:scale-105"
          >
            Add
          </button>
        </div>
      </div>
      <div className="Todos min-h-[70vh] mx-auto max-w-[75%] my-5 bg-violet-200 p-5 rounded-3xl">
        <span className="text-2xl text-purple-900 font-bold">Your Todos:</span>
        <div className="dashboard flex gap-5 my-5 justify-center w-full">
          <button
            onClick={toggleShow}
            className="bg-purple-900 w-1/4 text-xl text-white px-6 shadow-2xl py-2 rounded-lg font-bold transition-transform duration-300 hover:scale-105"
          >
            Show Finished
          </button>
          <button
            disabled={!isFinished}
            onClick={toggleShow}
            className="bg-purple-900 w-1/4 text-xl text-white px-6 shadow-2xl py-2 rounded-lg font-bold transition-transform duration-300 hover:scale-105"
          >
            Show Pending
          </button>
        </div>
        {todos.length === 0 && <Default />}
        {todos
          .filter((item) => (isFinished ? item.isCompleted : !item.isCompleted))
          .map((item) => (
            <TodoItem
              key={item.Id}
              item={item}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              handleCheck={handleCheck}
            />
          ))}
      </div>
      {isModalOpen && (
        <TodoModal
          currentTodo={currentTodo}
          setCurrentTodo={setCurrentTodo}
          handleSave={handleSave}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}

export default App;
