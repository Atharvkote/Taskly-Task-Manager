import React, { useEffect, useRef, useState } from 'react';
import NoTodos from "../assets/Default-Images-2.png";

const Default = () => {
  const Target = useRef();
  return (
      <div ref={Target}>
        <div className="flex justify-center items-center my-5 text-center">
          <span className="transition-transform duration-300 shadow-xl hover:shadow-2xl hover:scale-105 bg-purple-900 text-white text-2xl px-[10%] rounded-xl py-2 font-sans font-bold">
            No Todos To Display
          </span>
        </div>
        <div className="no-TodosImg flex justify-center items-center">
          <img src={NoTodos} alt="Default-Images-2" className='' height={500} width={500} />
        </div>
      </div>
  );
};

export default Default;