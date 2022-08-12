// get all necessary elements from the DOM

const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dataOutput = document.querySelector('.data');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
let nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

// default city when the page Loads
let cityInput = "London";


addEventListener("DOMContentLoaded" , e =>{
    fetchWeatherData();
})
// Add click event to each city in our panel
cities.forEach((city)=>{
    city.addEventListener("click" , (e)=>{
        // change from default city tothe clicked one
        cityInput=e.target.innerHTML;
        // console.log(cityInput);
        nameOutput.innerHTML=cityInput;
        // function that fetch an ddisplay all datas from API
        fetchWeatherData();
        // fade out the app(simple animation)
        app.style.opacity = "0";
        // console.log(app.style.opacity)
    });
})

// Add submit event to the form

form.addEventListener('submit' ,(e) =>{
 if(search.value.length == 0){
     alert("please type in a city name !");
 }else{
     cityInput = search.value;
     //  console.log(cityInput);
     fetchWeatherData();
    //  remove all texts from input field
    search.value="";
    // fade out the app 
    app.style.opacity = 0;
 }

// prevent the refresh 
e.preventDefault();
});

/* function that returns a day of week 
(shanbe yekshanbeh , ...) from a date (12 03 2021)
we will use this function soon */
function dayOfTheWeek(day , month , year){
    const weekDay = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saterday",
    ];
    return weekDay[new Date(`${day}/${month}/${year} `).getDay()];
};

// fetch the data an ddynamickly add city name with template laters
function fetchWeatherData(){
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+cityInput+"&appid=2057b871e467fad917a864491e1991e5")
    //  take the data (witch is in JSON format)and convert to regular js object
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        // add temp and weather condition
        temp.innerHTML=((data.main.temp)-273).toFixed(0);
        conditionOutput.innerHTML=data.weather[0].description;
        
        // get date frome the city
        // 8.55
        // const d = new Date();
        // console.log(d);
        // let day = d.getDay();
        // let month = d.getMonth();
        // let year = d.getFullYear();
        // const ddd = dayOfTheWeek(day , month , year);
        // console.log(`${day}/${month}$`)
        // const iconId = data.weather[0].icon("//cdn.weatherapi.com/weather/64x64/".length);
        // icon.src = "./icons/"+iconId;
        // console.log(iconId);
        cloudOutput.innerHTML=data.clouds.all+"%";
        humidityOutput.innerHTML=data.main.humidity +"%";
        windOutput.innerHTML=data.wind.speed +"km/h";

        //set default time of day
        let time = new Date();
        
        let hover = time.getHours();
        // console.log(time);
        
        // if(6 <= hover && hover <= 20){
        //     timeOfDay = "day"
        // }else{
        //     timeOfDay="night"
        // }
        let timeOfDay = 'day';
        // console.log(timeOfDay);
        // get the uniqe code fore each weather condition
        const code = data.weather[0].id;
        // console.log(code);
        if(code == 800){
            app.style.backgroundImage =`url(./assets/images/clear-${timeOfDay}.jpg)`;
            icon.src=`/assets/icons/clear-${timeOfDay}.png`;
        }else if(code == 801 || code == 802){
            app.style.backgroundImage =`url(./assets/images/partlycloud-${timeOfDay}.jpg)`;
            icon.src=`/assets/icons/partlycloud-${timeOfDay}.png`;
        }else if(code == 804|| code == 803){
            app.style.backgroundImage =`url(./assets/images/cloud-${timeOfDay}.jpg)`;
            icon.src=`./assets/icons/cloud.png`;
        }else if(code == 805 || code == 806){
            app.style.backgroundImage =`url(./assets/images/rainy-${timeOfDay}.jpg)`;
        }
        app.style.opacity="1";
        nameOutput.innerHTML=cityInput;
    })
    .catch(()=>{
        alert("City not found , please try again");
        app.style.opacity="1";
    });
}

fetchWeatherData();
app.style.opacity = "1"







