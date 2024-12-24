import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import { IoPersonCircle } from "react-icons/io5";
import TodoItem from './TodoItem';
import { handleEdit, handleDelete, handleCheck } from '../functions/TodoFunctions.js';
import Default from './Default';
import Edit from "../assets/Edit.svg";
import { MdLogout } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Profile = () => {
  const [Todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  const [IsSetPP, setIsSetPP] = useState(false);
  return (
    <div>
      <Navbar />
      <div className="main max-w-[80vw] mx-auto my-5">
        <div className="up p-2 lg:p-10 bg-violet-200 rounded-lg ">
          <div className='flex items-center justify-between gap-5'>

            <div className="one flex items-center">

              {IsSetPP ? (
                <img
                  src={profilePictureUrl} // Replace with actual profile picture source
                  alt="User's Profile Picture"
                  className="profile-picture "
                />
              ) : (
                <IoPersonCircle className="w-[70px] h-[70px] lg:w-[100px] lg:h-[100px] filter text-purple-900" />
              )}

              <div className='flex flex-col gap-1'>
                <span className='text-sm lg:text-2xl font-bold font-sans'>Atharva Kote</span>
                <span className='text-gray-700 text-sm lg:text-xl font-sans font-bold'>({"atharvakote"})</span>
              </div>
            </div>
            <div className="btns flex justify-end items-end lg:items-center flex-col lg:flex-row gap-3">
              <button
                className="bg-purple-900 flex justify-center  gap-3 items-center px-2 py-1 lg:px-4 lg:py-2 rounded-xl font-sans font-bold text-white transition-transform text-sm duration-300 hover:scale-105"
              >
                <img
                  src={Edit}
                  className="w-5 h-5 lg:w-7 lg:h-7 filter hue-rotate-[68deg] brightness-125"
                  alt="Edit"
                />
                Edit
              </button>
              <button
                className="bg-purple-900 flex justify-center  items-center px-2 py-2 lg:px-4 lg:py-2 rounded-xl font-sans font-bold text-white transition-transform text-xs lg:text-sm duration-300 hover:scale-105"
              >
                <MdLogout className='w-4 h-4 lg:w-7 lg:h-7 ' />
                Log Out
              </button>
              <Link to='/about'>
                <button
                  className="bg-purple-900 flex justify-center gap-1 items-center px-2 py-2 lg:px-2 lg:py-2 rounded-full font-sans font-bold text-white transition-transform text-sm duration-300 hover:scale-105"
                >
                  <FaInfoCircle className='w-4 h-4 lg:w-7 lg:h-7 ' />
                </button>
              </Link>
            </div>

          </div>
          <h3 className='bg-purple-900 py-2 px-5 text-white font-bold rounded-tr-lg rounded-tl-lg w-[40%] shadow-xl  mt-5 mx-5'>About Me :</h3>
          <div className="bio flex rounded-br-lg rounded-bl-lg rounded-tr-lg flex-col gap-3  mx-5 bg-purple-900 p-5">
            <span className='bg-purple-100  text-gray-600 font-bold rounded-lg shadow-lg w-[100%] h-[50px] px-3 py-2'>{"Something Funny....."}</span>
          </div>
        </div>

        <div className="down bg-violet-200 my-5 rounded-lg p-5 h-1/2">
          <h2 className='bg-purple-900 py-2 px-5 text-white font-bold rounded-tr-lg rounded-tl-lg w-[40%] shadow-xl text-sm lg:text-xl'>Upcoming Tasks . . .</h2>
          <div className="Todos bg-purple-900 rounded-br-lg rounded-bl-lg rounded-tr-lg p-5 h-full">
            {Todos.length === 0 && <Default />}
            {Todos
              .map((item) => (
                <TodoItem
                  isProfile={true}
                  key={item.Id}
                  item={item}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  handleCheck={handleCheck}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
