const inputField = document.getElementById("input");
const addButton = document.getElementById("btn");
const todoItems = document.getElementById("todo-items");

function addTodo() {
  const todoText = inputField.value.trim();

  if (todoText === "") {
    return; // Don't add empty inputs
  }

  const listItems = document.createElement("li");
  listItems.innerHTML = `
    <label class="todo-item">
      <input type="checkbox" class="checkbox">
      <span class="task-text">${todoText}</span>
      <button class="delete-item"><i class="fas fa-trash"></i></button>
    </label>
  `;

  const deleteBtn = listItems.querySelector(".delete-item");
  deleteBtn.onclick = function () {
    todoItems.removeChild(listItems);
    saveTodos();
  };

  todoItems.appendChild(listItems);
  saveTodos();

  inputField.value = ""; // Clear input field
}

function saveTodos() {
  const todos = [];
  document.querySelectorAll('.todo-list li').forEach((item) => {
    todos.push({
      text: item.querySelector('.task-text').textContent,
      completed: item.querySelector('.checkbox').checked,
    });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todo) => {
    const listItems = document.createElement("li");
    listItems.innerHTML = `
      <label class="todo-item">
        <input type="checkbox" class="checkbox" ${todo.completed ? 'checked' : ''}>
        <span class="task-text">${todo.text}</span>
        <button class="delete-item"><i class="fas fa-trash"></i></button>
      </label>
    `;

    const deleteBtn = listItems.querySelector(".delete-item");
    deleteBtn.onclick = function () {
      todoItems.removeChild(listItems);
      saveTodos();
    };

    todoItems.appendChild(listItems);
  });
}

addButton.addEventListener("click", addTodo);

inputField.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault(); 
    addTodo();
  }
});

document.addEventListener("DOMContentLoaded", loadTodos);
