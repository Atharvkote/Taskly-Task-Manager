import React, { useState, useEffect, useRef } from 'react';
import Edit from "../assets/Edit.svg";
import Delete from "../assets/Delete.svg";
import Popup from './Popup';

const TodoItem = ({ isProfile, item, handleEdit, handleDelete, handleCheck }) => {
  const [popupOpen, setPopupOpen] = useState(false);
  const btn = useRef(null);
  const checkbox = useRef(null);

  // Adjust button and checkbox display based on isProfile
  useEffect(() => {
    if (btn.current) {
      btn.current.style.display = isProfile ? "none" : "";
      checkbox.current.style.display = isProfile ? "none" : "";
    }
  }, [isProfile]);

  // Toggle popup open/close state
  const handleClick = () => {
    setPopupOpen(!popupOpen);
  };

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (popupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [popupOpen]);

  return (
    <div className="todo-item flex flex-col gap-2 p-3 bg-purple-100 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Task content */}
      <div className="flex justify-between items-start">
        <div className="left flex gap-3">
          {/* Checkbox */}
          <input
            ref={checkbox}
            key={item.id}
            type="checkbox"
            checked={item.isCompleted}
            onChange={() => handleCheck(item.id)}
            className="custom-checkbox"
          />
          {/* Task text */}
          <p
            onClick={handleClick}
            className={`cursor-pointer ${
              item.isCompleted ? "line-through opacity-70 truncate" : "truncate"
            }`}
          >
            {item.todo}
          </p>
        </div>

        {/* Edit and Delete buttons */}
        {!isProfile && (
          <div className="actions flex gap-2">
            <button
              ref={btn}
              onClick={() => handleEdit(item.id)}
              className="btn bg-purple-900 text-white p-2 rounded-md transition-transform duration-300 hover:scale-105"
            >
              <img src={Edit} alt="Edit" className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleDelete(item.id)}
              className="btn bg-purple-900 text-white p-2 rounded-md transition-transform duration-300 hover:scale-105"
            >
              <img src={Delete} alt="Delete" className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Task time and date */}
      <div className="time text-xs text-gray-600 flex justify-between">
        <span>{item.time}</span>
        <span>{item.date}</span>
      </div>

      {/* Popup for detailed task view */}
      {popupOpen && (
        <Popup
          item={item}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          onClose={handleClick}
        />
      )}
    </div>
  );
};

export default TodoItem;
