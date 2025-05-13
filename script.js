// DOM elements
const addTaskForm = document.getElementById("addTaskForm");
const addTaskInput = document.getElementById("addTaskInput");
const taskList = document.getElementById("taskList");
const STORAGE_KEY = "todoItems";

// Load items on page load
document.addEventListener("DOMContentLoaded", loadItems);

// Form submission handler
addTaskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = addTaskInput.value.trim();
    if (taskText) {
        addItem(taskText);
        addTaskInput.value = "";
    }
    addTaskInput.focus();
});

// Add new item to the list/storage
function addItem(text) {
    const id = Date.now(); // Unique ID for each item
    const item = { id, text };
    renderItem(item);
    const items = getItems();
    items.push(item);
    saveItems(items);
}

// Render an item
function renderItem(item) {
    const li = document.createElement("li");
    li.dataset.id = item.id;
    li.innerHTML = `
        ${item.text}
        <button onclick="removeItem(this)">remove</button>
    `;
    taskList.appendChild(li);
}

// Remove item from list and storage
function removeItem(button) {
    const li = button.parentElement;
    const id = parseInt(li.dataset.id);
    li.remove();
    const items = getItems().filter(item => item.id !== id);
    saveItems(items);
}

// Storage helper functions
function getItems() {
    const itemsJson = localStorage.getItem(STORAGE_KEY);
    return itemsJson ? JSON.parse(itemsJson) : [];
}

function saveItems(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}


// Load items from storage
function loadItems() {
    const items = getItems();
    items.forEach(renderItem);
}
