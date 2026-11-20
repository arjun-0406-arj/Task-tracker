const STORAGE_KEY = "task-tracker-tasks";

const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const errorEl = document.getElementById("error");
const listEl = document.getElementById("task-list");
const counterEl = document.getElementById("counter");
const filterBtns = document.querySelectorAll("#filters button");

let tasks = loadTasks();
let currentFilter = "all";

function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (e) {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (e) {
    // Storage unavailable (private mode, quota). The app still works in memory.
  }
}

function addTask() {
  const text = input.value.trim();
  if (!text) {
    errorEl.textContent = "Enter a task before adding it.";
    input.focus();
    return;
  }
  errorEl.textContent = "";
  tasks.push({ id: Date.now() + Math.random(), text: text, completed: false });
  input.value = "";
  saveTasks();
  render();
}

function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.completed = !task.completed;
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

function visibleTasks() {
  if (currentFilter === "active") return tasks.filter(t => !t.completed);
  if (currentFilter === "completed") return tasks.filter(t => t.completed);
  return tasks;
}

function render() {
  listEl.replaceChildren();
  const shown = visibleTasks();

  if (shown.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = tasks.length === 0
      ? "No tasks yet. Add your first one above."
      : "Nothing in this view.";
    listEl.appendChild(empty);
  }

  shown.forEach(task => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("done");

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text; // textContent keeps user input safe from XSS
    span.addEventListener("click", () => toggleTask(task.id));

    const del = document.createElement("button");
    del.className = "delete";
    del.textContent = "✕";
    del.setAttribute("aria-label", "Delete task: " + task.text);
    del.addEventListener("click", () => deleteTask(task.id));

    li.append(span, del);
    listEl.appendChild(li);
  });

  const left = tasks.filter(t => !t.completed).length;
  counterEl.textContent = left + (left === 1 ? " task left" : " tasks left");
}

addBtn.addEventListener("click", addTask);

input.addEventListener("keydown", e => {
  if (e.key === "Enter") addTask();
});

input.addEventListener("input", () => {
  errorEl.textContent = "";
});

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    filterBtns.forEach(b => b.classList.toggle("active", b === btn));
    render();
  });
});

render();