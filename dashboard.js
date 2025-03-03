const uid = localStorage.getItem('uid');
console.log(uid);

async function fetchUserProfileforHome() {
 // Replace with actual logged-in user ID
  const response = await fetch(`http://localhost:3000/api/get-profile?userId=${uid}`);
  
  if (response.ok) {
      const userProfile = await response.json();
      console.log(userProfile);

      // Update profile name
      const profileName = document.querySelector('.profile h2');
      if (profileName) {
          profileName.textContent = userProfile.name || 'User';
      }

      // Update profile picture
      const profilePic = document.querySelector('.profile-pic');
      if (profilePic) {
          profilePic.src = userProfile.profilePic || 'default-profile.jpg';  // Set default if no image
      }
  } else {
      console.error('Error fetching user profile');
  }
}

// Call function to update profile on page load



function loadPage(page) {
  fetch(page)
      .then(response => response.text())
      .then(data => {
          document.getElementById('content').innerHTML = data;

          // Check if the loaded page is 'editprofile.html' and execute the function
          if (page.includes('editprofile.html') && typeof fetchUserProfile === "function") {
              fetchUserProfile();
          }if (page.includes('Home.html') && typeof fetchUserProfileforHome === "function") {
            fetchUserProfileforHome();
            getLocation()
            updateTime()
        }if (page.includes('Task.html') && typeof fetchTasks === "function") {
          fetchTasks();
      }if (page.includes('calendar.html') && typeof fetchTasks === "function") {
        initiialzecalendar();

    }


      })
      .catch(error => console.error('Error loading page:', error));
}

document.addEventListener("DOMContentLoaded", function () {
    loadPage('Home.html'); // Load Home.html by default
});


function logoutUser() {
    if (confirm("Are you sure you want to log out?")) {
        // Clear session storage or local storage (if using authentication tokens)
        localStorage.clear(); 
        sessionStorage.clear();
        
        // Redirect to login page (replace with your actual login page)
        window.location.href = "login.html"; 
    }
}


window.onload = function () {
  // Check if the current page is 'editprofile.html'
  if (window.location.pathname.includes('editprofile.html')) {
      fetchUserProfile(); // Only fetch profile if on editprofile page
  }
};
async function fetchUserProfile() {
   // Replace this with actual logged-in user ID
  const response = await fetch(`http://localhost:3000/api/get-profile?userId=${uid}`);
  
  if (response.ok) {
      const userProfile = await response.json();
      console.log(userProfile);

      // Check if the elements exist before updating their values
      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      const profilePicPreview = document.getElementById('profile-pic-preview');
      
      if (nameField) {
          nameField.value = userProfile.name || '';
      }
      
      if (emailField) {
          emailField.value = userProfile.email || '';
      }

      if (profilePicPreview) {
          profilePicPreview.src = userProfile.profilePic || '';  // Set the profile picture preview
      }
  } else {
      console.error('Error fetching user profile');
  }
}

// Function to preview image
function previewImage(event) {
  const file = event.target.files[0];
  const preview = document.getElementById('profile-pic-preview');
  const nameInput = document.getElementById('name');

  if (file) {
      const reader = new FileReader();
      reader.onload = function () {
          preview.src = reader.result;
          preview.style.display = 'block';
      };
      reader.readAsDataURL(file);
  } else if (!file && nameInput.value) {
      preview.style.display = 'block';
      preview.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"><rect width="200" height="200" fill="#ddd"/><text x="50%" y="50%" font-size="100" text-anchor="middle" fill="black" dy=".3em">' + nameInput.value.charAt(0).toUpperCase() + '</text></svg>';
  }
}

async function updateProfileImage() {
  const fileInput = document.getElementById('file-input');
  const file = fileInput.files[0];
  
  if (!file) {


      showToast("error","No file selected")
      return;
  }

  const formData = new FormData();
  formData.append("profilePic", file);
  formData.append("userId", uid);

  try {
      const response = await fetch('http://localhost:3000/api/upload-profile-pic', {
          method: "POST",
          body: formData
      });

      const result = await response.json();
      if (response.ok) {
          document.getElementById('profile-pic-preview').src = result.profilePicUrl;
          showToast("success","Profile Picture updated successfully")

      } else {
          showToast("error",result.message)

      }

  } catch (error) {
      console.error("Error uploading profile picture:", error);
      showToast("error",result.message)

  }
}



async function updateProfile() {
 // Replace with actual user ID
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const userId =uid
  
  try {
      const response = await fetch('http://localhost:3000/api/update-profile', {
          method: 'PUT',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({userId, name, email })
      });

      const result = await response.json();
      if (response.ok) {
          showToast("success","Profile updated successfully")
      } else {
          alert("Failed to update profile: " + result.message);
      }
  } catch (error) {
      console.error("Error updating profile:", error);
  }
}




  function showToast(type, message) {
      // Create toast container if not already present
      const toastContainer = document.getElementById('toast-container');
      if (!toastContainer) {
          const container = document.createElement('div');
          container.id = 'toast-container';
          document.body.appendChild(container);
      }

      // Create the toast element
      const toast = document.createElement('div');
      toast.classList.add('toast', type); // Add appropriate class based on type
      toast.textContent = message;

      // Append the toast to the container
      const toastContainerElement = document.getElementById('toast-container');
      toastContainerElement.appendChild(toast);

      // Show the toast with animation
      setTimeout(() => {
          toast.classList.add('show');
      }, 100);

      // Automatically remove the toast after 3 seconds
      setTimeout(() => {
          toast.classList.remove('show');
          toast.remove();
      }, 3000);
  }

  // Example Usage:
  // Trigger different toast types








// Function to add a task to the list






