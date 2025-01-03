export const FetchTodos = async () => {
  try {
    const response = await fetch(`http://localhost:3000?username=${username}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const fetchedTodos = await response.json();
    setTodos(fetchedTodos);

    // Log the fetched todos here instead of after the state update
    console.log(fetchedTodos);

    // Optionally, store todos in local storage
    // localStorage.setItem("todos", JSON.stringify(fetchedTodos));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

export const toggleShow = () => {
  setIsFinished(!isFinished);
};

export const handleChange = (e) => setTodo(e.target.value);

export const handleAdd = async () => {
  const newTodo = {
    Id: uuIdv4(), // Ensure consistent capitalization with backend
    todo,
    date: new Date().toDateString(),
    time: new Date().toLocaleTimeString(),
    isCompleted: false,
  };

  try {
    // Save to backend
    const response = await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        Id: newTodo.Id,
        username: username,
        todo: newTodo.todo,
        date: newTodo.date,
        time: newTodo.time,
        isCompleted: newTodo.isCompleted,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    toast.success("Todo Added Successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      style: {
        backgroundColor: "#ddd6fe", // Custom background color
        color: "#000000",
      },
    });

    // Fetch updated todos
    FetchTodos();

    // Clear input
    setTodo("");
  } catch (error) {
    console.error("Failed to add todo:", error);
  }
};

export const handleEdit = (Id) => {
  const todoToEdit = todos.find((todo) => todo.id === Id);
  if (todoToEdit) {
    setCurrentTodo({ ...todoToEdit });
    setIsModalOpen(true);
  }
};

export const handleSave = async () => {
  try {
    const response = await fetch("http://localhost:3000/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        Id: currentTodo.id,
        newTodo: currentTodo.todo, // Ensure currentTodo.todo has the new value
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    // console.log(result); // Optional for debugging

    // Fetch updated todos and close modal
    FetchTodos();
    setIsModalOpen(false);
    toast.info("Todo Updated Successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      style: {
        backgroundColor: "#ddd6fe", // Custom background color
        color: "#000000",
      },
    });
    setCurrentTodo(null);
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const handleDelete = async (Id) => {
  try {
    const response = await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Id: Id, username: username }), // Send Id in the request body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    //console.log("Todo successfully deleted!");

    // Refresh the todo list
    FetchTodos();
    toast.error("Task Deleted Successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      style: {
        backgroundColor: "#ddd6fe", // Custom background color
        color: "#000000",
      },
    });
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
};

export const handleCheck = async (Id) => {
  const response = await fetch("http://localhost:3000/check", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Id: Id, username: username }), // Send Id in the request body
  });
  let res = await response.json();
  // console.log(res);

  FetchTodos();

  toast.info("Task Status Updated!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Bounce,
    style: {
      backgroundColor: "#ddd6fe", // Custom background color
      color: "#000000",
    },
  });
};
