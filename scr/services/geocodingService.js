const axios = require('axios');

const GEOCODING_API = 'https://nominatim.openstreetmap.org/search';

async function getCoordinates(location) {
    try {
        const response = await axios.get(GEOCODING_API, {
            params: {
                q: location.trim(),
                format: 'json',
                limit: 1
            }
        });

        if (response.data.length === 0) throw new Error('Location not found');

        return { lat: response.data[0].lat, lon: response.data[0].lon };
    } catch (error) {
        console.error(`Error fetching coordinates for ${location}:`, error.message);
        return null;
    }
}

module.exports = { getCoordinates };
