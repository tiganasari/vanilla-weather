let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let today = `${day}, ${hours}:${minutes}`;

let todayTime = document.querySelector("h2");
todayTime.innerHTML = today;

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");
  let days = ["Thu", "Fri", "Sat", "Sun"];

  let forecastHTML = `<div class="row">` ;
  days.forEach(function (day) {
    forecastHTML = forecastHTML + ` 
                        <div class="col-2">
                            <div class="weater-forecast-date">${day} </div>
                            <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="36" />
                            <div class="weather-forecast-temperatures">
                                <span class="weather-forecast-temperature-max"> 18° </span>
                                <span class="weather-forecast-temperature-min"> 12° </span>
                            </div>
                        </div>`;
  });
  
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
console.log(forecastHTML)
;}

function displayTemperature(response) {
    document.querySelector("#city-search").innerHTML = response.data.name;
  document.querySelector("#showTemperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector(
    "#pressure"
  ).innerHTML = `${response.data.main.pressure} mb`;
  let visibility = response.data.visibility;
  document.querySelector("#visibility").innerHTML = `${Math.round(
    visibility / 1000
  )} km`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `${response.data.main.humidity}%`;
   let iconElement = document.querySelector("#icon");
   iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
 iconElement.setAttribute("alt", response.data.weather[0].description);

celciusTemperature = response.data.main.temp;


}

function search(city) {
  let apiKey = "1bbcceb24f31d76271274aa810148c97&units=metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  
  axios.get(apiUrl).then(displayTemperature);
}

function submitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}
let form = document.querySelector("form");
form.addEventListener("submit", submitCity);


function displayFahrenheitTemperature(event) {
event.preventDefault();
 let temperatureElement = document.querySelector("#showTemperature");
 let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
 temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°F`;
}

function displayCelsiusTemperature(event) {
event.preventDefault();
let temperatureCElement = document.querySelector("#showTemperature");
temperatureCElement.innerHTML = `${Math.round(celciusTemperature)}°C`;

}
celciusTemperature = null;

let fahrenheitLink = document.querySelector("#degreesF");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#degreesC");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


search("London");
displayForecast();
