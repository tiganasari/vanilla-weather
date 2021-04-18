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

function displayTemperature(response) {
 

    document.querySelector("#city-search").innerHTML = response.data.name;
  document.querySelector("#showTemperature").innerHTML = `${Math.round(
    response.data.main.temp
  )}°C`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
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


function showCurrentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentCity = document.querySelector("#my-city");
currentCity.addEventListener("click", showCurrentCity);

function searchLocation(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}
