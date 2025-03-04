async function fetchTasks() {
    console.log("Fetching tasks...");
    try {
        const userId = "TQJZrxFfpscastnjbfvZCaXF0bu2"; // Replace with actual user ID
        const response = await fetch(`http://localhost:3000/api/get-tasks/${userId}`);

        if (response.status === 404) {
            console.log("No tasks found for this user.");
            const tbody = document.querySelector("tbody");
            tbody.innerHTML = "<tr><td colspan='5'>No tasks available</td></tr>"; // Display message
            return; // Exit the function if no tasks are found
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        const tbody = document.querySelector("tbody");
        tbody.innerHTML = ""; // Clear existing tasks

        if (data && data.tasks && data.tasks.length > 0) {
            console.log("Tasks:", data.tasks);
            data.tasks.forEach((task) => {
                const row = document.createElement("tr");

                // Create Edit button dynamically
                const editButton = document.createElement("button");
                editButton.classList.add("btn", "edit");
                editButton.textContent = "Edit";

                // Bind click event to open edit modal
                editButton.addEventListener("click", function() {
                    openEditModal(task);
                });

                // Create Delete button dynamically
                const deleteButton = document.createElement("button");
                deleteButton.classList.add("btn", "delete");
                deleteButton.textContent = "Delete";

                // Bind click event to delete the task
                deleteButton.addEventListener("click", function() {
                    deleteTask(task.taskId);
                });

                // Append buttons to the row
                const tdButtons = document.createElement("td");
                tdButtons.appendChild(editButton);
                tdButtons.appendChild(deleteButton);

                row.innerHTML = `
                    <td>${task.taskName}</td>
                    <td>${task.taskPriority}</td>
                    <td>${task.taskDate}</td>
                    <td class="status ${task.status.toLowerCase()}">${task.status}</td>
                `;
                row.appendChild(tdButtons);
                tbody.appendChild(row);
            });
        } else {
            console.log("No tasks found.");
            tbody.innerHTML = "<tr><td colspan='5'>No tasks available</td></tr>"; // Show empty state message
        }
    } catch (error) {
        console.error("Error fetching tasks:", error);
        alert("Failed to load tasks");
    }
}


function openAddModal() {
    document.getElementById("addTaskModal").style.display = "block";
}

function openEditModal(task) {
    console.log("Opening edit modal for task:",task); // Debugging line
    document.getElementById("editTaskModal").style.display = "block";


    document.getElementById("editModalTitle").textContent = "Edit Task";
    document.getElementById("editTaskName").value = task.taskName;
    document.getElementById("editTaskPriority").value = task.taskPriority;
    document.getElementById("editTaskDate").value = task.taskDate;
    document.getElementById("editStatus").value = task.status;
    document.getElementById("editTaskId").value = task.taskId;
    // document.getElementById("editTaskModal").style.display = "block"; // Opening modal
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
}

async function addTask() {
    const taskName = document.getElementById("addTaskName").value;
    const taskPriority = document.getElementById("addTaskPriority").value;
    const taskDate = document.getElementById("addTaskDate").value;
    const status = document.getElementById("addStatus").value;
    const userId = "TQJZrxFfpscastnjbfvZCaXF0bu2";  // Replace with actual user ID

    if (!taskName || !taskPriority || !taskDate) {
        alert("Please fill in all fields!");
        return;
    }

    const taskData = {
        userId,
        taskName,
        taskPriority,
        taskDate,
        status,
    };

    try {
        const response = await fetch("http://localhost:3000/api/add-task", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(taskData),
        });

        if (response.ok) {
            alert("Task added successfully!");
            closeModal('addTaskModal');
            fetchTasks();
        } else {
            const errorData = await response.json();
            alert("Error: " + errorData.error);
        }
    } catch (error) {
        console.error("Error adding task:", error);
        alert("Failed to add task!");
    }
}

async function saveEditedTask() {
    const taskId = document.getElementById("editTaskId").value;
    const taskName = document.getElementById("editTaskName").value;
    const taskPriority = document.getElementById("editTaskPriority").value;
    const taskDate = document.getElementById("editTaskDate").value;
    const status = document.getElementById("editStatus").value;

    if (!taskName || !taskPriority || !taskDate || !status) {
        alert("Please fill in all fields.");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/edit-task/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                taskName,
                taskPriority,
                taskDate,
                status,
            }),
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        closeModal('editTaskModal');
        fetchTasks();
    } catch (error) {
        console.error("Error saving task:", error);
        alert("Failed to save task.");
    }
}

async function deleteTask(taskId) {
    try {
        const response = await fetch(`http://localhost:3000/api/delete-task/${taskId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        alert("Task deleted successfully!");
        fetchTasks(); // Refresh the task list
    } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task");
    }
}

fetchTasks();  // Call function to fetch tasks on page load
