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
  celsiusTemperature = response.data.main.temp;

  tempValue.innerHTML = Math.round(celsiusTemperature);
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

  let foundCountryCode = `${response.data.sys.country}`;
  let countryName = countries[foundCountryCode];
  countryElement.innerHTML = countryName;
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

function showFahrenheitWeather(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#tempValue");
  let fahrenheitWeather = Math.round((celsiusTemperature * 9) / 5 + 32);
  temperatureElement.innerHTML = fahrenheitWeather;
}

function showCelsiusWeather(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#tempValue");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function showCurrentCityWeather(response) {
  let currentTempRounded = Math.round(response.data.main.temp);
  document.querySelector("#tempValue").innerHTML = `${currentTempRounded}`;
  document.querySelector(
    "#humidityElement"
  ).innerHTML = `${response.data.main.humidity}`;
  document.querySelector("#windElement").innerHTML = `${Math.round(
    response.data.wind.speed
  )}`;
  document.querySelector("#descriptionElement").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#feelsLikeElement").innerHTML = Math.round(
    response.data.main.feels_like
  );
  let foundCountryCode = `${response.data.sys.country}`;
  let countryName = countries[foundCountryCode];
  document.querySelector("#countryElement").innerHTML = countryName;
}

function showCurrentCity(city) {
  document.querySelector("#cityElement").innerHTML = city.data.name;
}

function handleCurrentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `0ad145bfcc1ef1bfc5678ea389f3498a`;
  let units = `metric`;
  let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrlCurrent).then(showCurrentCity);
  axios.get(apiUrlCurrent).then(showCurrentCityWeather);
}

function getCoordinates(response) {
  navigator.geolocation.getCurrentPosition(handleCurrentPosition);
}

let apiKey = "0ad145bfcc1ef1bfc5678ea389f3498a";
let cityName = "Copenhagen";
let unit = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

axios.get(apiUrl).then(showWeather);

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitWeather);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusWeather);

