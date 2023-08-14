// URL for the Buienradar.nl API for Amsterdam
const apiUrl = 'https://data.buienradar.nl/2.0/feed/json';

// Get a reference to the weather-data div
const weatherDataDiv = document.getElementById('weather-data');

// Make a GET request to the API
fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    // Extract the relevant data from the API response for Amsterdam
    const amsterdamData = data.actual.stationmeasurements.find(station => station.stationid === 6275);

    if (amsterdamData) {
      const temperature = amsterdamData.temperature;
      const feelTemperature = amsterdamData.feeltemperature;
      const groundTemperature = amsterdamData.groundtemperature;
      const sunPower = amsterdamData.sunpower;
      const rainFallLast24Hour = amsterdamData.rainFallLast24Hour;
      const windDirection = amsterdamData.winddirection;

      // Update the content of the weather-data div
      weatherDataDiv.innerHTML = `
        <p>Temperature: ${temperature} °C </p>
        <p>Feel Temperature: ${feelTemperature} °C </p>
        <p>Ground Temperature: ${groundTemperature} °C </p>
        <p>Sun Power: ${sunPower} W/m² </p>
        <p>Rain Fall Last 24 Hours: ${rainFallLast24Hour} mm </p>
        <p>Wind Direction: ${windDirection} </p>
      `;
    } else {
      weatherDataDiv.innerHTML = '<p>Weather data not available for Amsterdam</p>';
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    weatherDataDiv.innerHTML = '<p>Error fetching weather data</p>';
});