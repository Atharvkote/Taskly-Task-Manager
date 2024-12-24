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
    FetchTodos();
    // const storedTodos = localStorage.getItem("todos");
    // if (storedTodos) {
    //   setTodos(JSON.parse(storedTodos));
    // }
  }, []);

  const FetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const fetchedTodos = await response.json();
      setTodos(fetchedTodos);

      // Store todos in local storage
      // localStorage.setItem("todos", JSON.stringify(fetchedTodos));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  useEffect(() => {FetchTodos();}, [todos]);

  const toggleShow = () => {
    setIsFinished(!isFinished);
  };

  const handleChange = (e) => setTodo(e.target.value);
  
  const handleAdd = async () => {
    const newTodo = {
      Id: uuIdv4(),
      todo,
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
      isCompleted: false,
    };
  
    // Update state
    setTodos([...todos, newTodo]);
    setTodo(""); // Clear input
  
    try {
      const response = await fetch("https://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      console.log("Todo successfully added to the server!");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
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
    try {
      const request = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id }),
      });
  
      if (!request.ok) {
        throw new Error(`HTTP error! Status: ${request.status}`);
      }
  
      const response = await request.json();
      console.log("Delete Response:", response);
  
      // Update the local state by removing the deleted todo
      setTodos((prevTodos) => prevTodos.filter((item) => item.Id !== Id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
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
          disabled={todo.length < 5}
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
        {todos.length != 0 && <div className="dashboard flex gap-5 my-5 justify-center w-full">
          <button
            onClick={toggleShow}
            className="bg-purple-900 w-full lg:w-1/4 text-xs sm:text-xl text-white px-6 shadow-2xl py-2 rounded-xl font-bold transition-transform duration-300 hover:scale-105"
          >
            Show Finished
          </button>
          <button
            disabled={!isFinished}
            onClick={toggleShow}
            className="bg-purple-900 w-full lg:w-1/4 text-xs sm:text-xl text-white px-6 shadow-2xl py-2 rounded-xl font-bold transition-transform duration-300 hover:scale-105"
          >
            Show Pending
          </button>
        </div>}
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
