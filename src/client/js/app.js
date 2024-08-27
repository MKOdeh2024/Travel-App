const geonamesURL = 'http://api.geonames.org/searchJSON?q=';
const geonamesKey = process.env.GEONAMES_USERNAME;
const weatherbitURL = 'https://api.weatherbit.io/v2.0/forecast/daily?';
const weatherbitKey = process.env.WEATHERBIT_API_KEY;
const pixabayURL = 'https://pixabay.com/api/?key=';
const pixabayKey = process.env.PIXABAY_API_KEY;

const tripData = {};

export const handleSubmit = async (event) => {
    event.preventDefault();
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('date').value;

    if (destination && date) {
        try {
            const geoData = await getGeoData(destination);
            const weatherData = await getWeatherData(geoData.lat, geoData.lng, date);
            const imageData = await getImageData(destination);
            
            updateUI(geoData, weatherData, imageData, date);
        } catch (error) {
            console.error('Error:', error);
        }
    } else {
        alert('Please enter both a destination and a date.');
    }
}

const getGeoData = async (city) => {
    const response = await fetch(`${geonamesURL}${city}&maxRows=1&username=${geonamesKey}`);
    const data = await response.json();
    return data.geonames[0];
}

const getWeatherData = async (lat, lon, date) => {
    const response = await fetch(`${weatherbitURL}lat=${lat}&lon=${lon}&key=${weatherbitKey}`);
    const data = await response.json();
    return data.data.find(day => day.valid_date === date);
}

const getImageData = async (city) => {
    const response = await fetch(`${pixabayURL}${pixabayKey}&q=${city}&image_type=photo`);
    const data = await response.json();
    return data.hits[0];
}

const updateUI = (geoData, weatherData, imageData, date) => {
    document.getElementById('results').innerHTML = `
        <h2>Trip to ${geoData.name}, ${geoData.countryName}</h2>
        <p>Departing: ${date}</p>
        <p>Weather: ${weatherData.temp}°C, ${weatherData.weather.description}</p>
        <img src="${imageData.webformatURL}" alt="${geoData.name}">
    `;
}