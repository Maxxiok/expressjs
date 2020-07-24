const axios = require('axios');
const forecast = require('./forecast');

const location = async (address) => {
    const resp = await axios.get('https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoibWF4eGlvayIsImEiOiJja2NsMHo3Z2EweHo2MnBsOTE4emhjdjZuIn0.S5BUyHorYkbLu6D1HbH0eA')
        .catch((e)=>{
            return {error: e.message};
        });
    if (resp && resp.data.features[0]){
        const forecastData = await forecast(resp.data.features[0].center[1], resp.data.features[0].center[0]);
        return {forecast: forecastData.forecast, location: resp.data.features[0].place_name}
    } else {
        return {error: 'Cannot find location!'};
    }
};

module.exports = location;
