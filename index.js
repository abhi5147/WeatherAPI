const currDay = new Date().getDay();
const currTime = new Date().toLocaleTimeString();
const currDate = new Date().getDate();
const currMonth = new Date().getMonth();

const dayList = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


let weather = {
  apiKey: "0da994a0081f0c313d5a692e9543e514",
  fetchWeather: function (city) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=0da994a0081f0c313d5a692e9543e514`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => this.displayWeather(data));
  },
  displayWeather: function (data) {

    if (!data.name) {
      document.getElementById('errorMsg').style.display = 'block';
      document.getElementById('info').style.display = 'none';
    }
    else {
      document.getElementById('errorMsg').style.display = 'none';
      document.getElementById('info').style.display = 'block';
      document.getElementById('cityName').innerHTML = data.name;
      document.getElementById('date').innerHTML = `${dayList[currDay]} | ${monthList[currMonth]} ${currDate} | ${currTime}`
      document.getElementById('temp').innerHTML = data.main.temp + "°Cel";
      document.querySelector(".description").innerText = data.weather[0].description;
      document.querySelector(".humidity").innerText ="Humidity: " + data.main.humidity + "%";
      document.querySelector(".wind").innerText ="Wind speed: " + data.wind.speed + " km/h";
      document.getElementById('tempmin_max').innerHTML = `Min : ${data.main.temp_min}°Cel | Max : ${data.main.temp_max}°Cel`;

      if (data.weather[0].main == "clear" || data.weather[0].main == "Clear") {
        document.getElementById('weatherclr').style.color = '#eccc68';
      }
      else if (data.weather[0].main == "haze" || data.weather[0].main == "Haze") {
        document.getElementById('weatherclr').style.color = '#E0DED7';
      }
      else {
        document.getElementById('weatherclr').style.color = '#44c3de';
      }
    }

  },
  search: function () {
    this.fetchWeather(document.querySelector(".inputField").value);
  },
};

document.querySelector(".fa-search").addEventListener("click", function () {
  weather.search();
});

document.querySelector(".inputField").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

weather.fetchWeather("Patna");
