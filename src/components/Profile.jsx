import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { IoPersonCircle } from "react-icons/io5";
import TodoItem from './TodoItem';
import { handleEdit, handleDelete, handleCheck } from '../functions/TodoFunctions.js';
import Default from './utils/Default.jsx';
import Edit from "../assets/Edit.svg";
import { MdLogout } from "react-icons/md";
import { FaInfoCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogOut from './user/LogOut.jsx';

const Profile = () => {
  const { username, isLoggedIn, email } = useSelector((state) => state.user);
  const [Todos, setTodos] = useState([]);
  const [IsSetPP, setIsSetPP] = useState(false);
  const [Bio, setBio] = useState("Bio Yet to be Added...");
  const [name, setname] = useState("~ No Name ");
  const [ShowlogOut, setShowlogOut] = useState(false);

  const FetchUser = async (username) => {
    try {
      const req = await fetch(`http://localhost:3000/profile?username=${username}`, { method: "GET" });
      const res = await req.json();
      if (res.success) {
        setBio(res.user.bio);
        setname(res.user.name);
      } else {
        console.error(res.message);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

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
  useEffect(() => { FetchUser(username); FetchTodos(); }, []);
  useEffect(() => {
    if(!isLoggedIn){
      setBio("Bio Yet to be Added...");
      setname("~ No Name ");
      setTodos([]);
    }
  }, [username])
  
  return (
    <div>
      <Navbar />
      <div className="main max-w-[80vw] mx-auto my-5">
        <div className="up p-2 lg:p-10 bg-violet-200 rounded-lg ">
          <div className='flex items-center justify-between gap-2 mb-0'>

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
                <span className='text-sm lg:text-2xl font-bold font-sans'>
                  {name}
                </span>
                <span className='text-gray-700 text-sm lg:text-xl font-sans font-bold'> {isLoggedIn ? username : "No Username"}</span>
              </div>
            </div>
            <div className="btns flex justify-end items-end lg:items-center flex-col lg:flex-row gap-3">
              <Link to='/edit'>
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
              </Link>
              <button
                onClick={() => { setShowlogOut(!ShowlogOut); }}
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
          <h3 className='bg-purple-900 text-sm lg:text-lg py-1 px-3 lg:py-2 lg:px-5 text-white font-bold rounded-tr-lg rounded-tl-lg w-[40%] shadow-xl  lg:mt-5 mx-5'>About Me :</h3>
          <div className="bio flex rounded-br-lg rounded-bl-lg rounded-tr-lg flex-col gap-3  mx-5 bg-purple-900 p-5">
            <span className='bg-purple-100  text-gray-600 font-bold rounded-lg text-sm lg:text-lg shadow-lg w-[100%] h-[50px] px-3 py-2'>{Bio}</span>
          </div>
        </div>

        <div className="down bg-violet-200 my-5 rounded-lg p-5 h-1/2">
          <h2 className='bg-purple-900 py-2 px-5 text-white font-bold rounded-tr-lg rounded-tl-lg w-[40%] shadow-xl text-sm lg:text-xl'>Upcoming Tasks . . .</h2>
          <div className="Todos bg-purple-900 rounded-br-lg rounded-bl-lg rounded-tr-lg p-5 h-full">
            {Todos.length === 0 && <Default />}
            {Todos.map((item) => (
              <TodoItem
                isProfile={true}
                key={item.id}
                item={item}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                handleCheck={handleCheck}
              />
            ))}
          </div>
        </div>
      </div>
      {ShowlogOut && <LogOut onClose={() => setShowlogOut(false)} />}
    </div>
  );
};

export default Profile;
