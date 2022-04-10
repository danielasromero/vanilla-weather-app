// Homework 4 (Plus Week 4) 
// Display current date + time 
let now = new Date();

let days = [
"Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"
];

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = days[now.getDay()];

let currentTime = document.querySelector("#current-time");

if (now.getMinutes() < 10){
    currentTime.innerHTML = `${now.getHours()}:0${now.getMinutes()}`;  
} else {
    currentTime.innerHTML = `${now.getHours()}:${now.getMinutes()}`;
}

function formatDate(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = [
        "Sun","Mon","Tue","Wed","Thu","Fri","Sat"
        ];

    return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;

    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    
    forecast.forEach(function (forecastDay, index) {
        if (index < 6) {
            forecastHTML = forecastHTML +
            `<div class="col-2">
            <div class="weather-forecast-date"> ${formatDate(forecastDay.dt)} </div>
            <img 
            src= "https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            alt="" 
            width="36"
            />
            <div class="weather-forecast-temps">
            <span class="weather-forecast-temp-max">
              ${Math.round(forecastDay.temp.max)}°
            </span>
            <span class="weather-forecast-temp-min">
              ${Math.round(forecastDay.temp.min)}°
            </span>
          </div>
        </div>`;
    
        }
        });
        
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

// City Search + API weather 

function search(city) {
    let apiKey = "35a610a7ee1e91c0a989468ef9ec0328";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemp);
}

function changeCity(event) {
    event.preventDefault();
    let heading = document.querySelector("#city");
    let cityInput = document.querySelector("#user-city-input");
    search(cityInput.value);
    console.log(cityInput.value)
}

function getForecast(coordinates) {
    let apiKey = "35a610a7ee1e91c0a989468ef9ec0328"; 
    let lat = coordinates.lat;
    let lon = coordinates.lon;
    let forecastAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    axios.get(forecastAPI).then(displayForecast);
}

function showTemp(response) {
    let heading = document.querySelector("#city");
    heading.innerHTML = response.data.name;

    console.log(response.data)
    console.log(response.data.weather[0].description)
    celciusTemp = response.data.main.temp;
    
    let temperature_value = Math.round(celciusTemp);
    let tempElement = document.querySelector("#temp-value");
    tempElement.innerHTML = temperature_value;

    let wind_speed = Math.round(response.data.wind.speed);
    let windSpeedElement = document.querySelector("#wind-speed");
    windSpeedElement.innerHTML = `Wind Speed: ${wind_speed} km/h`

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    
    let icon = response.data.weather[0].icon;
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${icon}@2x.png`);

    getForecast(response.data.coord);
  }
  
let citySearch = document.querySelector("form");
citySearch.addEventListener("submit", changeCity);


search("Sydney");