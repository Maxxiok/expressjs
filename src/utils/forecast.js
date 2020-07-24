const axios = require('axios');

const weather = async (lat, lon) => {
    query = lat+','+lon
    const resp = await axios.get('http://api.weatherstack.com/current?access_key=751671f19fd30f5eb5a82b88d8eb8485&query="'+query+'"')
        .catch((e)=>{
            return {error: e.message};
        });;
    if (resp && !resp.data.error) {
        return { forecast: resp.data.current.weather_descriptions[0] + '. It is currently ' + resp.data.current.temperature + ' degrees out. It feels like '
            + resp.data.current.feelslike + ' degrees out.'};
    } else {
        return {error: 'Cannot find forecast!'};
    }
};

module.exports=weather;
