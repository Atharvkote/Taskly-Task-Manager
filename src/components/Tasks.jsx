import React from 'react'
import { useState, useEffect } from "react";
import Navbar from './Navbar'

const Tasks = () => {
    const [todo, setTodo] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);


    return (
        <div>
          <Navbar/>
        </div>
    )
}

export default Tasks