let countries = {
  BD: "Bangladesh",
  BE: "Belgium",
  BF: "Burkina Faso",
  BG: "Bulgaria",
  BA: "Bosnia and Herzegovina",
  BB: "Barbados",
  WF: "Wallis and Futuna",
  BL: "Saint Barthelemy",
  BM: "Bermuda",
  BN: "Brunei",
  BO: "Bolivia",
  BH: "Bahrain",
  BI: "Burundi",
  BJ: "Benin",
  BT: "Bhutan",
  JM: "Jamaica",
  BV: "Bouvet Island",
  BW: "Botswana",
  WS: "Samoa",
  BQ: "Bonaire, Saint Eustatius and Saba ",
  BR: "Brazil",
  BS: "Bahamas",
  JE: "Jersey",
  BY: "Belarus",
  BZ: "Belize",
  RU: "Russia",
  RW: "Rwanda",
  RS: "Serbia",
  TL: "East Timor",
  RE: "Reunion",
  TM: "Turkmenistan",
  TJ: "Tajikistan",
  RO: "Romania",
  TK: "Tokelau",
  GW: "Guinea-Bissau",
  GU: "Guam",
  GT: "Guatemala",
  GS: "South Georgia and the South Sandwich Islands",
  GR: "Greece",
  GQ: "Equatorial Guinea",
  GP: "Guadeloupe",
  JP: "Japan",
  GY: "Guyana",
  GG: "Guernsey",
  GF: "French Guiana",
  GE: "Georgia",
  GD: "Grenada",
  GB: "United Kingdom",
  GA: "Gabon",
  SV: "El Salvador",
  GN: "Guinea",
  GM: "Gambia",
  GL: "Greenland",
  GI: "Gibraltar",
  GH: "Ghana",
  OM: "Oman",
  TN: "Tunisia",
  JO: "Jordan",
  HR: "Croatia",
  HT: "Haiti",
  HU: "Hungary",
  HK: "Hong Kong",
  HN: "Honduras",
  HM: "Heard Island and McDonald Islands",
  VE: "Venezuela",
  PR: "Puerto Rico",
  PS: "Palestinian Territory",
  PW: "Palau",
  PT: "Portugal",
  SJ: "Svalbard and Jan Mayen",
  PY: "Paraguay",
  IQ: "Iraq",
  PA: "Panama",
  PF: "French Polynesia",
  PG: "Papua New Guinea",
  PE: "Peru",
  PK: "Pakistan",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PM: "Saint Pierre and Miquelon",
  ZM: "Zambia",
  EH: "Western Sahara",
  EE: "Estonia",
  EG: "Egypt",
  ZA: "South Africa",
  EC: "Ecuador",
  IT: "Italy",
  VN: "Vietnam",
  SB: "Solomon Islands",
  ET: "Ethiopia",
  SO: "Somalia",
  ZW: "Zimbabwe",
  SA: "Saudi Arabia",
  ES: "Spain",
  ER: "Eritrea",
  ME: "Montenegro",
  MD: "Moldova",
  MG: "Madagascar",
  MF: "Saint Martin",
  MA: "Morocco",
  MC: "Monaco",
  UZ: "Uzbekistan",
  MM: "Myanmar",
  ML: "Mali",
  MO: "Macao",
  MN: "Mongolia",
  MH: "Marshall Islands",
  MK: "Macedonia",
  MU: "Mauritius",
  MT: "Malta",
  MW: "Malawi",
  MV: "Maldives",
  MQ: "Martinique",
  MP: "Northern Mariana Islands",
  MS: "Montserrat",
  MR: "Mauritania",
  IM: "Isle of Man",
  UG: "Uganda",
  TZ: "Tanzania",
  MY: "Malaysia",
  MX: "Mexico",
  IL: "Israel",
  FR: "France",
  IO: "British Indian Ocean Territory",
  SH: "Saint Helena",
  FI: "Finland",
  FJ: "Fiji",
  FK: "Falkland Islands",
  FM: "Micronesia",
  FO: "Faroe Islands",
  NI: "Nicaragua",
  NL: "Netherlands",
  NO: "Norway",
  NA: "Namibia",
  VU: "Vanuatu",
  NC: "New Caledonia",
  NE: "Niger",
  NF: "Norfolk Island",
  NG: "Nigeria",
  NZ: "New Zealand",
  NP: "Nepal",
  NR: "Nauru",
  NU: "Niue",
  CK: "Cook Islands",
  XK: "Kosovo",
  CI: "Ivory Coast",
  CH: "Switzerland",
  CO: "Colombia",
  CN: "China",
  CM: "Cameroon",
  CL: "Chile",
  CC: "Cocos Islands",
  CA: "Canada",
  CG: "Republic of the Congo",
  CF: "Central African Republic",
  CD: "Democratic Republic of the Congo",
  CZ: "Czech Republic",
  CY: "Cyprus",
  CX: "Christmas Island",
  CR: "Costa Rica",
  CW: "Curacao",
  CV: "Cape Verde",
  CU: "Cuba",
  SZ: "Swaziland",
  SY: "Syria",
  SX: "Sint Maarten",
  KG: "Kyrgyzstan",
  KE: "Kenya",
  SS: "South Sudan",
  SR: "Suriname",
  KI: "Kiribati",
  KH: "Cambodia",
  KN: "Saint Kitts and Nevis",
  KM: "Comoros",
  ST: "Sao Tome and Principe",
  SK: "Slovakia",
  KR: "South Korea",
  SI: "Slovenia",
  KP: "North Korea",
  KW: "Kuwait",
  SN: "Senegal",
  SM: "San Marino",
  SL: "Sierra Leone",
  SC: "Seychelles",
  KZ: "Kazakhstan",
  KY: "Cayman Islands",
  SG: "Singapore",
  SE: "Sweden",
  SD: "Sudan",
  DO: "Dominican Republic",
  DM: "Dominica",
  DJ: "Djibouti",
  DK: "Denmark",
  VG: "British Virgin Islands",
  DE: "Germany",
  YE: "Yemen",
  DZ: "Algeria",
  US: "United States",
  UY: "Uruguay",
  YT: "Mayotte",
  UM: "United States Minor Outlying Islands",
  LB: "Lebanon",
  LC: "Saint Lucia",
  LA: "Laos",
  TV: "Tuvalu",
  TW: "Taiwan",
  TT: "Trinidad and Tobago",
  TR: "Turkey",
  LK: "Sri Lanka",
  LI: "Liechtenstein",
  LV: "Latvia",
  TO: "Tonga",
  LT: "Lithuania",
  LU: "Luxembourg",
  LR: "Liberia",
  LS: "Lesotho",
  TH: "Thailand",
  TF: "French Southern Territories",
  TG: "Togo",
  TD: "Chad",
  TC: "Turks and Caicos Islands",
  LY: "Libya",
  VA: "Vatican",
  VC: "Saint Vincent and the Grenadines",
  AE: "United Arab Emirates",
  AD: "Andorra",
  AG: "Antigua and Barbuda",
  AF: "Afghanistan",
  AI: "Anguilla",
  VI: "U.S. Virgin Islands",
  IS: "Iceland",
  IR: "Iran",
  AM: "Armenia",
  AL: "Albania",
  AO: "Angola",
  AQ: "Antarctica",
  AS: "American Samoa",
  AR: "Argentina",
  AU: "Australia",
  AT: "Austria",
  AW: "Aruba",
  IN: "India",
  AX: "Aland Islands",
  AZ: "Azerbaijan",
  IE: "Ireland",
  ID: "Indonesia",
  UA: "Ukraine",
  QA: "Qatar",
  MZ: "Mozambique",
};

let currentLocation = document.querySelector("#button-geolocator");
currentLocation.addEventListener("click", getCoordinates);

search("Copenhagen");
