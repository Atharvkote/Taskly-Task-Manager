import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Default from "./components/utils/Default";
import TodoItem from "./components/TodoItem";
import TodoModal from "./components/TodoModal";
import { v4 as uuIdv4 } from "uuid";
import "./App.css";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => { FetchTodos(); }, []);

  const FetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:3000/");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const fetchedTodos = await response.json();
      setTodos(fetchedTodos);
      console.log(todos);

      // Store todos in local storage
      // localStorage.setItem("todos", JSON.stringify(fetchedTodos));
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };


  const toggleShow = () => {
    setIsFinished(!isFinished);
  };

  const handleChange = (e) => setTodo(e.target.value);


  const handleAdd = async () => {
    const newTodo = {
      Id: uuIdv4(), // Ensure consistent capitalization with backend
      todo,
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
      isCompleted: false,
    };

    try {
      // Save to backend
      const response = await fetch("http://localhost:3000", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      toast.success('Todo Added Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition:Bounce,
        style: {
          backgroundColor: '#ddd6fe',  // Custom background color
          color: '#000000', 
        },
        });

      // Fetch updated todos
      FetchTodos();

      // Clear input
      setTodo("");
    } catch (error) {
      console.error("Failed to add todo:", error);
    }
  };

  const handleEdit = (Id) => {
    const todoToEdit = todos.find((todo) => todo.id === Id);
    if (todoToEdit) {
      setCurrentTodo({ ...todoToEdit });
      setIsModalOpen(true);
    }
  };


  const handleSave = async () => {
    try {
      const response = await fetch("http://localhost:3000/edit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Id: currentTodo.id,
          newTodo: currentTodo.todo,  // Ensure currentTodo.todo has the new value
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log(result);  // Optional for debugging
  
      // Fetch updated todos and close modal
      FetchTodos();
      setIsModalOpen(false);
      toast.info('Todo Updated Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition:Bounce,
        style: {
          backgroundColor: '#ddd6fe',  // Custom background color
          color: '#000000', 
        },
        });
      setCurrentTodo(null);
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };
  

  const handleDelete = async (Id) => {
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ Id: Id }), // Send Id in the request body
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      //console.log("Todo successfully deleted!");

      // Refresh the todo list
      FetchTodos();
      toast.error('Task Deleted Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition:Bounce,
        style: {
          backgroundColor: '#ddd6fe',  // Custom background color
          color: '#000000', 
        },
        });
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };


  const handleCheck = async (Id) => {
    const response = await fetch("http://localhost:3000/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Id: Id }), // Send Id in the request body
    });
    let res = await response.json();
    console.log(res);

    FetchTodos();

    toast.info('Task Status Updated!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition:Bounce,
      style: {
        backgroundColor: '#ddd6fe',  // Custom background color
        color: '#000000', 
      },
      });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={"Bounce"}
      />
      <Navbar />
      
      <div className="container mx-auto max-w-[75%] my-5 bg-violet-200 p-5 rounded-3xl">
        <span className="text-2xl text-purple-900 font-bold">Add a Task</span>
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
        <span className="text-2xl text-purple-900 font-bold">Your Upcoming Tasks</span>
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
              key={item.id}
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
