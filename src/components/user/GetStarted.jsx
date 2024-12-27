import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import Navbar from '../Navbar';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaRegUser, FaUnlockAlt, FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const password = useRef(null);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
  const showSignUp = () => setIsLoginActive(false);
  const showLogIn = () => setIsLoginActive(true);

  const TogglePassword = () => {
    setShowPassword(!showPassword);
    // if (showPassword) {
    //   password.current.type = "text";
    // } else {
    //   password.current.type = "password";
    // }
  };

  const passwordValue = watch("password");

  const getPasswordStrengthMessage = () => {
    if (!passwordValue) {
      return "";
    }
    if (passwordValue.length < 5) {
      return "Password must be at least 5 characters";
    }
    if (passwordValue.length > 10) {
      return "Password must be less than 10 characters";
    }
    if (!/[a-z]/.test(passwordValue)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/[A-Z]/.test(passwordValue)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/\W/.test(passwordValue)) {
      return "Password must contain at least one symbol";
    }
    return "Password is strong";
  };

  return (
    <>
      <Navbar />

      <div className='flex flex-col lg:flex-row mt-5 justify-center '>
        <div className="my-10 bg-purple-900 lg:w-[50vw] lg:h-[70vh] mx-10 rounded-xl shadow-lg flex  flex-col gap-3">
          <div className="header flex justify-between overflow-hidden rounded-t-xl">
            <h1
              onClick={showSignUp}
              className={`flex-1 py-3 px-4 text-xl font-bold text-center cursor-pointer transition-all duration-300 ${!isLoginActive
                ? 'bg-purple-900 text-white'
                : 'bg-violet-200 text-purple-900 hover:bg-violet-300'
                }`}
            >
              Sign Up
            </h1>
            <h1
              onClick={showLogIn}
              className={`flex-1 py-3 px-4 text-xl font-bold text-center cursor-pointer transition-all duration-300 ${isLoginActive
                ? 'bg-purple-900 text-white'
                : 'bg-violet-200 text-purple-900 hover:bg-violet-300'
                }`}
            >
              Log In
            </h1>
          </div>

          {!isLoginActive && (
            <div className="w-full mx-auto flex flex-col items-center my-3">
              <div className="inputs flex flex-col w-3/4 text-white font-semibold gap-2">
                <div className="ip flex flex-col gap-2">
                  <label htmlFor="email" className="text-lg flex gap-3 items-center">
                    <MdOutlineMail className='w-7 h-7  transition-transform duration-300 hover:scale-105' /> Email
                  </label>
                  <input
                    id="email"
                    className="outline-none w-full rounded-lg h-[40px] px-3 bg-violet-100 text-gray-900 focus:ring-2 focus:ring-violet-400 transition-all shadow-sm"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="ip flex flex-col gap-2">
                  <label htmlFor="username" className="text-lg  flex gap-3 items-center">
                    <FaRegUser className='w-6 h-6  transition-transform duration-300 hover:scale-105' /> Username
                  </label>
                  <input
                    id="username"
                    className="outline-none bg-violet-100 w-full rounded-lg h-[40px] px-3 text-gray-900 focus:ring-2 focus:ring-violet-400 transition-all shadow-sm"
                    type="text"
                    placeholder="Choose a username"
                  />
                </div>
                <div className="password flex items-center justify-center gap-3 w-full">
                  <div className="ip flex flex-col gap-2 w-full">
                    <label htmlFor="password" className="text-lg flex gap-3 items-center">
                      <FaUnlockAlt className='w-6 h-6  transition-transform duration-300 hover:scale-105' /> Password
                    </label>
                    <input
                      ref={password}
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 5,
                          message: "Password must be at least 5 characters"
                        },
                        maxLength: {
                          value: 10,
                          message: "Password must be less than 10 characters"
                        },
                        pattern: {
                          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).*$/,
                          message: "Password must contain at least one lowercase letter, one uppercase letter, and one symbol"
                        }
                      })}
                      className="outline-none bg-violet-100 w-full rounded-lg h-[40px] px-3 text-gray-900 focus:ring-2 focus:ring-violet-400 transition-all shadow-sm"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                    />

                    {!errors.password && passwordValue && <p className="text-white text-sm">{getPasswordStrengthMessage()}</p>}
                  </div>
                  <div className='pt-7'>
                    {showPassword ? (
                      <FaRegEye onClick={TogglePassword} className='w-7 h-7 cursor-pointer' />
                    ) : (
                      <FaRegEyeSlash onClick={TogglePassword} className='w-7 h-7 cursor-pointer' />
                    )}
                  </div>
                </div>
                <div className="text-center mt-4 mb-0">
                  <span>
                    Already have an account?{' '}
                    <span
                      onClick={showLogIn}
                      className="text-purple-300 underline cursor-pointer"
                    >
                      Log in here
                    </span>
                  </span>
                </div>
                <button className="mb-6 mt-2 bg-violet-500 text-white py-2 rounded-lg font-bold text-lg hover:bg-violet-600 transition-all shadow-md">
                  Sign Up
                </button>
              </div>
            </div>
          )}

          {isLoginActive && (
            <div className="w-full mx-auto flex flex-col items-center my-11">
              <div className="inputs flex flex-col w-3/4 text-white font-semibold gap-3">
                <div className="ip flex flex-col gap-2">
                  <label htmlFor="email" className="text-lg flex gap-3 items-center">
                    <MdOutlineMail className='w-7 h-7  transition-transform duration-300 hover:scale-105' /> Email
                  </label>
                  <input
                    id="email-login"
                    className="outline-none w-full rounded-lg h-[40px] px-3 bg-violet-100 text-gray-900 focus:ring-2 focus:ring-violet-400 transition-all shadow-sm"
                    type="email"
                    placeholder="Enter your email"
                  />
                </div>
                <div className="password flex items-center justify-center gap-3 w-full">
                  <div className="ip flex flex-col gap-2 w-full">
                    <label htmlFor="password" className="text-lg flex gap-3 items-center">
                      <FaUnlockAlt className='w-6 h-6  transition-transform duration-300 hover:scale-105' /> Password
                    </label>
                    <input
                      ref={password}
                      id="password"
                      className="outline-none bg-violet-100 w-full rounded-lg h-[40px] px-3 text-gray-900 focus:ring-2 focus:ring-violet-400 transition-all shadow-sm"
                      type="password"
                      placeholder="Create a password"
                    />
                  </div>
                  <div className='pt-7'>
                    {showPassword ? (
                      <FaRegEye onClick={TogglePassword} className='w-7 h-7 cursor-pointer' />
                    ) : (
                      <FaRegEyeSlash onClick={TogglePassword} className='w-7 h-7 cursor-pointer' />
                    )}
                  </div>
                </div>
                <div className="text-center mt-10 mb-0">
                  <span>
                    Don't have an account?{' '}
                    <span
                      onClick={showSignUp}
                      className="text-purple-300 underline cursor-pointer"
                    >
                      Create New Account
                    </span>
                  </span>
                </div>
                <button className="mb-6 mt-2 bg-violet-500 text-white py-2 rounded-lg font-bold text-lg hover:bg-violet-600 transition-all shadow-md">
                  Log In
                </button>
              </div>
            </div>
          )}

        </div>
        <section className="text-gray-600 body-font flex-[0.5]">
          <div className="container px-5 py-7  mx-auto flex flex-wrap">
            <div className="flex flex-wrap flex-col -m-4">
              <div className="p-4 lg:w-1/2 md:w-full">
                <div className="flex  lg:w-[25vw] rounded-lg bg-violet-200 border-opacity-50 p-8 sm:flex-row flex-col">
                  <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 flex-shrink-0 transition-transform duration-300 hover:scale-105">
                    <FcGoogle className='w-10 h-10' />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-gray-900 text-lg  title-font  mb-3 font-bold">Login Google</h2>
                    <p>Ensure you are using the correct Google account credentials and follow the prompts to grant necessary permissions for access to your profile and data securely.</p>
                    <a className="mt-3 text-purple-500 inline-flex items-center cursor-pointer transition-transform duration-300 hover:scale-105">Get Started
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-4 lg:w-1/2  md:w-full">
                <div className="flex lg:w-[25vw] rounded-lg bg-violet-200  p-8 sm:flex-row flex-col">
                  <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 flex-shrink-0 transition-transform duration-300 hover:scale-105">
                    <FaGithub className='w-10 h-10' />
                  </div>
                  <div className="flex-grow">
                    <h2 className="text-gray-900 text-lg title-font font-bold mb-3">Sign In with Github</h2>
                    <p>Authorize with Github!</p>
                    <a className="mt-3 text-purple-500 inline-flex items-center cursor-pointer hover:text-purple-500 transition-transform duration-300 hover:scale-105">Get Started
                      <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SignUp;