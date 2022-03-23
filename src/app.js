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

let apiKey = "35a610a7ee1e91c0a989468ef9ec0328";

// City Search + API weather 
function changeCity(event) {
    event.preventDefault();
    let heading = document.querySelector("#city");
    let cityInput = document.querySelector("#user-city-input");
    //heading.innerHTML = cityInput.value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemp);
};

function showTemp(response) {
    let heading = document.querySelector("#city");
    heading.innerHTML = response.data.name;
    let temperature = Math.round(response.data.main.temp);
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = temperature;

    let temp_high = Math.round(response.data.main.temp_max);
    let tempHighElement = document.querySelector("#high-temp");
    tempHighElement.innerHTML = `H: ${temp_high} °C`;

    let temp_low = Math.round(response.data.main.temp_min);
    let tempLowElement = document.querySelector("#low-temp");
    tempLowElement.innerHTML = `L: ${temp_low} °C`;

  }
  
let citySearch = document.querySelector("form");
citySearch.addEventListener("submit", changeCity);

function getCurrentTemp(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "35a610a7ee1e91c0a989468ef9ec0328";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
    navigator.geolocation.getCurrentPosition(getCurrentTemp);
}

let currentCity = document.querySelector("#current-location-button")
currentCity.addEventListener("click", getCurrentLocation);



// Bonus: Celcius to Farenheit conversion
//let temp = document.querySelector("#temperature");

/* function tempToCelcius(event){
    event.preventDefault();
    temp.innerHTML = -13;
}
function tempToFahrenheit(event){
    event.preventDefault();
    temp.innerHTML = 9;
}
let tempCel = document.querySelector("#celcius-link");
tempCel.addEventListener("click", tempToCelcius);

let tempFar = document.querySelector("#fahrenheit-link");
tempFar.addEventListener("click",tempToFahrenheit); */