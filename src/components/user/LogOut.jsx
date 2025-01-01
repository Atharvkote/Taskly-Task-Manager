import React from 'react';
import { logout } from '../../redux/user/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import { googleLogout } from '@react-oauth/google';

const LogOut = ({ onClose }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogout = async() => { 
    dispatch(logout());
    onClose();
    window.location.href = "/";
  };
  const OAuthLogOut = async () => { googleLogout(); dispatch(logout()); }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="relative p-4 w-full max-w-md">
        <div className="relative  rounded-lg shadow bg-purple-900">
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 end-2.5 text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7L1 13"
              />
            </svg>
          </button>
          <div className="p-6 text-center">
            <h3 className="mb-4 text-lg font-medium text-gray-700 dark:text-gray-200">
              Are you sure you want to log out?
            </h3>
            <button
              onClick={handleLogout}
              className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg px-5 py-2.5 mr-2"
            >
              Yes, Log Out
            </button>
            <button
              onClick={onClose}
              className="text-gray-900 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg px-5 py-2.5"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOut;
