import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/App-Logo.png';
import { useSelector } from 'react-redux';

const Login = () => {
  const user = useSelector(state => state.user);
  return (
    <div className='fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center gap-5'>
      <div className="popup [background:radial-gradient(105%_100%_at_50%_10%,#000_5%,#581c87_100%)] flex flex-col items-center text-white w-[90%] lg:w-1/2 pt-5 rounded-xl z-10">
        <div className="branding flex items-center left-0 gap-3">
          <img
            src={Logo}
            className="w-7 h-7 filter hue-rotate-[68deg] brightness-[30]"
            alt="Task Manager Lite Logo"
          />
          <div className="prompt text-center">
            <h1 className='font-sans font-bold text-[20px]'>Taskly AI</h1>
          </div>
        </div>
        <h1 className='font-russo text-[22px] lg:text-[45px] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-100'>
          Welcome Back , {user.username}!
        </h1>
        <div className="content">
          <h3 className='font-sans font-bold'>You’re all set to conquer your tasks!</h3>
          <p className='font-sans font-bold'>Quick Highlights :</p>
          <ul className="space-y-1 text-left text-white py-1">
            <li className="flex font-sans font-bold items-center space-x-3 rtl:space-x-reverse pl-2 lg:pl-10">
              <svg className="flex-shrink-0 w-3.5 h-3.5 text-white dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
              </svg>
              <span>Review your pending tasks.</span>
            </li>
            <li className="flex font-sans font-bold items-center space-x-3 rtl:space-x-reverse pl-2 lg:pl-10">
              <svg className="flex-shrink-0 w-3.5 h-3.5 text-white dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
              </svg>
              <span>Check deadlines and priorities.</span>
            </li>
            <li className="flex font-sans font-bold items-center space-x-3 rtl:space-x-reverse pl-2 lg:pl-10">
              <svg className="flex-shrink-0 w-3.5 h-3.5 text-white dark:text-green-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5" />
              </svg>
              <span>Organize your day effortlessly.</span>
            </li>
          </ul>
        </div>
        <div className="btn my-5">
          <Link to={'/home'}> 
            <button className="btn transition-transform text-sm duration-300 hover:scale-105 w-full btn-primary bg-purple-200 py-2 px-10 texl-lg text-black font-sans font-bold rounded-lg">
              Get Started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
