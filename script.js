let weatherInput = document.getElementById("weather-input");
let searchButton = document.getElementById("search-button");

let cityName = "";
let lat = "";
let lon = "";
let unit = "metric";

const handleChange = (e) => {
  cityName = e.target.value;
};

const fetchData = async () => {
  try {
    let unit = document.getElementById("inlineRadioCelsius").checked
      ? "metric"
      : "imperial";

    let response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=1ceb37c406a9018e293772ec31d5adb2&units=${unit}`
    );
    let data = await response.json();

    if (data.cod === 200) {
      lat = data.coord.lat;
      lon = data.coord.lon;
      displayCurrentWeather(data);
    } else {
      alert("City not found");
    }
  } catch (error) {
    console.log(error);
  }
};

const displayCurrentWeather = (data) => {
  let weatherDescription = data.weather[0].description;
  let temperature = Math.round(data.main.temp);
  let feelsLike = Math.round(data.main.feels_like);
  let maxTemp = Math.round(data.main.temp_max);
  let minTemp = Math.round(data.main.temp_min);
  let iconCode = data.weather[0].icon;
  let countryCode = data.sys.country.toLowerCase();

  document.getElementById(
    "wrapper-name"
  ).innerHTML = `${data.name}, <img src="https://flagcdn.com/w20/${countryCode}.png" alt="Flag of ${data.sys.country}" style="width: 45px; height: 30px; margin-left: 5px;"/> ${data.sys.country}`;

  document.getElementById("wrapper-temp").innerHTML = `${temperature}°${
    unit === "metric" ? "C" : "F"
  }`;
  document.getElementById("wrapper-feels-like").innerHTML = `${feelsLike}°${
    unit === "metric" ? "C" : "F"
  }`;
  document.getElementById("wrapper-max-temp").innerHTML = `${maxTemp}°${
    unit === "metric" ? "C" : "F"
  }`;
  document.getElementById("wrapper-min-temp").innerHTML = `${minTemp}°${
    unit === "metric" ? "C" : "F"
  }`;
  document.getElementById("wrapper-description").innerHTML = weatherDescription;

  document.getElementById(
    "weather-icon"
  ).src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
};

weatherInput.addEventListener("input", handleChange);

searchButton.addEventListener("click", fetchData);

weatherInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchData();
  }
});

window.onload = () => {
  cityName = "Athens";
  weatherInput.value = cityName;
  fetchData();
};
