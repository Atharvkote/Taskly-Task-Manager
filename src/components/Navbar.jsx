import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/App-Logo.png';
import { IoPersonCircle } from "react-icons/io5";

const Navbar = () => {
  return (
    <nav className="flex flex-col justify-between bg-purple-900 text-white py-5 px-10 sm:flex-row sm:items-center">
      <div className="logo flex  items-center justify-center flex-row gap-3 text-center">
        <img
          src={Logo}
          className="w-10 h-10 filter hue-rotate-[68deg] brightness-125"
          alt="Task Manager Lite Logo"
        />
        <span className="sm:text-3xl text-xl font-bold">Task Manager Lite</span>
      </div>

      <div className="navs mt-5 sm:mt-0 text-center flex flex-row  justify-between  items-center gap-5">
        <ul className="flex items-center text-lg font-bold justify-around gap-5 flex-row sm:gap-10">
          <li className="list-none cursor-pointer transition-transform duration-100 hover:scale-105">
            <Link to="/">Home</Link>
          </li>
          <li className="list-none cursor-pointer transition-transform duration-100 hover:scale-105">
            <Link to="/tasks">Scheduler</Link>
          </li>
        </ul>

        <div className="profile cursor-pointer">
          <Link to="/profile"><IoPersonCircle className='w-14 h-14' /></Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;