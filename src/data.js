import {addSeconds} from "date-fns"

const dataLoader = (() => {
    const API_KEY = "84946dd5efaa6549cfd389a8db1f602b";

    const getCurrentForecast = async (cityName,units="metric") => {
        let error;
        let currentWeather;
        const forecast = [];

        try{
            const response1 = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);
            const cityDetails = await response1.json();
            
            if(!cityDetails.length){
                console.log("City Not Found!");
                return null;
            }
    
            const lat = cityDetails[0].lat;
            const lon = cityDetails[0].lon;
            
            const response2 = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
            const currentData = await response2.json();

            if(!currentData.weather.length){
                console.log("Something went wrong");
                return null;
            }

            const response3 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`);
            const data = await response3.json();
    
            if(!data.cnt){
                console.log("Something went wrong");
                return null;
            }
    
            const city = data.city.name;
            const country = data.city.country;
            const timeOffset = data.city.timezone;

            const currentTime = new Date(currentData.dt*1000);

            currentWeather = {
                city: city,
                country: country,
                timestamp: addSeconds(currentTime,currentTime.getTimezoneOffset()*60+timeOffset),
                temperature: currentData.main,
                weather: currentData.weather[0],
                wind: currentData.wind,
                pop: currentData.pop,
                visibility: currentData.visibility,
            };
    
            for(let dataItem of data.list){
                const time = new Date(dataItem.dt*1000);
                forecast.push({
                    city: city,
                    country: country,
                    timestamp: addSeconds(time,time.getTimezoneOffset()*60+timeOffset),
                    temperature: dataItem.main,
                    weather: dataItem.weather[0],
                    wind: dataItem.wind,
                    pop: dataItem.pop,
                    visibility: dataItem.visibility,
                });
            }

            error = null; 

        } catch(e){
            error = e;
        }

        return {error,currentWeather,forecast};
    };

    return {getCurrentForecast};
})();

export default dataLoader;