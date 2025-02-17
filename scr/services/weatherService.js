const axios = require('axios');

const WEATHER_API = 'https://api.brightsky.dev/weather';

async function getWeather(lat, lon, date) {
    try {
        const response = await axios.get(WEATHER_API, {
            params: { lat, lon, date }
        });

        if (!response.data.weather || response.data.weather.length === 0) {
            console.warn(`No weather data available for ${lat}, ${lon} on ${date}`);
            return null;
        }

        return response.data.weather;
    } catch (error) {
        console.error(`Error fetching weather data for ${lat}, ${lon} on ${date}:`, error);
        return null;
    }
}

module.exports = { getWeather };
