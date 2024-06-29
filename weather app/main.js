// Selecting elements from the DOM
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const notFound = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');

// Adding an event listener to the search button
search.addEventListener('click', () => {

    // API key and getting the city name from the input
    const API_KEY = '65588ed700a53542465bc60c26b17d01';
    const city = document.querySelector('.search-box input').value;

    // If the input is empty, return early
    if (city == '')
        return;

    // Fetch weather data from the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
    .then(response => response.json())
    .then(json => {

        // If the city is not found, display the not found message
        if (json.cod === '404') {
            cityHide.textContent = city;
            container.style.height = '400px';
            weatherBox.classList.remove('active');
            weatherDetails.classList.remove('active');
            notFound.classList.add('active');
            return;
        }

        // Selecting weather-related elements from the DOM
        const image = document.querySelector('.weather-box img');
        const temperature = document.querySelector('.weather-box .temperature');
        const description = document.querySelector('.weather-box .description');
        const humidity = document.querySelector('.weather-details .humidity span');
        const wind = document.querySelector('.weather-details .wind span');

        // If the city is the same as the previous search, return early
        if (cityHide.textContent == city){
            return;
        } else {
            // Update the cityHide with the new city
            cityHide.textContent = city;

            // Adjust the container height and add active classes to display weather information
            container.style.height = '555px';
            container.classList.add('active');
            weatherBox.classList.add('active');
            weatherDetails.classList.add('active');
            notFound.classList.remove('active');

            // Remove the active class from the container after 2.5 seconds
            setTimeout(() => {
                container.classList.remove('active');
            }, 2500);

            // Update the weather image based on the weather condition
            switch(json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    break;
                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;
                case 'Rain':
                    image.src = 'images/rain.png';
                    break;
                case 'Snow':
                    image.src = 'images/snow.png';
                    break;
                case 'Mist':
                    image.src = 'images/mist.png';
                    break;
                case 'Haze':
                    image.src = 'images/haze.png';
                default:
                    image.src = 'images/cloud.png';
                    break;
            }

            // Update the temperature, description, humidity, and wind elements with fetched data
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} km/h`;

            // Remove any existing cloned elements with the class 'active-clone'
            const existingClones = document.querySelectorAll('.active-clone');
            existingClones.forEach(clone => clone.remove());

            // Select the elements to be cloned
            const infoWeather = document.querySelector('.info-weather');
            const infoHumidity = document.querySelector('.info-humidity');
            const infoWind = document.querySelector('.info-wind');

            // Clone the selected elements
            const elCloneInfoWeather = infoWeather.cloneNode(true);
            const elCloneInfoHumidity = infoHumidity.cloneNode(true);
            const elCloneInfoWind = infoWind.cloneNode(true);

            // Add IDs and active-clone class to the cloned elements
            elCloneInfoWeather.id = 'clone-info-weather';
            elCloneInfoWeather.classList.add('active-clone');

            elCloneInfoHumidity.id = 'clone-info-humidity';
            elCloneInfoHumidity.classList.add('active-clone');

            elCloneInfoWind.id = 'clone-info-wind';
            elCloneInfoWind.classList.add('active-clone');

            // Insert the cloned elements into the DOM after a delay
            setTimeout(() => {
                infoWeather.insertAdjacentElement("afterend", elCloneInfoWeather);
                infoHumidity.insertAdjacentElement("afterend", elCloneInfoHumidity);
                infoWind.insertAdjacentElement("afterend", elCloneInfoWind);
            }, 2200);

            // Select all cloned elements and store the first clones
            const cloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
            const totalCloneInfoWeather = cloneInfoWeather.length;
            const cloneInfoweatherFirst = cloneInfoWeather[0];

            const cloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
            const cloneInfoHumidityFirst = cloneInfoHumidity[0];

            const cloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
            const cloneInfoWindFirst = cloneInfoWind[0];

            // If there are more than 1 clones, remove the first clone after a delay
            if (totalCloneInfoWeather > 1) {
                cloneInfoweatherFirst.classList.remove('active-clone');
                cloneInfoHumidityFirst.classList.remove('active-clone');
                cloneInfoWindFirst.classList.remove('active-clone');
                setTimeout(() => {
                    cloneInfoweatherFirst.remove();
                    cloneInfoHumidityFirst.remove();
                    cloneInfoWindFirst.remove();
                }, 2500);
            }
        }
    });
});
