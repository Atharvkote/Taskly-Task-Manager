import { useState, useEffect } from "react";
import { CopilotPopup } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";
import Navbar from "./Navbar";
import Default from "./utils/Default";
import NoGroups from "../assets/No-Groups.png";
import TodoItem from "./TodoItem";
import TodoModal from "./utils/TodoModal";
import { v4 as uuIdv4 } from "uuid";
import { SiTicktick } from "react-icons/si";
import { HiMiniTrophy } from "react-icons/hi2";
import "../App.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaPlus, FaBookmark } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosArrowForward } from "react-icons/io";


function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const { username, isLoggedIn } = useSelector((state) => state.user);
  const [GroupsMade, setGroupsMade] = useState(false);
  useEffect(() => {
    //  console.log(username);
    FetchTodos();
  }, []);

  const FetchTodos = async () => {
    try {
      const response = await fetch(`http://localhost:3000?username=${username}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const fetchedTodos = await response.json();
      setTodos(fetchedTodos);

      // Log the fetched todos here instead of after the state update
      // console.log(fetchedTodos);

      // Optionally, store todos in local storage
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
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Id: newTodo.Id,
          username: username,
          todo: newTodo.todo,
          date: newTodo.date,
          time: newTodo.time,
          isCompleted: newTodo.isCompleted,
        }),
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
        transition: Bounce,
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
          username: username,
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
        transition: Bounce,
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
        body: JSON.stringify({ Id: Id, username: username }), // Send Id in the request body
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
        transition: Bounce,
        style: {
          backgroundColor: '#ddd6fe',  // Custom background color
          color: '#000000',
        },
      });
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const clearTodo = () => { setTodo(""); }
  const handleCheck = async (Id) => {
    const response = await fetch("http://localhost:3000/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Id: Id, username: username }), // Send Id in the request body
    });
    let res = await response.json();
    // console.log(res);

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
      transition: Bounce,
      style: {
        backgroundColor: '#ddd6fe',  // Custom background color
        color: '#000000',
      },
    });
  };

  return (
    <div className="">
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
        transition="Bounce"
      />
      <Navbar />
      <div className="whole lg:flex lg:justify-around lg:gap-5 lg:px-5">
        <div className="container mx-auto max-w-[75%] my-5 bg-violet-200 py-5 rounded-3xl lg:flex-[0.20] min-h-[100vh]">
          <span className="text-2xl text-purple-900 font-bold px-5">Add a Task</span>
          <div className="addTodo flex flex-col h-[30%] gap-3  px-5 my-3">
            <textarea
              value={todo}
              onChange={handleChange}
              placeholder="Add New Todo"
              className="w-full  h-[100%] shadow-xl p-3 rounded-md border-none outline-none bg-purple-50"
            />
            <div className="btn flex justify-evenly gap-2">
              <button
                disabled={todo.length < 5}
                type="button"
                onClick={handleAdd}
                className="bg-purple-900 flex-[0.75] text-white px-6 shadow-2xl py-2 rounded-lg font-bold transition-transform duration-300 hover:scale-105 cursor-pointer"
              >
                Save Task
              </button>
              <button
                disabled={todo.length < 5}
                onClick={clearTodo}
                className="bg-purple-900 flex-[0.20] text-white px-3 flex justify-center text-center shadow-2xl py-2 rounded-lg font-bold transition-transform duration-300 hover:scale-105 cursor-pointer"><RiDeleteBin6Line className="text-2xl" /></button>
            </div>
          </div>
          <div className="pannel w-full px-5">
            <span className="text-2xl text-purple-900 font-bold">Your Groups</span>
            {!GroupsMade ? (
              <div className="default flex flex-col justify-center items-center">
                <img src={NoGroups} alt="No-groups" height={150} width={150} />
                <span className="text-lg text-purple-900 font-sans font-bold">
                  No Groups yet...
                </span>
                <button
                  type="button"
                  className="bg-purple-900 w-full mt-3 flex gap-2 items-center justify-center text-white px-6 shadow-2xl py-2 rounded-lg font-bold hover-transform "
                >
                  Create Group <FaPlus />
                </button>
              </div>
            ) : (
              <div className="group-list mt-3">
                <div className="bg-purple-900 w-full py-2 px-4 flex justify-center items-center text-white font-bold rounded-md cursor-pointer hover-transform my-1  ">Daily Task</div>
                <div className="bg-purple-900 w-full py-2 px-4 flex justify-center items-center text-white font-bold rounded-md cursor-pointer hover-transform  ">Team BYPAS</div>
              </div>
            )}

          </div>
          <div className="bookmark flex gap-2 items-center justify-between bg-purple-100 hover:shadow-xl hover:rounded-lg transition-transform duration-300 hover:scale-105 w-full shadow-md  px-4 py-2 mt-5 cursor-pointer">
            <span className=" flex gap-3 items-center text-purple-900 text-[16px] font-bold" ><FaBookmark /> Bookmarked tasks </span>
            <IoIosArrowForward className="text-purple-900" />
          </div>
          <div className="bookmark flex gap-2 items-center justify-between bg-purple-100 hover:shadow-xl hover:rounded-lg transition-transform duration-300 hover:scale-105 w-full shadow-md  px-4 py-2 cursor-pointer">
            <span className=" flex gap-3 items-center text-purple-900 text-[16px] font-bold" ><SiTicktick /> Completed Tasks </span>
            <IoIosArrowForward className="text-purple-900" />
          </div>
          <div className="bookmark flex gap-2 items-center justify-between bg-purple-100 hover:shadow-xl hover:rounded-lg transition-transform duration-300 hover:scale-105 w-full shadow-md  px-4 py-2 cursor-pointer">
            <span className=" flex gap-3 items-center text-purple-900 text-[16px] font-bold" ><HiMiniTrophy /> Accomplishments </span>
            <IoIosArrowForward className="text-purple-900" />
          </div>
        </div>
        <div className="Todos min-h-[70vh] mx-auto lg:flex-[0.80] max-w-[75%] my-5 bg-violet-200 p-5 rounded-3xl">
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
      </div>
    </div>
  );
}

export default App;
