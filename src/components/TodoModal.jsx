import React from 'react'

const TodoModal = ({ currentTodo, setCurrentTodo, handleSave, setIsModalOpen }) => {
        const handleModalChange = (e) => {
          setCurrentTodo((prevTodo) => ({ ...prevTodo, todo: e.target.value }));
        };

        return(
          <div className="modal fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
            <div className="bg-purple-200 xl:w-[35vw] xl:h-[35vh] p-5 rounded-lg shadow-lg">
              <div className="text w-full h-full lg:flex lg:flex-col lg:items-center lg:justify-center">
                <h2 className="text-xl xl:text-3xl font-bold mb-4">Edit Your Todo</h2>
                <input
                  type="text"
                  value={currentTodo?.todo || ""}
                  onChange={handleModalChange}
                  className="xl:w-3/4 w-full p-2 border border-gray-300 rounded-md outline-none"
                />
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => {
                      setIsModalOpen(false);
                      setCurrentTodo(null);
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="bg-purple-900 text-white px-4 py-2 rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
     }

export default TodoModal
