const WEATHERAPI_KYE = 'f07dc1cfcb032f4412639712c02a6176';
const COORDS = 'coords'
const weather = document.querySelector('.js-weather');

function getWeather(latitude, longitude) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${WEATHERAPI_KYE}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const tem = json.main.temp;
        const name = json.name;
        let icon = json.weather[0].icon;
        icon = `http://openweathermap.org/img/w/${icon}.png`;
        weather.style.backgroundImage = `url(${icon})`;
        weather.innerText = `${tem}°C  @${name}`;
    });
}

function savedCoords(coordsObj) {
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucess(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    }  
    savedCoords(coordsObj); 
    getWeather(latitude, longitude); 
}

function handleGeoError() {
    console.log('nono');  
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(handleGeoSucess, handleGeoError);
}

function loadCoords() {
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        //위치 가져오기 
        getLocation();
    }else{
        //  날씨 가져오기
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude);
    }
}
function init() {
    loadCoords();
}
init();