import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/App-Logo.png';
import { IoPersonCircle } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const { isLoggedIn } = useSelector((state) => state.user);
  useEffect(() => {
    if (!isLoggedIn) {
      toast.error('Please Login Or SignUp To Continue..', {
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
    }
  }, []);


return (


  <nav className="flex flex-col justify-between bg-purple-900 text-white py-5 px-10 sm:flex-row sm:items-center">
    <div className="logo flex  items-center justify-center flex-row gap-3 text-center">
      <img
        src={Logo}
        className="w-10 h-10 filter hue-rotate-[68deg] brightness-[29]"
        alt="Task Manager Lite Logo"
      />
      <span className="sm:text-3xl text-xl font-bold">Taskly AI</span>
    </div>
    {isLoggedIn && (
      <div className="navs mt-5 sm:mt-0 text-center flex flex-row  justify-between  items-center gap-5">
        <ul className="flex items-center text-lg font-bold justify-around gap-5 flex-row sm:gap-10">

          <li className="list-none cursor-pointer transition-transform duration-100 hover:scale-105">
            <Link to="/home"><span>Home</span></Link>
          </li>
          <li className="list-none cursor-pointer transition-transform duration-100 hover:scale-105">
            <Link to="/scheduler">Scheduler</Link>
          </li>
        </ul>
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
        <div className="profile cursor-pointer">
          <Link to="/profile"><IoPersonCircle className='w-14 h-14' /></Link>
        </div>
      </div>
    )}

  </nav>
);
};

export default Navbar;