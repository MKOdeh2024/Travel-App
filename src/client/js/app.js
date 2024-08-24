const tripForm = document.getElementById('tripForm');
const resultsSection = document.getElementById('results');
const tripInfo = document.getElementById('tripInfo');
const weatherInfo = document.getElementById('weatherInfo');
const destinationImage = document.getElementById('destinationImage');


const geonamesUsername = process.env.geonamesUsername;
const weatherbitApiKey = process.env.WeatherBitApiKey;
const pixabayApiKey = process.env.pixabayApiKey;

async function handleSubmit(event) {
    event.preventDefault();

    const destination = document.getElementById('destination').value;
    const departureDate = document.getElementById('departureDate').value;

    try {
        const coordinates = await getCoordinates(destination);
        const weather = await getWeather(coordinates.lat, coordinates.lng, departureDate);
        const image = await getDestinationImage(destination);

        updateUI(destination, departureDate, coordinates, weather, image);
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    }
}

async function getCoordinates(destination) {
    const response = await fetch(`http://api.geonames.org/searchJSON?q=${destination}&maxRows=1&username=${geonamesUsername}`);
    const data = await response.json();
    if (data.geonames.length === 0) throw new Error('Location not found');
    return { lat: data.geonames[0].lat, lng: data.geonames[0].lng };
}

async function getWeather(lat, lng, date) {
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${weatherbitApiKey}`);
    const data = await response.json();
    // Find the forecast for the specific date
    const forecast = data.data.find(day => day.valid_date === date);
    return forecast || data.data[0]; // Return the first day's forecast if specific date not found
}

async function getDestinationImage(destination) {
    const response = await fetch(`https://pixabay.com/api/?key=${pixabayApiKey}&q=${destination}&image_type=photo`);
    const data = await response.json();
    return data.hits.length > 0 ? data.hits[0].webformatURL : null;
}

function updateUI(destination, date, coordinates, weather, imageUrl) {
    tripInfo.innerHTML = `
        <h3>${destination}</h3>
        <p>Departure: ${date}</p>
        <p>Coordinates: ${coordinates.lat}, ${coordinates.lng}</p>
    `;

    weatherInfo.innerHTML = `
        <h3>Weather Forecast</h3>
        <p>Temperature: ${weather.temp}°C</p>
        <p>Description: ${weather.weather.description}</p>
    `;

    if (imageUrl) {
        destinationImage.innerHTML = `<img src="${imageUrl}" alt="${destination}">`;
    } else {
        destinationImage.innerHTML = '<p>No image available for this destination.</p>';
    }

    resultsSection.classList.remove('hidden');
    resultsSection.classList.add('fadeIn');
}

tripForm.addEventListener('submit', handleSubmit);

export { handleSubmit };