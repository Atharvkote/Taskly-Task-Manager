import React, { useState, useEffect, useRef } from 'react';
import Edit from "../assets/Edit.svg";
import Delete from "../assets/Delete.svg";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";
import { BiSolidHide } from "react-icons/bi";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrSchedule } from "react-icons/gr";

const TodoItem = ({ isProfile, item, handleEdit, handleDelete, handleCheck }) => {
  const btn = useRef(null);
  const checkbox = useRef(null);
  const [bookmarked, setbookmarked] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  useEffect(() => {
    if (btn.current) {
      btn.current.style.display = isProfile ? "none" : "";
      checkbox.current.style.display = isProfile ? "none" : "";
    }
  }, [isProfile]);
  
  return (

    <div className=''>
      <div className="relative  todo flex flex-col  gap-4 justify-between  my-3 p-3 bg-purple-100 rounded-xl shadow-xl hover-transform hover:shadow-2xl">
        <div className=" left flex gap-3 pl-3 max-w-[100%]  items-center overflow-hidden">
          <input
            ref={checkbox}
            key={item.id}
            type="checkbox"
            checked={item.isCompleted}
            onChange={() => handleCheck(item.id)}
            className="custom-checkbox "
          />
          <div  className={item.isCompleted ? "flex-[0.80] line-through opacity-70 " : "flex-[0.80] flex flex-wrap truncate"}>
            <p className=" cursor-pointer break-words whitespace-normal max-w-full">{item.todo}</p>
          </div>
          <div  className='absolute right-0 top-0 p-2 text-purple-900 text-lg cursor-pointer '>
          <GiHamburgerMenu onClick={()=>{setisOpen(!isOpen)}}/>
          </div>
          {isOpen &&(
            <div className="list z-10 absolute right-6 top-6  bg-purple-900 text-white text-lg cursor-pointer rounded-lg">
              <ul className='flex flex-col text-sm font-bold'>
                <li className='flex gap-3 items-center hover:rounded-md hover-transform hover:bg-purple-800 px-5 py-2' ><GrSchedule className='w-4 h-4' />Schedule</li>
                <li className='flex gap-3 items-center hover:rounded-md hover-transform  hover:bg-purple-800 px-5 py-2'><FaBookmark className='w-4 h-4'/>Bookmark</li>
                <li className='flex gap-3 items-center hover:rounded-md  hover-transform hover:bg-purple-800 px-5 py-2'><BiSolidHide className='w-5 h-5'/>Hide</li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex h-full gap-3 w-full  justify-center">
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
      <div className="time flex text-xs sm:text-sm gap-3 pl-3 ">
        <span className={isProfile ? "text-white" : "text-gray-600"}>{item.time}</span>
        <span className={isProfile ? "text-white" : "text-gray-600"}>{item.date}</span>
      </div>
    
    </div>
  );
};

export default TodoItem;