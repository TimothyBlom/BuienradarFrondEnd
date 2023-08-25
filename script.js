const apiUrl = 'https://data.buienradar.nl/2.0/feed/json';

// Get a reference to the weather-data div
const weatherDataDiv = document.getElementById('weather-data');

// Weather information details
const weatherInfo = [
    { label: 'Temperature', id: 'temperature' },
    { label: 'Feel Temperature', id: 'feeltemperature' },
    { label: 'Ground Temperature', id: 'groundtemperature' },
    { label: 'Sun Power', id: 'sunpower' },
    { label: 'Rain Fall Last Hour', id: 'rainFallLastHour', unit: 'mm'},
    { label: 'Wind Direction', id: 'winddirection' }
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
        // Extract the relevant data
        const amsterdamData = data.actual.stationmeasurements.find(station => station.stationid === 6391);
        if (amsterdamData) {
            updateWeatherData(amsterdamData);
        } else {
            handleError('Data not available for Arcen');
        }
    })
    .catch(handleError);