 function getWeather() {
   
   const apiKey = '110031be44423ec786740f37f7a2fd0e';
   const city = document.getElementById('city').value;
   
   if (!city) {
     alert('Please enter a city');
     return;
   }
   
   const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
   //const forecastUrl = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
   
   fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      displayWeather(data);
    })
    .catch(error => {
      console.error('Error fetching current weather data:', error);
      alert('error fetching current weather data. Please try again.');
    });
    
    /*
    fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      displayForecast(data.list);
    })
    .catch(error => {
      console.error('Error fetching  forecast data:', error);
      alert('error fetching forecast data. Please try again.');
    });
    */
 }
 
 function displayWeather(data) {
   
   const tempDivInfo = document.getElementById('temp-div');
   const weatherInfoDiv = document.getElementById('weather-info');
   const weatherIcon = document.getElementById('weather-icon');
   const forecastDiv = document.getElementById('forecast');
   const feelsLikeDiv = document.getElementById('feels-like');
   
   // Clear previous content
   weatherInfoDiv.innerHTML = '';
   forecastDiv.innerHTML = '';
   tempDivInfo.innerHTML = '';
   feelsLikeDiv.innerHTML = '';
   
   if (data.cod === '404') {
     weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
   }  else {
     
      const cityName = data.name;
      const temperature = Math.round(data.main.temp - 273.15);
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;
      const feelsLike = Math.round(data.main.feels_like - 273.15);
      const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
     
      const temperatureHTML = `
        <p>${temperature}°C</p>
        `;
        
      const feelsLikeHTML = `
        <p>Feels like ${feelsLike}°C</p>
      `;
      
      const weatherHTML = `
        <p>${cityName}</p>
        <p>${description}</p>
      `;
        
      tempDivInfo.innerHTML = temperatureHTML;
      weatherInfoDiv.innerHTML = weatherHTML;
      feelsLikeDiv.innerHTML = feelsLikeHTML
      weatherIcon.src = iconUrl;
      weatherIcon.alt = description;
      
      showImage();
   }
 }
 
 /*
 function displayForecast(forecastData) {
   
    const forecastDiv = document.getElementById('forecast');
    const next24Hours = forecastData.slice(0, 8);
    
   
    next24Hours.forEach(item => {
      const dateTime = new Date(item.dt * 1000);
      const hour = dateTime.getHours();
      const temperature = Math.round(item.main.temp - 273.25);
      const iconCode = item.weather[0].icon;
      const iconUrl = `https.openweathermap.org/img/wn/${iconCode}.png`;
      
      const forecastItemHtml = `
        <div class="forecast-item">
          <span>${hour}:00</span>
          <img src="${iconUrl}" alt="Hourly Weather Icon">
          <span>${temperature}°C</span>
        </div>
      `;
      forecastDiv.innerHTML += forecastItemHtml;
      
    });
 }
 */
 
 function showImage() {
   
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
    
 }