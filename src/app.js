function showWeather(response) {
  console.log(response.data);
  console.log(response.data.main.temp);
  console.log(response.data.main.name);
  console.log(response.weather);
  console.log(response.data.weather[0].description);
  tempValue.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  weatherDescription.innerHTML = response.data.weather[0].description;
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
}

let apiKey = "0ad145bfcc1ef1bfc5678ea389f3498a";
let cityName = "Berlin";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(showWeather);
