import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Delete from "./assets/Delete.svg";
import Edit from "./assets/Edit.svg";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

 
  const handleAdd = () => {
    if (todo.trim() === "") return;
    const now = new Date();
    const id = now.toDateString();
    const time = now.toLocaleTimeString();
    setTodos([...todos, { id, time, todo, isCompleted: false }]);
    setTodo("");
  };


  const handleEdit = () => {};
  const handleDelete = () => {};
  const handleCheck = () => {
    todos.map((item) => {
      if (item.todo === todo) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto max-w-[75%] my-5 bg-violet-200 p-5 rounded-3xl">
        <span className="text-2xl text-purple-900 font-bold">
          Add Your Todo :
        </span>
        <div className="addTodo flex gap-3 justify-center px-4 my-3 focus:outline-purple-900">
          <input type="text" onChange={handleChange} placeholder="Add New Todo" className="w-[70%] shadow-xl p-3 rounded-md border-none outline-none bg-purple-50" />
          <button type="button" onClick={handleAdd} className="bg-purple-900 text-white px-6 shadow-2xl py-2 rounded-lg font-bold transition-transform duration-300 hover:scale-105">
            Add
          </button>
        </div>
      </div>
      <div className="Todos mx-auto max-w-[75%] my-5 bg-violet-200 p-5 rounded-3xl">
        <span className="text-2xl text-purple-900 font-bold">
          Your Todo's
        </span>
        {todos.length > 0 && todos.map((item) => (
          <div key={item.id} className="todo flex gap-4 justify-between items-center my-3 p-3 bg-purple-100 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden">
            <div className="left flex gap-3 items-center pl-3">
              <input onClick={handleCheck} type="checkbox" className="custom-checkbox" />
              <span className={item.isCompleted?"line-through opacity-70 ":""}>{item.todo}</span>
            </div>
            <div className="btn flex gap-3 w-1/4">
              <button onClick={handleEdit} className="bg-purple-900 flex justify-center gap-3 items-center py-2 flex-1 rounded-xl font-sans font-bold text-white transition-transform duration-300 hover:scale-105">
                <img src={Edit} className="w-7 h-7 filter hue-rotate-[68deg] brightness-125" alt="Edit" />
                Edit
              </button>
              <button onClick={handleDelete} className="bg-purple-900 flex justify-center gap-3 items-center py-2 flex-1 rounded-xl font-sans font-bold text-white transition-transform duration-300 hover:scale-105">
                <img src={Delete} className="w-5 h-5 filter hue-rotate-[68deg] brightness-125" alt="Delete" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
