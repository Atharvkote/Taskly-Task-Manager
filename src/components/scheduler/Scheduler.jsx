import React from 'react'
import Navbar from '../Navbar'
import Calender from './Calender'
import { FaTasks } from "react-icons/fa";
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";

const Scheduler = () => {
  const { username, isLoggedIn } = useSelector((state) => state.user);
  const [todos, setTodos] = useState([])
  useEffect(() => { FetchTodos(); }, []);
  const FetchTodos = async () => {
    try {
      const response = await fetch(`http://localhost:3000?username=${username}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const fetchedTodos = await response.json();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };



  return (
    <div>
      <Navbar />
      <div className="container flex flex-row justify-around gap-5 w-full h-full">
        <div className="sidebar my-5 rounded-tr-md rounded-br-md h-[100vh] bg-violet-200 w-1/4 flex-[0.25] px-5 py-5">
          <span className="text-2xl text-purple-900 font-bold ">Tasks </span>
          {todos.map((item) => (
            <div className="relative  todo flex flex-col lg:flex-row gap-4 justify-between items-center my-3 p-3 bg-purple-100 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="left flex gap-3 pl-3 max-w-[60%] overflow-hidden">
                <div className="flex flex-wrap items-center gap-3 truncate">
                  <FaTasks />
                  <p className="truncate cursor-pointer">{item.todo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="calender flex-[0.75]"><Calender /></div>
      </div>
    </div>
  )
}

export default Scheduler
