import React, { useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import Login from '../utils/Login';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/user/userSlice';
import { googleLogout } from '@react-oauth/google';


const OAuths = ({ setIsLoginActive }) => {
  const dispatch = useDispatch();
  const [showPopUp, setShowPopUp] = useState(false);

  const OAuthLogin = async (user_data) => {
    let request = await fetch("http://localhost:3000/oauth/jwt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user_data),
    });
    let token = await request.json();
    if (token.success) {
      dispatch(login({ username: token.username, email: token.email }));
      setShowPopUp(true);
    }
  };
  
  const OAuthLogOut = async () => {googleLogout();}

  return (
    <div>
      {showPopUp && <Login />}
      <section className="text-gray-600 body-font flex-[0.5]">
        <div className="container px-5 py-7 mx-auto flex flex-wrap">
          <div className="flex flex-wrap flex-col -m-4">
            {/* Google Login */}
            <div className="p-4 lg:w-1/2 md:w-full">
              <div className="flex lg:w-[25vw] rounded-lg bg-violet-200 border-opacity-50 p-8 sm:flex-row flex-col">
                <div className="w-10 h-10 lg:w-16 lg:h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 flex-shrink-0 transition-transform duration-300 hover:scale-105">
                  <FcGoogle className='w-6 h-6 lg:w-10 lg:h-10' />
                </div>
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-lg title-font mb-3 font-bold">Login Google</h2>
                  <p>Ensure you are using the correct Google account credentials and follow the prompts to grant necessary permissions for access to your profile and data securely.</p>
                  <div className="btn mt-1">
                    {setIsLoginActive && (
                      <GoogleLogin
                        onSuccess={credentialResponse => {
                          const token = jwtDecode(credentialResponse?.credential);
                          OAuthLogin(token);
                        }}
                        onError={() => {
                          console.log('Login Failed');
                        }}
                      />
                    )}
                    {!setIsLoginActive && (
                      <GoogleLogin
                        onSuccess={credentialResponse => {
                          console.log(credentialResponse);
                        }}
                        onError={() => {
                          console.log('Login Failed');
                        }}
                        useOneTap
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* GitHub Login */}
            <div className="p-4 lg:w-1/2 md:w-full">
              <div className="flex lg:w-[25vw] rounded-lg bg-violet-200 p-8 sm:flex-row flex-col">
                <div className="w-16 h-16 sm:mr-8 sm:mb-0 mb-4 inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-500 flex-shrink-0 transition-transform duration-300 hover:scale-105">
                  <FaGithub className='w-10 h-10' />
                </div>
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-lg title-font font-bold mb-3">Sign In with Github</h2>
                  <p>Authorize with Github!</p>
                  <a className="mt-3 text-purple-500 inline-flex items-center cursor-pointer hover:text-purple-500 transition-transform duration-300 hover:scale-105">
                    Get Started
                    <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
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
  );
};

export default OAuths;
