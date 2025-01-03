// Display a spinner while fetching weather data
function showWeatherLoading() {
    const weatherInfo = document.getElementById("weather-info");
    weatherInfo.innerHTML = '<span class="loading-spinner"></span> Fetching weather...';
}

async function fetchWeather() {
    // Show a loading indicator while fetching data
    showWeatherLoading();
    
    const apiKey = 'YOUR_API_KEY'; // Replace with your valid API key
    const city = 'London'; // Change city name as needed
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(apiUrl);

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const weatherInfo = `${data.weather[0].description.toUpperCase()}, ${data.main.temp}°C`;
        document.getElementById("weather-info").textContent = weatherInfo;
    } catch (error) {
        document.getElementById("weather-info").textContent = "Unable to fetch weather data.";
        console.error("Weather API error:", error.message);
    }
}


// Update date and time with animation
function updateTime() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' };

    document.getElementById('date').textContent = now.toLocaleDateString(undefined, options);
    document.getElementById('time').textContent = now.toLocaleTimeString(undefined, timeOptions);
}

// Initialize real-time updates with animations
function initializeDashboard() {
    fetchWeather(); // Fetch weather data
    setInterval(updateTime, 1000); // Update time every second
}

initializeDashboard();

// To-Do List Functionality
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

// Notes Functionality
const notesArea = document.getElementById('notes-area');
notesArea.addEventListener('input', () => {
    localStorage.setItem('notes', notesArea.value);
});
notesArea.value = localStorage.getItem('notes') || '';

// Activity Tracker Functionality
let stepsCount = 0;
document.getElementById('add-step').addEventListener('click', () => {
    stepsCount++;
    document.getElementById('steps-count').textContent = stepsCount;
});
