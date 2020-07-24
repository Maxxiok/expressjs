const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const locationP = document.querySelector('#location');
const forecastP = document.querySelector('#forecast');

const getWeather = (loc) => {
    forecastP.textContent = '';
    locationP.textContent = 'Loading...';
    fetch('http://localhost:3000/weather?address='+loc).then((resp)=>{
        resp.json().then((data)=>{
            if (!data.error) {
                forecastP.textContent = data.forecast;
                locationP.textContent = data.location;
            } else {
                forecastP.textContent = ''
                locationP.textContent = data.error;
            }
        });
    });
};

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    getWeather(search.value);
});
