import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
const Prioritizer = ({setisStatusBarOpen,isStatusBarOpen,item}) => {
  const {username ,isLoggedIn} =useSelector((state)=>state.user);
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const toggleModal = () => {
    setIsOpen(!isOpen);
    reset(); // Reset form on close
  };
  const onSubmit = async (data) => {
    console.log("Form Submitted:", data);
    setisStatusBarOpen(!isStatusBarOpen); // Close modal on successful submission
    const id = item.id;
    const todo  = item.todo;
    const response = await fetch("http://localhost:3000/status/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        username,
        data,
        todo,
      }),
    });
  
    
  };
  
  return (
    <>
        <div
          id="crud-modal"
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50"
        >
          <div className="relative  w-full max-w-md max-h-full bg-violet-100 rounded-xl shadow ">
            {/* Modal Header */}
            <div className="flex items-center justify-between bg-purple-900 text-white p-4 rounded-tr-xl rounded-tl-xl">
              <h3 className="text-xl font-bold px-2  rounded-lg">  
                Update Task Status
              </h3>
              <button
                type="button"
                onClick={()=>{setisStatusBarOpen(
                  !isStatusBarOpen
                )}}
                className=" bg-transparent hover-transform  text-purple-100 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center  "
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 rounded-bl-xl">
              <div className="mb-4">
                <label
                  htmlFor="schedule"
                  className="block mb-2 text-sm  text-purple-900 font-bold "
                >
                  Scheduling (Start Date - Due Date)
                </label>
                <input
                  type="date"
                  {...register("startDate", { required: "Starting date is required" })}
                  className="bg-gray-50 border text-purple-900 rounded-lg w-full p-2.5 shadow-lg focus:hover-transform "
                  placeholder="Start Date"
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm">{errors.startDate.message}</p>
                )}

                <input
                  type="date"
                  {...register("dueDate", { required: "Due date is required" })}
                  className="bg-gray-50 border text-purple-900 rounded-lg w-full p-2.5 mt-2 shadow-lg "
                  placeholder="Due Date"
                />
                {errors.dueDate && (
                  <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="status"
                  className="block mb-2 text-sm  text-purple-900 font-bold "
                >
                  Status
                </label>
                <select
                  {...register("status", { required: "Status is required" })}
                  className="bg-gray-50 border text-purple-900 rounded-lg w-full p-2.5  shadow-lg "
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="Done">Done</option>
                  <option value="backlog">Backlog</option>
                </select>
                {errors.status && (
                  <p className="text-red-500 text-sm">{errors.status.message}</p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="priority"
                  className="block mb-2 text-sm  text-purple-900 font-bold "
                >
                  Priority
                </label>
                <select
                  {...register("priority", { required: "Priority is required" })}
                  className="bg-gray-50 border text-purple-900 rounded-lg w-full p-2.5 shadow-lg "
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                {errors.priority && (
                  <p className="text-red-500 text-sm">{errors.priority.message}</p>
                )}
              </div>
              <button
                type="submit"
                className="text-white bg-purple-900 hover-transform font-bold rounded-lg px-5 py-2.5 shadow-lg"
              >
               Update Status
              </button>
            </form>
          </div>
        </div>
    </>
  );
};

export default Prioritizer;