//home.html
// Function to fetch weather data based on user's location
async function fetchWeather(lat, lon) {
    const apiKey = 'd609d76870fe4d5fbb253954251202'; // Replace with your OpenWeatherMap API key
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)
        if (data) {
            const weatherInfo = `
                <p style="color: #ff6a00;">Location: ${data.location.name}</p>
                <p style="color: #ff6a00;">Temperature: ${data.current.temp_c} °C</p>
            `;
            document.getElementById('weather-info').innerHTML = weatherInfo;
        } else {
            document.getElementById('weather-info').innerHTML = `<p style="color: red;">Error: ${data.message}</p>`;
        }
    } catch (error) {
        document.getElementById('weather-info').innerHTML = `<p style="color: red;">Error fetching weather data.</p>`;
    }
}

// Function to get user's location and fetch weather data
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetchWeather(lat, lon); // Fetch weather using coordinates
        }, () => {
            document.getElementById('weather-info').innerHTML = `<p style="color: red;">Unable to retrieve your location.</p>`;
        });
    } else {
        document.getElementById('weather-info').innerHTML = `<p style="color: red;">Geolocation is not supported by this browser.</p>`;
    }
}

// Function to update the current time
function updateTime() {
    console.log('updationg time')
    const now = new Date();
    const options = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
    const timeString = now.toLocaleTimeString([], options);
    document.getElementById('current-time').innerHTML = `<p style="color: #ff6a00;">${timeString}</p>`;
}

// Fetch weather data and update time on page load

document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.querySelector(".sidebar");
    const toggler = document.querySelector(".sidebar-toggler");
    const contentDiv = document.getElementById("content");

    // Sidebar toggle functionality
    toggler.addEventListener("click", function () {
        sidebar.classList.toggle("collapsed");
    });

    // Function to load pages dynamically
    function loadPages(page) {
        fetch(page)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Page not found: " + page);
                }
                return response.text();
            })
            .then(data => {
                contentDiv.innerHTML = data;
            })
            .catch(error => console.error("Error loading page:", error));
    }

    // Load Home.html by default
    loadPages("Home.html");
});



function initiialzecalendar(){

    const calendarGrid = document.getElementById("calendar-grid");
    const currentMonthEl = document.getElementById("current-month");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");
    const modal = document.getElementById("event-modal");
    const closeModal = document.getElementById("close-modalcal");
    const eventDateEl = document.getElementById("event-date");
    const eventInput = document.getElementById("event-input");
    const saveEventBtn = document.getElementById("save-event");
    
    let events = {};
    let currentDate = new Date();
    
    function renderCalendar() {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const today = new Date();
    
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
    
      currentMonthEl.textContent = currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    
      calendarGrid.innerHTML = "";
    
      for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement("div");
        calendarGrid.appendChild(emptyCell);
      }
    
      for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement("div");
        dayCell.classList.add("day");
        dayCell.textContent = day;
    
        const dateKey = `${year}-${month + 1}-${day}`;
        if (events[dateKey]) {
          const eventEl = document.createElement("div");
          eventEl.classList.add("event");
          eventEl.textContent = events[dateKey];
          dayCell.appendChild(eventEl);
        }
    
        if (
          day === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear()
        ) {
          dayCell.classList.add("current-day");
        }
    
        if (new Date(year, month, day).getDay() === 6) {
          dayCell.classList.add("holiday");
        }
    
        dayCell.addEventListener("click", () => openModal(dateKey));
        calendarGrid.appendChild(dayCell);
      }
    }
    
    function openModal(date) {
      modal.style.display = "flex";
      eventDateEl.textContent = `Add Event for ${date}`;
      eventInput.value = events[date] || "";
      saveEventBtn.dataset.date = date;
    }
    
    function closeModalFunc() {
      modal.style.display = "none";
    }
    
    function saveEvent() {
      const date = saveEventBtn.dataset.date;
      const eventText = eventInput.value.trim();
    
      if (eventText) {
        events[date] = eventText;
      } else {
        delete events[date];
      }
    
      closeModalFunc();
      renderCalendar();
    }
    
    prevMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar();
    });
    
    nextMonthBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar();
    });
    
    closeModal.addEventListener("click", closeModalFunc);
    saveEventBtn.addEventListener("click", saveEvent);
    
    window.addEventListener("click", (e) => {
      if (e.target === modal) closeModalFunc();
    });
    
    renderCalendar();
    


}



async function search() {
    const searchQuery = document.getElementById('searchInput').value;
  
    if (!searchQuery) {
      alert('Please enter a search query!');
      return;
    }
  
    // Show loading state
    document.getElementById('searchResults').innerHTML = "Searching...";
  
    let apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDkfklQhGVFwatmEl998p8FSQblU0PFwXA';
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: searchQuery
            }
          ]
        }
      ]
    };
  
    try {
      // Send search query to your backend API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        throw new Error('API request failed');
      }
  
      const data = await response.json();
      console.log(data)
        // Extract and display the response content
        const responseText = data.candidates[0].content.parts[0].text;
        console.log(responseText)
  
        document.getElementById('searchResults').innerHTML = `
          <h3>Search Result:</h3>
          <p>${responseText}</p>`
    } catch (error) {
      // Handle errors
      document.getElementById('searchResults').innerHTML = `Error: ${error.message}`;
    }
  }
  
  // Function to search on Google separately
  function searchOnGoogle() {
    let query = document.getElementById('searchInput').value.trim();
    if (query.length > 0) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, "_blank");
    }
  }
  
  // Handle "Enter" key press
  function handleSearch(event) {
    if (event.key === "Enter") {
      search();
    }
  }
  




  async function fetchTasks() {
    console.log("Fetching tasks...");
    try {
        const userId = uid; // Replace with actual user ID
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
        // alert("Failed to load tasks");
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
    const userId = uid;  // Replace with actual user ID

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
