import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../Navbar";
import Calender from "./Calender";
import { FaTasks } from "react-icons/fa";

const Scheduler = () => {
  const { username, isLoggedIn } = useSelector((state) => state.user);
  const [statusAvailable, setStatusAvailable] = useState(false);
  const [status, setStatus] = useState([]);

  const fetchStatus = async () => {
    if (!username) {
      console.error("Username is required to fetch status.");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/status/fetchstatus?username=${username}`
      );
      const data = await res.json();
      console.log(data); // Debugging the response
      if (data.success && data.status.length > 0) {
        setStatusAvailable(true);
        setStatus(data.status); // Updated to handle an array of tasks
      } else {
        setStatusAvailable(false);
        console.warn("No status data found");
      }
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  // Fetch status on component mount
  useEffect(() => {
    fetchStatus();
  }, [username]);

  return (
    <div>
      <Navbar />
      <div className="container flex flex-row justify-around gap-5 w-full h-full">
        <div className="sidebar my-5 rounded-tr-md rounded-br-md h-[100vh] bg-violet-200 w-1/4 flex-[0.25] px-5 py-5">
          <span className="text-2xl text-purple-900 font-bold">Tasks</span>
          {statusAvailable ? (
            status.map((item, index) => (
              <div
                key={item.id || index} // Use a unique identifier, or fallback to index
                className="relative todo flex flex-col lg:flex-row gap-4 justify-between items-center my-3 p-3 bg-purple-100 rounded-xl shadow-xl transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <div className="left flex gap-3 pl-3 max-w-[60%] overflow-hidden">
                  <div className="flex flex-wrap items-center gap-3 truncate">
                    <FaTasks />
                    <p className="truncate cursor-pointer">{item.todo}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-purple-600 mt-4">No tasks available.</p>
          )}
        </div>

        <div className="calender flex-[0.75]">
          <Calender status={status} />
        </div>
      </div>
    </div>
  );
};

export default Scheduler;
