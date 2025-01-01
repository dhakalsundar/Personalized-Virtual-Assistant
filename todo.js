     
     document.querySelectorAll('.sidebar nav ul li a').forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            document.querySelectorAll('.sidebar nav ul li').forEach(li => {
                li.classList.remove('active');
            });

            this.parentElement.classList.add('active');

            const sectionId = this.getAttribute('data-section');
            document.querySelectorAll('.tasks').forEach(section => {
                section.classList.remove('active');
            });

            if (sectionId === 'todo') {
                document.querySelector('#todo').classList.add('active');
            }
        });
    });
    function updateTask(taskId) {
        const task = document.getElementById(taskId);
        const title = prompt('Enter new title:', task.querySelector('h3').textContent);
        const description = prompt('Enter new description:', task.querySelector('p').textContent);

        if (title) task.querySelector('h3').textContent = title;
        if (description) task.querySelector('p').textContent = description;
    }

    const taskList = document.getElementById('task-list');
    const addTaskButton = document.getElementById('add-task-button');

    addTaskButton.addEventListener('click', () => {
        const title = document.getElementById('task-title').value;
        const description = document.getElementById('task-desc').value;

        if (title.trim() === '' || description.trim() === '') {
            alert('Please fill in both fields.');
            return;
        }

        const task = document.createElement('div');
        task.className = 'task';
        task.innerHTML = `
            <img src="https://img.icons8.com/emoji/48/check-mark-emoji.png" alt="Task">
            <h3>${title}</h3>
            <p>${description}</p>
            <button class="update-task" onclick="updateTask('${title.replace(/\s+/g, '-').toLowerCase()}')">Update</button>
        `;

        taskList.appendChild(task);

        // Clear input fields
        document.getElementById('task-title').value = '';
        document.getElementById('task-desc').value = '';
    });





