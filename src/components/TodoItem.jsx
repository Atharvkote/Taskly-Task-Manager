import React from 'react'
import Edit from "../assets/Edit.svg";
import Delete from "../assets/Delete.svg";
    
const TodoItem = ({ item, handleEdit, handleDelete, handleCheck }) => {
      return (
        <div className="todo flex flex-col lg:flex-row gap-4 justify-between items-center my-3 p-3 bg-purple-100 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <div className="left flex gap-3 pl-3 max-w-[60%] overflow-x-auto">
            <input
              type="checkbox"
              checked={item.isCompleted}
              onChange={() => handleCheck(item.Id)}
              className="custom-checkbox"
            />
            <div className={item.isCompleted ? "line-through opacity-70" : "flex flex-wrap"}>
              {item.todo}
            </div>
          </div>
          <div className="btn flex h-full gap-3 w-full lg:w-1/3 justify-center">
            <button
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
      );
    }

export default TodoItem
