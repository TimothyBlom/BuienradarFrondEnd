// URL for the Buienradar.nl API for Amsterdam
const apiUrl = 'https://data.buienradar.nl/2.0/feed/json';

// Get a reference to the weather-data div
const weatherDataDiv = document.getElementById('weather-data');

// Weather information details with labels, IDs, and units
const weatherInfo = [
    { label: 'Temperature', id: 'temperature' },
    { label: 'Feel Temperature', id: 'feeltemperature' },
    { label: 'Ground Temperature', id: 'groundtemperature' },
    { label: 'Sun Power', id: 'sunpower' },
    { label: 'Rain Fall Last 24 Hours', id: 'rainFallLast24Hour' },
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
        // Extract the relevant data for Amsterdam
        const amsterdamData = data.actual.stationmeasurements.find(station => station.stationid === 6391);
        if (amsterdamData) {
            updateWeatherData(amsterdamData);
        } else {
            handleError('Data not available for Arcen');
        }
    })
    .catch(handleError);




// // URL for the Buienradar.nl API for Amsterdam
// const apiUrl = 'https://data.buienradar.nl/2.0/feed/json';

// // Get a reference to the weather-data div
// const weatherDataDiv = document.getElementById('weather-data');

// // Make a GET request to the API
// fetch(apiUrl)
//   .then(response => response.json())
//   .then(data => {
//     // Extract the relevant data from the API response for Amsterdam
//     const amsterdamData = data.actual.stationmeasurements.find(station => station.stationid === 6275);

//     if (amsterdamData) {
//       const temperature = amsterdamData.temperature;
//       const feelTemperature = amsterdamData.feeltemperature;
//       const groundTemperature = amsterdamData.groundtemperature;
//       const sunPower = amsterdamData.sunpower;
//       const rainFallLast24Hour = amsterdamData.rainFallLast24Hour;
//       const windDirection = amsterdamData.winddirection;

//       // Update the content of the weather-data div
//       weatherDataDiv.innerHTML = `
//         <p>Temperature: ${temperature} </p>
//         <p>Feel Temperature: ${feelTemperature} </p>
//         <p>Ground Temperature: ${groundTemperature} </p>
//         <p>Sun Power: ${sunPower} </p>
//         <p>Rain Fall Last 24 Hours: ${rainFallLast24Hour} </p>
//         <p>Wind Direction: ${windDirection} </p>
//       `;
//     } else {
//       weatherDataDiv.innerHTML = '<p>Weather data not available for Amsterdam</p>';
//     }
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//     weatherDataDiv.innerHTML = '<p>Error fetching weather data</p>';
// });