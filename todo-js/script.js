const todoTitleInput = document.getElementById("todoTitle");
const todoDescriptionInput = document.getElementById("todoDescription");
const addTodoButton = document.getElementById("addTodoButton");
const todoList = document.getElementById("todoList");

let nextId = 3;
let todos = [
  { id: 1, title: "todo 1", description: "description for todo 1", checked: false, expanded: false },
  { id: 2, title: "todo 2", description: "description for todo 2", checked: false, expanded: false },
];

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = "todo-item";

    const main = document.createElement("div");
    main.className = "todo-main";
    main.addEventListener("click", () => {
      todo.expanded = !todo.expanded;
      renderTodos();
    });

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.checked;
    checkbox.addEventListener("click", (event) => {
      event.stopPropagation();
      todo.checked = event.target.checked;
    });

    const name = document.createElement("span");
    name.className = "todo-name";
    name.textContent = todo.title;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "delete";
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      todos = todos.filter((entry) => entry.id !== todo.id);
      renderTodos();
    });

    main.append(checkbox, name, deleteButton);
    item.appendChild(main);

    if (todo.expanded) {
      const description = document.createElement("p");
      description.className = "todo-description";
      description.textContent = todo.description || "(no description)";
      item.appendChild(description);
    }

    todoList.appendChild(item);
  });
}

function addTodo() {
  const title = todoTitleInput.value.trim();
  const description = todoDescriptionInput.value.trim();

  if (!title) {
    return;
  }

  todos.push({
    id: nextId,
    title,
    description,
    checked: false,
    expanded: false,
  });

  nextId += 1;
  todoTitleInput.value = "";
  todoDescriptionInput.value = "";
  renderTodos();
}

addTodoButton.addEventListener("click", addTodo);
todoTitleInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTodo();
  }
});

renderTodos();
