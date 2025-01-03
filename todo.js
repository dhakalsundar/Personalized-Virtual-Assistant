
function addTodo() {
    const todoInput = document.getElementById('todoInput');
    const todoList = document.getElementById('todoList');
    const task = todoInput.value.trim();

    if (task === '') {
        alert('Please enter a task!');
        return;
    }

    const li = document.createElement('li');
    li.className = 'todo-item';
    li.innerHTML = `
        <span>${task}</span>
        <button class="delete-btn" onclick="deleteTodo(this)">Delete</button>
    `;

    todoList.appendChild(li);
    todoInput.value = '';
}

function deleteTodo(button) {
    const li = button.parentElement;
    li.remove();
}
