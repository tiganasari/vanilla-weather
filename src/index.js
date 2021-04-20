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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">` ;
  forecast.forEach(function (forecastDay, index) {
if (index < 6) {
     forecastHTML = forecastHTML + ` 
                        <div class="col-2">
                            <div class="weater-forecast-date">${formatDay(forecastDay.dt)} </div>
                            <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="36" />
                            <div class="weather-forecast-temperatures">
                                <span class="weather-forecast-temperature-max">${Math.round(forecastDay.temp.max)}° </span>
                                <span class="weather-forecast-temperature-min">${Math.round(forecastDay.temp.min)}° </span>
                            </div>
                        </div>`;

} 
  });
  
forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "1bbcceb24f31d76271274aa810148c97&units=metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

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

getForecast(response.data.coord);


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





search("London");

