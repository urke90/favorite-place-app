const axios = require('axios');

exports.getAddressGeoLocation = async (address) => {
    const MAPBOX_API_TOKEN = process.env.MAPBOX_API_TOKEN;

    // https://docs.mapbox.com/api/search/geocoding/

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=${MAPBOX_API_TOKEN}`;

    try {
        const result = await axios.get(url);

        const [lat, lng] = result.data.features[0].geometry.coordinates;

        return {
            lat,
            lng
        };
    } catch (error) {
        // console.log('error get geolocation', error);
    }
};
