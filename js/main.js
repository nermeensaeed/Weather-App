let api_key = "c114786beda043fbbfb120956240506"

let search = document.getElementById("search")
let submit = document.getElementById("submit")
let forecast = document.getElementById("forecast")
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

async function getforecast(city){
    let res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${api_key}&q=${city}&days=3&aqi=no&alerts=no`)
    let final = await res.json()
    let date = new Date()
    let day = days[date.getDay()]
    let day1
    let day2
    switch (day) {
        case "Sunday":
            day1="Monday"
            day2 = "Tuesday"
            break;
        case "Monday":
            day1="Tuesday"
            day2 = "Wednesday"
            break;
        case "Tuesday":
            day1="Wednesday"
            day2 = "Thursday"
            break;
        case "Wednesday":
            day1="Thursday"
            day2 = "Friday"
            break;
        case "Thursday":
            day1="Friday"
            day2 = "Saturday"
            break;
        case "Friday":
            day1="Saturday"
            day2 = "Sunday"
            break;
        case "Saturday":
            day1="Sunday"
            day2 = "Monday"
            break;
        default:
            break;
    }
    let month = months[date.getMonth()]
    forecast.innerHTML=`
    <div class="today forecast">
        <div class="forecast-header" id="today">
        <div class="day">${day}</div>
        <div class=" date">${date.getDate()}${month}</div>
        </div> 
        <div class="forecast-content" id="current">
        <div class="location">${final.location.name}</div>
        <div class="degree">
            <div class="num">${final.current.temp_c}<sup>o</sup>C</div>
        
            <div class="forecast-icon">
                <img src="${final.current.condition.icon}" alt="" width="90">
            </div>	
        
        </div>
        <div class="custom">${final.current.condition.text}</div>
        <span><img src="https://routeweather.netlify.app/images/icon-umberella@2x.png" alt="" width="21" height="21">${final.current.humidity}%</span>
                                    <span><img src="https://routeweather.netlify.app/images/icon-wind@2x.png" alt="" width="23" height="21">${final.current.wind_kphx}km/h</span>
                                    <span><img src="https://routeweather.netlify.app/images/icon-compass@2x.png" alt="" width="21" height="21">East</span>
        </div>
    </div>	
    <div class="forecast">
        <div class="forecast-header">
            <div class="day">${day1}</div>
        </div> 
        <div class="forecast-content">
            <div class="forecast-icon">
                <img src="${final.forecast.forecastday[1].day.condition.icon}" alt="" width="48">
            </div>
            <div class="degree">${final.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
            <small>${final.forecast.forecastday[1].day.mintemp_c}<sup>o</sup></small>
            <div class="custom">${final.forecast.forecastday[1].day.condition.text}</div>
        </div>
    </div>	
    <div class="forecast">
        <div class="forecast-header">
            <div class="day">${day2}</div>
        </div> 
        <div class="forecast-content">
            <div class="forecast-icon">
                <img src="${final.forecast.forecastday[2].day.condition.icon}" alt="" width="48">
            </div>
            <div class="degree">${final.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</div>
            <small>${final.forecast.forecastday[2].day.mintemp_c}<sup>o</sup></small>
            <div class="custom">${final.forecast.forecastday[2].day.condition.text}</div>
        </div>
    </div>
    `
} 
getforecast("London")  
search.addEventListener("input" , function(e){
    getforecast(e.target.value)
})
submit.addEventListener("click" , function(){
    getforecast(search.value)
})