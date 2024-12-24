import React, { useState, useEffect,useRef } from 'react';
import Edit from "../assets/Edit.svg";
import Delete from "../assets/Delete.svg";
import Popup from './Popup';

const TodoItem = ({isProfile, item, handleEdit, handleDelete, handleCheck }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const btn = useRef(null);

  useEffect(() => {
    if (btn.current) {
      btn.current.style.display = isProfile ? "none" : "";
    }
  }, [isProfile]);
  
  

  const handleClick = () => {
    setPopupOpen(!popupOpen);
  };

  useEffect(() => {
    if (popupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [popupOpen]);

  return (

    <>
      <div className="relative todo flex flex-col lg:flex-row gap-4 justify-between items-center my-3 p-3 bg-purple-100 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <div className="left flex gap-3 pl-3 max-w-[60%] overflow-hidden">
          <input
            type="checkbox"
            checked={item.isCompleted}
            onChange={() => handleCheck(item.Id)}
            className="custom-checkbox"
          />
          <div onClick={handleClick} className={item.isCompleted ? "line-through opacity-70 truncate" : "flex flex-wrap truncate"}>
            <p  className="truncate cursor-pointer">{item.todo}</p>
          </div>
        </div>
        <div className="flex h-full gap-3 w-full lg:w-1/3 justify-center">
          <button
          ref={btn} 
            onClick={() => handleEdit(item.Id)}
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
            onClick={() => handleDelete(item.Id)}
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
          <span className={isProfile?"text-white":"text-gray-600"}>{item.time}</span>
          <span className={isProfile?"text-white":"text-gray-600"}>{item.date}</span>
        </div>
      {popupOpen && (
        <Popup
          item={item}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          onClose={handleClick}
        />
      )}
    </>
  );
};

export default TodoItem;