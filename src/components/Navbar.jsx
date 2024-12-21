import React from "react";
import Logo from "../assets/App-Logo.png";

const Navbar = () => {
  return (
    <nav className="flex flex-col justify-between bg-purple-700 text-white py-5 px-10 sm:flex-row sm:items-center">
      <div className="logo flex flex-col items-center sm:flex-row  gap-3 text-center">
        <img
          src={Logo}
          className="w-10 h-10 filter hue-rotate-[68deg] brightness-125"
          alt="Task Manager Lite Logo"
        />
        <span className="sm:text-3xl text-xl font-bold">Task Manager Lite</span>
      </div>

      <div className="navs mt-5 sm:mt-0 text-center">
        <ul className="flex flex-col gap-3 text-lg font-bold sm:flex-row sm:gap-5">
          <li className="list-none cursor-pointer transition-transform duration-100 hover:scale-105">
            Home
          </li>
          <li className="list-none cursor-pointer transition-transform  duration-100 hover:scale-105">
            Your Tasks
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
