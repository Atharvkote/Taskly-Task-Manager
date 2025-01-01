import React, { useRef, useState } from 'react';
import { useForm } from "react-hook-form";
import Navbar from '../Navbar';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import { FaRegUser, FaUnlockAlt } from "react-icons/fa";
import OAuths from './OAuths';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '../../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import Login from '../utils/Login';

const SignUp = () => {
  const [isLoginActive, setIsLoginActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { register: registerLogin, handleSubmit: handleSubmitLogin, formState: { errors: errorsLogin } } = useForm();
  const showSignUp = () => setIsLoginActive(false);
  const showLogIn = () => setIsLoginActive(true);
  const TogglePassword = () => { setShowPassword(!showPassword); };
  const passwordValue = watch("password");
  const dispatch = useDispatch();
  const [showPopUp, setshowPopUp] = useState(false);

  const onSubmit = async (data) => {
    if (isSubmitting) return; // Prevent multiple submissions
    setIsSubmitting(true);
    //console.log(data);
    try {
      toast.info('Initailizing Your Profile..', {
        position: "top-right",
        autoClose: 1000,
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
      let req = await fetch("http://localhost:3000/user/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json", },
          body: JSON.stringify(data),
        });

      let res = await req.json();
      // console.log(res);

      if (res.success) {
        toast.success('Account Created , Login to get started!', {
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
    } catch (error) {
      toast.error(`Account Initailization Failed! ${res.message}`, {
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
    } finally {
      setIsSubmitting(false); // Reset submission state
    }
  };

  const onSubmitLogin = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    // console.log(data);

    try {
      toast.info('Validating Credentials...', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        style: { backgroundColor: '#ddd6fe', color: '#000000' },
      });

      const req = await fetch("http://localhost:3000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const res = await req.json();
      // console.log(res);

      if (res.success) {
        const { username, email } = res.user;

        // Dispatch actions to update Redux state
        dispatch(login({ username, email }));

        toast.success('Login Successful!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          style: { backgroundColor: '#ddd6fe', color: '#000000' },
        });

        await new Promise((resolve) => setTimeout(resolve, 3000));
        setshowPopUp(true);
      } else {
        toast.error('Account Initialization Failed!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          style: { backgroundColor: '#ddd6fe', color: '#000000' },
        });
      }
    } catch (error) {
      console.error(error);
      toast.error('Internal Server Error: Account Initialization Failed!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        style: { backgroundColor: '#ddd6fe', color: '#000000' },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPasswordStrengthMessage = () => {
    if (!passwordValue) {
      return "";
    }
    if (passwordValue.length < 5) {
      return ": : Password must be at least 5 characters : :";
    }
    if (passwordValue.length > 10) {
      return ": : Password must be less than 10 characters : :";
    }
    if (!/[a-z]/.test(passwordValue)) {
      return ": : Password must contain at least one lowercase letter : :";
    }
    if (!/[A-Z]/.test(passwordValue)) {
      return ": : Password must contain at least one uppercase letter : :";
    }
    if (!/\W/.test(passwordValue)) {
      return ": : Password must contain at least one symbol : :";
    }
    return ": : Password is strong : :";
  };

  return (
    <>
      <Navbar />
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
        transition={"Bounce"}
      />
      {showPopUp && <Login />}
      <div className='flex flex-col lg:flex-row mt-5 justify-center '>
        <div className="my-10 bg-purple-900 lg:w-[50vw] lg:h-[70vh] mx-10 rounded-xl shadow-lg flex  flex-col gap-3">
          <div className="header flex justify-between overflow-hidden rounded-t-xl">
            <h1
              onClick={showSignUp}
              className={`flex-1 py-3 px-4 text-lg lg:text-xl font-bold text-center cursor-pointer transition-all duration-300 ${!isLoginActive
                ? 'bg-purple-900 text-white'
                : 'bg-violet-200 text-purple-900 hover:bg-violet-300'
                }`}
            >
              Sign Up
            </h1>
            <h1
              onClick={showLogIn}
              className={`flex-1 py-3 px-4 text-lg lg:text-xl font-bold text-center cursor-pointer transition-all duration-300 ${isLoginActive
                ? 'bg-purple-900 text-white'
                : 'bg-violet-200 text-purple-900 hover:bg-violet-300'
                }`}
            >
              Log In
            </h1>
          </div>

          {!isLoginActive && (
            <div className="w-full mx-auto flex flex-col items-center my-3">
              <form onSubmit={handleSubmit(onSubmit)} className="inputs flex flex-col w-3/4 text-white font-semibold gap-2">

                {/* Email input */}
                <div className="ip flex flex-col gap-2">
                  <label htmlFor="email" className=" text-sm lg:text-lg flex gap-3 items-center">
                    <MdOutlineMail className='w-5 h-5 lg:w-7 lg:h-7 transition-transform duration-300 hover:scale-105' /> Email
                  </label>
                  <input
                    id="email"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: '[Warning] : : Please enter a valid email address'
                      }
                    })}
                    className="outline-none w-full rounded-lg h-[40px] px-3 bg-violet-100 text-violet-700 focus:ring-2 focus:ring-violet-400 transition-all shadow-sm"
                    type="email"
                    placeholder="Enter your email"
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>

                {/* Username input */}
                <div className="ip flex flex-col gap-2">
                  <label htmlFor="username" className="text-sm lg:text-lg flex gap-3 items-center">
                    <FaRegUser className='w-4 h-4 lg:w-6 lg:h-6 transition-transform duration-300 hover:scale-105' /> Username
                  </label>
                  <input
                    id="username"
                    {...register('username', {
                      required: '[Warning]: : Username is required'
                    })}
                    className="text-violet-700 outline-none bg-violet-100 w-full rounded-lg h-[40px] px-3  focus:ring-2 focus:ring-violet-400 transition-all shadow-sm"
                    type="text"
                    placeholder="Choose a username"
                  />
                  {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                </div>

                {/* Password input */}
                <div className="password flex items-center justify-center gap-3 w-full">
                  <div className="ip flex flex-col gap-2 w-full">
                    <label htmlFor="password" className="text-sm lg:text-lg flex gap-3 items-center">
                      <FaUnlockAlt className='w-4 h-4 lg:w-6 lg:h-6 transition-transform duration-300 hover:scale-105' /> Password
                    </label>
                    <input
                      id="password"
                      {...register('password', {
                        required: '[Warning]: : Password is required',
                      })}
                      className="outline-none bg-violet-100 w-full rounded-lg h-[40px] px-3 text-violet-700 focus:ring-2 focus:ring-violet-400 transition-all shadow-sm"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                    />
                    {errors.password && !passwordValue && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    {passwordValue && <p className="text-green-400 text-sm">{getPasswordStrengthMessage()}</p>}
                  </div>
                  <div className='pt-7'>
                    {showPassword ? (
                      <FaRegEye onClick={TogglePassword} className='w-7 h-7 cursor-pointer' />
                    ) : (
                      <FaRegEyeSlash onClick={TogglePassword} className='w-7 h-7 cursor-pointer' />
                    )}
                  </div>
                </div>

                {/* Already have an account */}
                <div className="text-center mt-4 mb-0">
                  <span>
                    Already have an account?{' '}
                    <span onClick={() => showLogIn()} className="text-purple-300 underline cursor-pointer">
                      Log in here
                    </span>
                  </span>
                </div>

                {/* Submit button */}
                <button disabled={isSubmitting} type="submit" className="mb-6 mt-2 bg-violet-500 text-white py-2 rounded-lg font-bold text-lg hover:bg-violet-600 transition-all shadow-md">
                  {isSubmitting ? "Initializing Account..." : "Sign Up"}
                </button>
              </form>
            </div>
          )}

          {isLoginActive && (
            <div className="w-full mx-auto flex flex-col items-center my-10">
              <div className="inputs flex flex-col w-3/4 text-white font-semibold gap-3">
                <div className="ip flex flex-col gap-2 mb-5">
                  <label htmlFor="email-login" className="text-lg flex gap-3 items-center">
                    <MdOutlineMail className='w-7 h-7 transition-transform duration-300 hover:scale-105' /> Email
                  </label>
                  <input
                    id="email-login"
                    {...registerLogin("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Invalid email format"
                      }
                    })}
                    className="outline-none w-full rounded-lg h-[40px] px-3 bg-violet-100 text-violet-700 focus:ring-2 focus:ring-violet-400 transition-all shadow-sm"
                    type="email"
                    placeholder="Enter your email"
                  />
                  {errorsLogin.email && <p className="text-red-500 text-sm">{errorsLogin.email.message}</p>}
                </div>
                {/* Password Input for Login */}
                <div className="password flex items-center justify-center gap-3 w-full">
                  <div className="ip flex flex-col gap-2 w-full">
                    <label htmlFor="password-login" className="text-lg flex gap-3 items-center">
                      <FaUnlockAlt className='w-6 h-6 transition-transform duration-300 hover:scale-105' /> Password
                    </label>
                    <input
                      id="password-login"
                      {...registerLogin("password", {
                        required: "Password is required"
                      })}
                      className="outline-none bg-violet-100 w-full rounded-lg  h-[40px] px-3 text-violet-700 focus:ring-2 focus:ring-violet-400 transition-all shadow-sm"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                    />
                    {errorsLogin.password && <p className="text-red-500 text-sm">{errorsLogin.password.message}</p>}
                  </div>

                  <div className="pt-7">
                    {showPassword ? (
                      <FaRegEye onClick={TogglePassword} className='w-7 h-7 cursor-pointer' />
                    ) : (
                      <FaRegEyeSlash onClick={TogglePassword} className='w-7 h-7 cursor-pointer' />
                    )}
                  </div>

                </div>

                <div className="text-center text-sm  mt-3 mb-0">
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
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="mb-6 bg-violet-500 text-white py-2 rounded-lg font-bold text-lg hover:bg-violet-600 transition-all shadow-md"
                  onClick={handleSubmitLogin(onSubmitLogin)}
                >
                  {isSubmitting ? "Getting Started..." : "Login"}
                </button>
              </div>
            </div>
          )}


        </div>
        <OAuths setIsLoginActive = { setIsLoginActive } />
      </div>
    </>
  );
};

export default SignUp;