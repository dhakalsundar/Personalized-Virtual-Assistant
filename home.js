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





document.addEventListener("DOMContentLoaded", function() {
    getLocation();
    // setTimeout(updateTime, 500); 
    //     setInterval(updateTime, 1000); // Update time every second
});
