import React from 'react';
import Edit from "../assets/Edit.svg";
import Delete from "../assets/Delete.svg";

const Popup = ({ item, handleEdit, handleDelete, onClose }) => {
  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>

      {/* Popup */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="bg-purple-200 p-6 rounded-lg shadow-lg w-[90%] max-w-lg">
          <p className="text-xl font-bold text-purple-900 mb-4 truncate">{item.todo}</p>

          {/* Buttons */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => handleEdit(item.Id)}
              className="bg-purple-900 flex items-center gap-2 px-4 py-2 text-white rounded-md font-bold hover:scale-105 transition-transform"
            >
              <img
                src={Edit}
                className="w-5 h-5 filter hue-rotate-[68deg] brightness-125"
                alt="Edit"
              />
              Edit
            </button>
            <button
              onClick={() => handleDelete(item.Id)}
              className="bg-red-600 flex items-center gap-2 px-4 py-2 text-white rounded-md font-bold hover:scale-105 transition-transform"
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
      </div>
    </>
  );
};

export default Popup;