const apiKey = '248e37aa37b233cb84793897a8ec1b39'; 

const searchInput = document.getElementById('search');
const unitSelect = document.getElementById('unit-select');
const cityName = document.getElementById('city-name');
const weatherDescription = document.getElementById('weather-description');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const weatherInfo = document.getElementById('weather-info');

searchInput.addEventListener('input', () => {
    const city = searchInput.value;
    const unit = unitSelect.value;

    if (city.trim() === '') return;

    weatherInfo.textContent = 'Loading...';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`)
        .then(response => response.json())
        .then(data => {
            cityName.textContent = data.name;
            weatherDescription.textContent = data.weather[0].description;
            temperature.textContent = `Temperature: ${data.main.temp}°${unit.toUpperCase()}`;
            humidity.textContent = `Humidity: ${data.main.humidity}%`;
            windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
            weatherInfo.textContent = '';
        })
        .catch(error => {
            console.error(error);
            weatherInfo.textContent = 'Error fetching weather data. Please try again.';
        });
});