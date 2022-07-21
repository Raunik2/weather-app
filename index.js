const app = document.querySelector(".weather-app");
const temp = document.querySelector(".temp");
const feelsLike = document.querySelector(".fltemp")
const dateOut = document.querySelector(".date");
const timeOut = document.querySelector(".time");
const conditionOut = document.querySelector(".condition")
const nameOut = document.querySelector(".name")
const icon = document.querySelector(".icon")
const cloudOut = document.querySelector(".cloud")
const humidityOut = document.querySelector(".humidity")
const pressure = document.querySelector(".pressure")
const windOut = document.querySelector(".wind")
const form = document.querySelector("#locationinput")
const search = document.querySelector(".search")
const btn = document.querySelector(".submit")
const cities = document.querySelectorAll(".city")
const currtime = document.querySelector(".currtime")



let cityIn = "Patna";


cities.forEach(element => {
  element.addEventListener("click", (e) => {
    cityIn = e.target.innerHTML;

    fetchWeather();

    // app.getElementsByClassName.opacity = '0'

  });
});

form.addEventListener("submit", (e) => {
  if (search.value.length === 0) alert("Please a city name");
  else {
    cityIn = search.value;
    fetchWeather();
    search.value = "";
    // app.style.opacity="0"
  }
  e.preventDefault();
})


function zone(bruh) {
  let d = new Date()
  let localTime = d.getTime()
  let localOffset = d.getTimezoneOffset() * 60000
  let utc = localTime + localOffset
  let atlanta = utc + (1000 * bruh);
  let today = new Date(atlanta)
  return today;
}

function day(today) {
  const options = {
    weekday: "long",
    day: "numeric",
    month: "long",
  }
  return today.toLocaleDateString("en-US", options);
}

function fetchWeather() {
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + cityIn + "&units=metric&appid=0b591b90d1044b39a34eed816d49cda9#")
    .then(response => response.json())
    .then(data => {
      console.log(data);
      var tmp = String(data.main.temp);
      temp.innerHTML = tmp.slice(0, 4) + "&#176;";
      let condition = data.weather[0].main;
      conditionOut.innerHTML = condition;

      nameOut.innerHTML = data.name;
      icon.src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";

      cloudOut.innerHTML = data.clouds.all + "%";
      humidityOut.innerHTML = data.main.humidity + "%";
      windOut.innerHTML = String(Number(data.wind.speed) * 3.6).slice(0, 4) + " kmph";
      pressure.innerHTML = String((data.main.pressure) / 1013.25).slice(0, 5) + " atm";
      feelsLike.innerHTML = data.main.feels_like + "&#176;";

      let zoneValue = zone(data.timezone);
      let hrs = zoneValue.getHours();
      let min = zoneValue.getMinutes();
      dateOut.innerHTML = day(zoneValue);

      if (hrs > 5 && hrs < 18) {
        if (condition === "Clear") {
          app.style.backgroundImage = 'url("./images/day/clear.jpg")';
          btn.style.background = "#e5ba92";
        } else if (condition === "Rain" || condition === "Drizzle") {
          app.style.backgroundImage = 'url("./images/day/rain.jpg")';
          btn.style.background = "#647d75";
        } else if (condition === "Thunderstorm") {
          app.style.backgroundImage = 'url("./images/day/thunder.jpg")';
          btn.style.background = "#647d75";
        } else if (condition === "Snow") {
          app.style.backgroundImage = 'url("./images/day/snow.jpg")';
          btn.style.background = "#4d72aa";
        } else if (condition === "Haze") {
          app.style.backgroundImage = 'url("./images//day/haze.jpg")';
        } else if (condition === "Mist") {
          app.style.backgroundImage = 'url("./images/day/mist.jpg")';
          btn.style.background = "#e5ba92";
        } else {
          app.style.backgroundImage = 'url("./images/day/clouds.jpg")';
          btn.style.background = "#fa6d1b";
        }

      } else {
        if (condition === "Clear") {
          app.style.backgroundImage = 'url("./images/night/clear.jpg")';
          btn.style.background = "#181e27";
        } else if (condition === "Rain" || condition === "Drizzle") {
          app.style.backgroundImage = 'url("./images/night/rain.jpg")';
          btn.style.background = "#325c80";
        } else if (condition === "Thunderstorm") {
          app.style.backgroundImage = 'url("./images/night/thunder.jpg")';
          btn.style.background = "#325c80";
        } else if (condition === "Snow") {
          app.style.backgroundImage = 'url("./images/night/snow.jpg")';
          btn.style.background = "#1b1b1b";
        } else if (condition === "Haze" || condition === "Mist") {
          app.style.backgroundImage = 'url("./images/night/haze.jpg")';
          btn.style.background = "#181e27";
        } else {
          app.style.backgroundImage = 'url("./images/night/clouds.jpg")';
          btn.style.background = "#181e27";
        }
      }

      let ampm = "AM";
      if (hrs >= 12) ampm = "PM"
      if (hrs > 12) hrs -= 12;
      if (hrs < 10) hrs = "0" + hrs;
      if (min < 10) min = "0" + min;

      currtime.innerHTML = hrs + ":" + min + " " + ampm;

      // app.style.opacity="1";
    })

    .catch(() => {
      alert("City Not Found Please Try Again");
      // app.style.opacity="1";
    });
}

fetchWeather();
// app.style.opacity="1";