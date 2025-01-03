import React, { useState, useEffect, useRef } from 'react';
import Edit from "../assets/Edit.svg";
import Delete from "../assets/Delete.svg";
import { FaBookmark,FaRegHourglassHalf,FaClockRotateLeft  } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrSchedule } from "react-icons/gr";
import { BsStars } from "react-icons/bs";
import { Link } from 'react-router-dom';
import { MdOutlineEditCalendar } from "react-icons/md";
import Prioritizer from './scheduler/Prioritizer';
import { useSelector } from 'react-redux';
import { FaStar ,FaExclamation} from "react-icons/fa";
import { SiTicktick } from "react-icons/si";
import { RiErrorWarningFill } from "react-icons/ri";
import { BiSolidBellRing } from "react-icons/bi";

const TodoItem = ({ isProfile, item, handleEdit, handleDelete, handleCheck }) => {
  const { username } = useSelector((state) => state.user);
  const btn = useRef(null);
  const checkbox = useRef(null);
  const [StatusAvailable, setStatusAvailable] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [isStatusBarOpen, setisStatusBarOpen] = useState(false);
  const [status, setStatus] = useState(null);

  // Utility function to format dates
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Function to fetch the status data
  const fetchStatus = async () => {
    try {
      const res = await fetch(`http://localhost:3000/status/fetchstatusOne?username=${username}&id=${item.id}`);
      const data = await res.json();
      // console.log(data); // Debugging the response
      if (data.success && data.status.length > 0) {
        setStatusAvailable(true);
        setStatus(data.status[0]); // Access the first element of the array
      } else {
        setStatusAvailable(false);
        console.error("No status data found");
      }
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  // Fetch status on component mount
  useEffect(() => {fetchStatus();}, []);
  useEffect(() => {fetchStatus();}, [isStatusBarOpen]);

  // Adjust styles based on the isProfile prop
  useEffect(() => {
    if (btn.current) {
      btn.current.style.display = isProfile ? "none" : "";
      checkbox.current.style.display = isProfile ? "none" : "";
    }
  }, [isProfile]);

  const utils = {
    pending: {
      color:"text-red-500",
      icon:<FaClockRotateLeft />,
      text:"Pending.." 
    },
    "in-progress":{
      color:"text-blue-500",
      icon:<FaStar />,
      text:"In Progress.."},
    Done: {
      color:"text-green-500",
      icon:<SiTicktick />,
      text:"Done!!"},
    backlog: {
      color:"text-gray-600",
      icon:<RiErrorWarningFill className='w-4 h-4' />,
      text:"Backlog."
    },
    low:{
      color:"text-lime-500",
      icon:<FaRegHourglassHalf className='w-4 h-4' />,
      text:"Optional Enhancements"
    },
    medium:{
      color:" text-amber-500",
      icon:<FaExclamation />,
      text:"Important , not urgent.."
    },
    high:{
      color:" text-orange-500",
      icon:<BiSolidBellRing className='w-4 h-4'/>,
      text:"Urgent!,Time Sensitive"
    },
  };

  return (
    <div>
      <div className="relative todo flex flex-col gap-4 justify-between my-3 p-3 bg-purple-100  rounded-xl shadow-xl hover-transform hover:shadow-2xl">
        <div className="left flex gap-3 pl-3 max-w-[100%] items-center overflow-hidden">
          <input
            ref={checkbox}
            key={item.id}
            type="checkbox"
            checked={item.isCompleted}
            onChange={() => handleCheck(item.id)}
            className="custom-checkbox"
          />
          <div className={item.isCompleted ? "flex-[0.80] line-through opacity-70" : "flex-[0.80] flex flex-wrap truncate"}>
            <p className="cursor-pointer break-words whitespace-normal max-w-full">{item.todo}</p>
          </div>
          <div className="absolute right-0 top-0 p-2 text-purple-900 text-lg cursor-pointer">
            <GiHamburgerMenu onClick={() => setisOpen(!isOpen)} />
          </div>
          {isOpen && (
            <div className="list z-10 absolute right-6 top-6 bg-purple-900 text-white text-lg cursor-pointer rounded-lg">
              <ul className="flex flex-col text-sm font-bold">
                <li
                  onClick={() => setisStatusBarOpen(!isStatusBarOpen)}
                  className="flex gap-3 items-center hover:rounded-md hover-transform hover:bg-purple-800 px-5 py-2"
                >
                  <BsStars className="w-4 h-4" />
                  Add Status
                </li>
                <Link to="/scheduler">
                  <li className="flex gap-3 items-center hover:rounded-md hover-transform hover:bg-purple-800 px-5 py-2">
                    <GrSchedule className="w-4 h-4" />
                    Schedule
                  </li>
                </Link>
                <li className="flex gap-3 items-center hover:rounded-md hover-transform hover:bg-purple-800 px-5 py-2">
                  <FaBookmark className="w-4 h-4" />
                  Bookmark
                </li>
              </ul>
            </div>
          )}
        </div>
        {StatusAvailable ? (
          <div className="status">
            <ul>
              <li className={`${utils[status.status].color} flex gap-2 items-center text-sm font-semibold`}>Status : {utils[status.status].icon} {utils[status.status].text || "N/A"}</li>
              <li className={`${utils[status.priority].color} flex gap-2 items-center text-sm font-semibold`}>Priority : {utils[status.priority].icon} {utils[status.priority].text || "N/A"}</li>
            </ul>
            <div className="schedule">
              <h4 className='text-[15px] font-semibold'>Schedule :</h4>
              <li className='text-sm'>Starting Date: {status?.starting_date ? formatDate(status.starting_date) : "N/A"}</li>
              <li className='text-sm'>Due Date: {status?.due_date ? formatDate(status.due_date) : "N/A"}</li>
            </div>
          </div>
        ) : (
          <span onClick={() => setisStatusBarOpen(!isStatusBarOpen)} className='px-5 font-bold border-2 border-dashed border-purple-900 text-purple-900 w-fit rounded-xl flex gap-2 items-center cursor-pointer ml-10 hover-transform hover:bg-purple-300 '>Schedule <MdOutlineEditCalendar className='w-5 h-5' /> </span>
        )}
        <div className="flex h-full gap-3 w-full justify-center">
          <button
            ref={btn}
            onClick={() => handleEdit(item.id)}
            className="bg-purple-900 flex justify-center gap-3 items-center py-2 w-1/2 rounded-xl font-sans font-bold text-white transition-transform text-sm duration-300 hover:scale-105"
          >
            <img
              src={Edit}
              className="w-7 h-7 filter hue-rotate-[68deg] brightness-125"
              alt="Edit"
            />
            Edit
          </button>
          <button
            onClick={() => handleDelete(item.id)}
            className="bg-purple-900 flex justify-center gap-3 items-center py-2 w-1/2 rounded-xl font-sans font-bold text-white transition-transform duration-300 hover:scale-105"
          >
            <img
              src={Delete}
              className="w-5 h-5 filter hue-rotate-[68deg] brightness-125"
              alt="Delete"
            />
            Delete
          </button>
        </div>
      </div>
      <div className="time flex text-xs sm:text-sm gap-3 pl-3">
        <span className={isProfile ? "text-white" : "text-gray-600"}>{item.time}</span>
        <span className={isProfile ? "text-white" : "text-gray-600"}>{item.date}</span>
      </div>
      {isStatusBarOpen && (
        <Prioritizer
          setisStatusBarOpen={setisStatusBarOpen}
          isStatusBarOpen={isStatusBarOpen}
          item={item}
        />
      )}
    </div>
  );
};

export default TodoItem;
