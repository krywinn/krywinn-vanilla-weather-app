function formatTime(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${[day]}, ${hours}:${minutes}`;
}

function showWeather(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  console.log(response.data.main.name);
  console.log(response.weather);
  console.log(response.data.weather[0].description);
  tempValue.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.weather[0].description;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  timeElement.innerHTML = formatTime(response.data.dt * 1000);
  console.log(response.data.weather[0].icon);
  weatherNowIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherNowIcon.setAttribute("alt", `${response.data.weather[0].description}`);
}

function search(city) {
  let apiKey = "0ad145bfcc1ef1bfc5678ea389f3498a";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityName = document.querySelector("#user-input");
  search(cityName.value);
}

let apiKey = "0ad145bfcc1ef1bfc5678ea389f3498a";
let cityName = "Copenhagen";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(showWeather);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Copenhagen");
