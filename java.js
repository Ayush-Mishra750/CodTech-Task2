// const container =documment.querySelector('.container');
// const search =documment.querySelector('.search-box button');
// const weatherBox =documment.querySelector('.weather-box');
// const weatherDetails=documment.querySelector('.weather-details');

// search.addEventListener('click', () =>{

// const  APIKey = 'ee62d145fa15864f8c45fc40aa2ff758';

// const city =document.querySelector('.search-box input').value;

// if (city == '')
//     return;
// fetch(' https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}')
// .then(response =>response.json()).then(json => {
//     const image = document.querySelector('.weather-box img');
//     const temperature = document.querySelector('.weather-box .temperature');
//     const description = document.querySelector('.weather-box .description');
//     const humidity = document.querySelector('.weather-details .humidity span');
//     const wind = document.querySelector('.weather-details .wind span');

//     switch (json.weather[0].main){
//         case 'Clear':
//             image.src = 'images/cloudy(1).png';
//               break;
//         case 'Rain':
//                 image.src = 'images/cloudy(2).png';
//                   break;
//          case 'Snow':
//                     image.src = 'images/cloudy.png';
//                       break;
//         case 'Clouds':
//                         image.src = 'images/sun.png';
//                           break;
//         case 'mist':
//                             image.src = 'images/weather.png';
//                               break;
//         case 'Haze':
//                                 image.src = 'images/sun.png';
//                                   break;
//             default:
//                 image.src ='images/weather.png' ; 
//               }

//               temperature.innerHTML = '${parseInt(json.main.temp)}<span>C</span>';
//               description.innerHTML ='${json.weather[0].description}';
//               humidity.innerHTML ='${json.main.humidity}%';
//               wind.innerHTML='${parseInt(json.wind.speed)}km/h';
// });

// });
function getWeather() {
  const apiKey = '6dc1c577551e7d0f344c7590eefeb077';
  const city = document.getElementById('city').value;

  if (!city) {
      alert('Please enter a city');
      return;
  }

  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

  fetch(currentWeatherUrl)
      .then(response => response.json())
      .then(data => {
          displayWeather(data);
      })
      .catch(error => {
          console.error('Error fetching current weather data:', error);
          alert('Error fetching current weather data. Please try again.');
      });

  fetch(forecastUrl)
      .then(response => response.json())
      .then(data => {
          displayHourlyForecast(data.list);
      })
      .catch(error => {
          console.error('Error fetching hourly forecast data:', error);
          alert('Error fetching hourly forecast data. Please try again.');
      });
}

function displayWeather(data) {
  const tempDivInfo = document.getElementById('temp-div');
  const weatherInfoDiv = document.getElementById('weather-info');
  const weatherIcon = document.getElementById('weather-icon');
  const hourlyForecastDiv = document.getElementById('hourly-forecast');

  // Clear previous content
  weatherInfoDiv.innerHTML = '';
  hourlyForecastDiv.innerHTML = '';
  tempDivInfo.innerHTML = '';

  if (data.cod === '404') {
      weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
  } else {
      const cityName = data.name;
      const temperature = Math.round(data.main.temp - 273.15); // Convert to Celsius
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

      const temperatureHTML = `
          <p>${temperature}°C</p>
      `;

      const weatherHtml = `
          <p>${cityName}</p>
          <p>${description}</p>
      `;

      tempDivInfo.innerHTML = temperatureHTML;
      weatherInfoDiv.innerHTML = weatherHtml;
      weatherIcon.src = iconUrl;
      weatherIcon.alt = description;

      showImage();
  }
}

function displayHourlyForecast(hourlyData) {
  const hourlyForecastDiv = document.getElementById('hourly-forecast');

  const next24Hours = hourlyData.slice(0, 8); // Display the next 24 hours (3-hour intervals)

  next24Hours.forEach(item => {
      const dateTime = new Date(item.dt * 1000); // Convert timestamp to milliseconds
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp - 273.15); // Convert to Celsius
      const iconCode = item.weather[0].icon;
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

      const hourlyItemHtml = `
          <div class="hourly-item">
              <span>${hour}:00</span>
              <img src="${iconUrl}" alt="Hourly Weather Icon">
              <span>${temperature}°C</span>
          </div>
      `;

      hourlyForecastDiv.innerHTML += hourlyItemHtml;
  });
}

function showImage() {
  const weatherIcon = document.getElementById('weather-icon');
  weatherIcon.style.display = 'block'; // Make the image visible once it's loaded
}
