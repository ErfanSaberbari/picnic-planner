const { getCoordinates } = require('./geocodingService');
const { getWeather } = require('./weatherService');

async function findOptimalConditions(from, to, locations) {
    let bestOptions = [];
    let bestDay = null;
    let bestLocation = null;
    let bestSunshine = -1;

    const dateRange = [];
    let currentDate = new Date(from);
    const endDate = new Date(to);

    while (currentDate <= endDate) {
        dateRange.push(currentDate.toISOString().split('T')[0]);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    for (const location of locations) {
        const coordinates = await getCoordinates(location);
        if (!coordinates) continue;

        for (const date of dateRange) {
            const weatherData = await getWeather(coordinates.lat, coordinates.lon, date);
            if (!weatherData || weatherData.length === 0) continue;

            const { wind_speed, temperature, sunshine, precipitation } = weatherData[0];

            if (
                wind_speed < 30 &&
                temperature > 0 && temperature < 30 &&
                sunshine > bestSunshine &&
                precipitation === 0
            ) {
                bestSunshine = sunshine;
                bestDay = date;
                bestLocation = location;
            }
        }
    }

    return bestDay && bestLocation ? { date: bestDay, location: bestLocation } : null;
}

module.exports = { findOptimalConditions };
