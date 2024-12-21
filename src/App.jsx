import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Default from "./components/Default";
import Delete from "./assets/Delete.svg";
import Edit from "./assets/Edit.svg";
import { v4 as uuIdv4 } from "uuId";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  // Load todos from localStorage on initial render
  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  // This effect will run every time `todos` changes and update localStorage
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
    setTodo(""); // Clear input field
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

  const saveToLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleDelete = async(Id) => {
    let newTodos = await todos.filter(item => item.Id !== Id);
    setTodos(newTodos);
    saveToLocalStorage(newTodos);
  };

  const handleCheck = (Id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.Id === Id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleModalChange = (e) => {
    setCurrentTodo((prevTodo) => ({ ...prevTodo, todo: e.target.value }));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-[75%] my-5 bg-violet-200 p-5 rounded-3xl">
        <span className="text-2xl text-purple-900 font-bold">
          Add Your Todo:
        </span>
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
        {todos.length !== 0 && (
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
        )}
        {todos.length === 0 && <Default />}
        {todos
          .filter((item) => (isFinished ? item.isCompleted : !item.isCompleted))
          .map((item) => (
            <div
              key={item.Id}
              className="todo flex flex-col lg:flex-row gap-4 justify-between items-center my-3 p-3 bg-purple-100 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <div className="left flex gap-3 pl-3 max-w-[60%] overflow-x-auto">
                <input
                  type="checkbox"
                  checked={item.isCompleted}
                  onChange={() => handleCheck(item.Id)}
                  className="custom-checkbox"
                />
                <div className={item.isCompleted ? "line-through opacity-70" : "flex flex-wrap"}>
                  {item.todo}
                </div>
              </div>
              <div className="btn flex h-full gap-3 w-full lg:w-1/3 justify-center">
                <button
                  onClick={() => handleEdit(item.Id)}
                  className="bg-purple-900 flex justify-center gap-3 items-center py-2 w-1/2 rounded-xl font-sans font-bold text-white transition-transform text-sm duration-300 hover:scale-105"
                >
                  <img
                    src={Edit}
                    className="w-7 h-7 filter hue-rotate-[68deg] brightness-125"
                    alt="Edit"
                  />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item.Id)}
                  className="bg-purple-900 flex justify-center gap-3 items-center py-2 w-1/2 rounded-xl font-sans font-bold text-white transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={Delete}
                    className="w-5 h-5 filter hue-rotate-[68deg] brightness-125"
                    alt="Delete"
                  />
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
      {isModalOpen && (
        <div className="modal fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
          <div className="bg-purple-200 xl:w-[35vw] xl:h-[35vh] p-5 rounded-lg shadow-lg">
            <div className="text w-full h-full lg:flex lg:flex-col lg:items-center lg:justify-center ">
              <h2 className="text-xl xl:text-3xl font-bold mb-4">Edit Your Todo</h2>
              <input
                type="text"
                value={currentTodo?.todo || ""}
                onChange={handleModalChange}
                className="xl:w-3/4 w-full p-2 border border-gray-300 rounded-md outline-none"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    setCurrentTodo(null);
                  }}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-purple-900 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
