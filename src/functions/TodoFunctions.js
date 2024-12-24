export const toggleShow = () => {
  setIsFinished(!isFinished);
};

export const handleChange = (e) => setTodo(e.target.value);

export const handleAdd = () => {
  setTodos([
    ...todos,
    {
      Id: uuIdv4(),
      todo,
      date: new Date().toDateString(),
      time: new Date().toLocaleTimeString(),
      isCompleted: false,
    },
  ]);
  setTodo("");
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

export const handleDelete = async (Id) => {
  const newTodos = todos.filter((item) => item.Id !== Id);
  setTodos(newTodos);
};

export const handleCheck = (Id) => {
  setTodos((prevTodos) =>
    prevTodos.map((todo) =>
      todo.Id === Id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    )
  );
};
