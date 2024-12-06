const apiKey = '248e37aa37b233cb84793897a8ec1b39';
const search = document.getElementById("search");
const unit = document.getElementById("unit");
const forecastContainer = document.getElementById("FiveDays");

function fetchFiveDayForecast() {
    const searchedCity = search.value.trim();
    const selectedUnit = unit.value;

    if (searchedCity === '') {
        alert("Please enter a city name!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searchedCity}&appid=${apiKey}&units=${selectedUnit}`)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== "200") {
                alert("City not found!");
                return;
            }

            displayFiveDayForecast(data);
        })
        .catch(error => {
            console.error("Error fetching weather data:", error);
            alert("An error occurred while fetching the data. Please try again.");
        });
}

function displayFiveDayForecast(data) {
    forecastContainer.innerHTML = '';
    const dailyData = {};

    
    data.list.forEach(entry => {
        const date = entry.dt_txt.split(" ")[0];
        if (!dailyData[date]) {
            dailyData[date] = entry;
        }
    });

    
    Object.values(dailyData).slice(0, 5).forEach(day => {
        const date = new Date(day.dt * 1000).toDateString();
        const iconCode = day.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        forecastContainer.innerHTML += `
            <div class="forecast-day">
                <h2>${date}</h2>
                <img src="${iconUrl}" alt="Weather Icon">
                <p>Temperature: ${day.main.temp}°${unit.value === "metric" ? "C" : "F"}</p>
                <p>Weather: ${day.weather[0].description}</p>
                <p>Humidity: ${day.main.humidity}%</p>
                <p>Wind Speed: ${day.wind.speed} ${unit.value === "metric" ? "m/s" : "mph"}</p>
            </div>
        `;
    });
}
