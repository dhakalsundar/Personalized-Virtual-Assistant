function fetchWeather() {
    document.getElementById("weather-info").textContent = "Sunny, 25°C"; // Placeholder
}
fetchWeather();

const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
document.getElementById('add-todo').addEventListener('click', () => {
    const task = todoInput.value.trim();
    if (task) {
        const li = document.createElement('li');
        li.textContent = task;
        li.addEventListener('click', () => li.remove());
        todoList.appendChild(li);
        todoInput.value = '';
    }
});

const notesArea = document.getElementById('notes-area');
notesArea.addEventListener('input', () => {
    localStorage.setItem('notes', notesArea.value);
});
notesArea.value = localStorage.getItem('notes') || '';
