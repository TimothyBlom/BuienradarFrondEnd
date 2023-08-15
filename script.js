// URL for the Buienradar.nl API for Amsterdam
const apiUrl = 'https://data.buienradar.nl/2.0/feed/json';

// Get a reference to the weather-data div
const weatherDataDiv = document.getElementById('weather-data');

// Weather information details with labels, IDs, and units
const weatherInfo = [
    { label: 'Temperature', id: 'temperature', unit: '°C' },
    { label: 'Feel Temperature', id: 'feel-temperature', unit: '°C' },
    { label: 'Ground Temperature', id: 'ground-temperature', unit: '°C' },
    { label: 'Sun Power', id: 'sun-power', unit: 'W/m²' },
    { label: 'Rain Fall Last 24 Hours', id: 'rain-fall', unit: 'mm' },
    { label: 'Wind Direction', id: 'wind-direction' }
];

// Function to update weather data in the UI
function updateWeatherData(data) {
    weatherInfo.forEach(item => {
        const span = document.getElementById(item.id);
        if (span) {
            const value = data[item.id] || 'N/A';
            span.textContent = value + (item.unit || '');
        }
    });
}

// Function to handle errors and update UI accordingly
function handleError(error) {
    console.error('Error fetching data:', error);
    weatherInfo.forEach(item => {
        const span = document.getElementById(item.id);
        if (span) {
            span.textContent = 'Error';
        }
    });
}

// Fetch weather data from the API
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Extract the relevant data for Amsterdam
        const amsterdamData = data.actual.stationmeasurements.find(station => station.stationid === 6275);
        if (amsterdamData) {
            updateWeatherData(amsterdamData);
        } else {
            handleError('Data not available for Amsterdam');
        }
    })
    .catch(handleError);