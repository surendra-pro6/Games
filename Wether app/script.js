const inputbox = document.querySelector('.inputbox');
const searchbtn = document.getElementById('searchbtn');
const weather_img = document.querySelector('.weather-image');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humiditys');
const Wind_speed = document.getElementById('Wind-speed');
const locatio_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');
const rain = new Audio('rain.mp3');
const backgroundimg = document.querySelector('.backgroundimg');

let DATE= new Date();
let hh =DATE.getHours();
console.log(hh);

async function checkweather(city){
    const api_key = "f81c500a5d076d7ef519183d1c0595b7";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;

    const weather_data = await fetch(url).then(Response => Response.json()); 
    console.log(weather_data);

    if(weather_data.cod === 404){
        locatio_not_found.Style.display = "flex";
        weather_body.Style.display = "none";
        return;
    }
    locatio_not_found.style.display = "none";
    weather_body.style.display = "flex";
    temperature.innerHTML = `${Math.round(weather_data.main.temp-273.15)}°C`;
    description.innerHTML = `${weather_data.weather[0].description}`;
    humidity.innerHTML = `${weather_data.main.humidity}%`;
    Wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

    switch(weather_data.weather[0].main){
        case 'Clouds' : 
            if((hh >= 0 && hh <7) || hh >17 ){
                backgroundimg.src = "/Project/Wether app/small image/night.jpg";
                weather_img.src = "/Project/Wether app/assists/nightHaze.png";
            }else{
                backgroundimg.src = "/Project/Wether app/small image/clear.jpg";
                weather_img.src = "/Project/Wether app/assists/cloud.png";
            }

            break;
        case 'Clear': 
            if((hh >= 0 && hh <7) || hh >17 ){
                weather_img.src = "/Project/Wether app/assists/night.png";
                backgroundimg.src = "/Project/Wether app/small image/night.jpg";

            }else{
                weather_img.src = "/Project/Wether app/assists/clear.png";
                backgroundimg.src = "/Project/Wether app/small image/clear.jpg";
            }
            break;
        case 'Rain' : 
            rain.play();
            backgroundimg.src = "/Project/Wether app/small image/rain.jpg";
            weather_img.src = "/Project/Wether app/assists/rain.png";
            break;
        case 'Mist' : 
            weather_img.src = "/Project/Wether app/assists/mist.png";
            backgroundimg.src = "/Project/Wether app/small image/clear.jpg";
            break;
        case 'Snow' : 
            backgroundimg.src = "/Project/Wether app/small image/snow.jpg";
            weather_img.src = "/Project/Wether app/assists/snow.png";
            break;

    }

    
}

searchbtn.addEventListener('click',()=>{
    rain.pause();
    checkweather(inputbox.value);
});
