const apiKey = '248e37aa37b233cb84793897a8ec1b39';
const search = document.getElementById("search");
const unit = document.getElementById("unit");
const cityElement = document.getElementById("City");
const desc = document.getElementById("Description");
const temp = document.getElementById("Temp");
const hum = document.getElementById("Humidity");
const wind = document.getElementById("Wind");

function WeatherReport() {
    const searchedCity = search.value.trim();
    const selectedUnit = unit.value;

    if (searchedCity === '') {
        alert("Please enter a city name!");
        return;
    }

    const units = selectedUnit === 'celsius' ? 'metric' : 'imperial';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=${apiKey}&units=${units}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert("City not found!");
                return;
            }
            const iconCode = data.weather[0].icon; // Weather icon code
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById("weather-icon").src = iconUrl;

            cityElement.innerText = data.name;
            desc.innerText = data.weather[0].description;
            temp.innerText = `${data.main.temp}°${selectedUnit === 'celsius' ? 'C' : 'F'}`;
            hum.innerText = ` ${data.main.humidity}%`;
            wind.innerText = `   ${data.wind.speed} m/s`;
            
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("An error occurred while fetching the data. Please try again.");
        });
}
