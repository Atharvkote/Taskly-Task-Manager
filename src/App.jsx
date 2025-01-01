import React from 'react'
import { Link } from 'react-router-dom'
import BG from './assets/BG.png'
import Logo from './assets/App-Logo.png';
import { useSelector } from 'react-redux';
const App = () => {
 
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  
  return (
    <div>
      <div className="container absolute">
        <img className='bg-cover rotate-180 scale-x-[-1] -z-10 h-[100vh] w-[100vw]' src={BG} alt="" />
      </div>
      <div className="container relative ">
        <nav className='text-white flex justify-between px-5 py-7 mx-5 '>
          <div className="logo flex gap-5 items-center">
            <img
              src={Logo}
              className="w-16 h-16 filter hue-rotate-[68deg] brightness-[29.25]"
              alt="Task Manager Lite Logo"
            />
            <h1 className='font-russo text-[40px]'>Taskly AI</h1>
          </div>
          <ul className='flex justify-evenly items-center gap-10 '>
            <Link><li className='font-russo text-xl cursor-pointer'>About</li></Link>
            <Link  to={"/signup"}><li className={!isLoggedIn?'font-russo text-xl cursor-pointer':'hidden'}>Login</li></Link>
            <Link   to={"/signup"}><li className={!isLoggedIn?'font-russo text-xl cursor-pointer':'hidden'}>Signup</li></Link>
            <Link  to={"/home"}><li  className={isLoggedIn?'font-russo text-xl cursor-pointer':'hidden'}>Home</li></Link>
            <Link to={"/profile"}><li className={isLoggedIn?'font-russo text-xl cursor-pointer':'hidden'}>Profile</li></Link>
          </ul>
        </nav>
        <main>
          <div className="left flex justify-center items-center flex-col text-center  my-16">
            <h1 className='flex items-center font-russo text-white text-[55px] hover:glow'>Taskly <span className="bg-blue-100 text-blue-800 text-2xl font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-purple-500 dark:text-white ms-2">AI</span></h1>
            <h1 className='font-russo  text-[45px] text-transparent bg-clip-text bg-gradient-to-r to-pink-500 from-purple-500'>AI Powered Task Manager</h1>
            <p className='text-white font-russo text-lg w-[80%]'>Taskly your AI-powered companion for effortless task management, designed to help you stay organized, focused, and productive in the face of everyday challenges.</p>
          </div>
          <div className="btn flex justify-center flex-row">
            <Link to={'/signup'}><button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-xl group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
              <span className=" font-russo relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-xl group-hover:bg-opacity-0">
               Get Started
              </span>
            </button></Link>
            <Link to={'/login'}><button  className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-gray-900 rounded-xl group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
              <span className="font-russo  relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-xl group-hover:bg-opacity-0">
                Explore Taskly
              </span>
            </button></Link>

          </div>
        </main>
      </div>
    </div>
  )
}

export default App
