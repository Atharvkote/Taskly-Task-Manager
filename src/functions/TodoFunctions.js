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
    const response = await fetch("http://localhost:3000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log("Todo successfully added to the server!");

    // Fetch updated todos
    FetchTodos();

    // Clear input
    setTodo("");
  } catch (error) {
    console.error("Failed to add todo:", error);
  }
};

export const handleEdit = (Id) => {
  const todoToEdit = todos.find((todo) => todo.Id === Id);
  if (todoToEdit) {
    setCurrentTodo({ ...todoToEdit });
    setIsModalOpen(true);
  }
};

export const handleSave = () => {
  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo.Id === currentTodo.Id ? { ...todo, ...currentTodo } : todo
    )
  );
  setIsModalOpen(false);
  setCurrentTodo(null);
};

export const FetchTodos = async () => {
  try {
    const response = await fetch("http://localhost:3000/");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const fetchedTodos = await response.json();
    setTodos(fetchedTodos);
    console.log(todos);

    // Store todos in local storage
    // localStorage.setItem("todos", JSON.stringify(fetchedTodos));
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};



export const handleDelete = async (Id) => {
  try {
    const response = await fetch("http://localhost:3000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ Id:Id }), // Send Id in the request body
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    console.log("Todo successfully deleted!");

    // Refresh the todo list
    FetchTodos();
  } catch (error) {
    console.error("Failed to delete todo:", error);
  }
};

export const handleCheck = (Id) => {
  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo.Id === Id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    )
  );
};
