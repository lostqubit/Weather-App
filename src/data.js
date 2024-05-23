const dataLoader = (() => {
    const API_KEY = "84946dd5efaa6549cfd389a8db1f602b";

    const getCurrentForecast = async (cityName,units="metric") => {
        const forecast = [];
        let error;

        try{
            const response1 = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);
            const cityDetails = await response1.json();
            
            if(!cityDetails.length){
                console.log("City Not Found!");
                return null;
            }
    
            const lat = cityDetails[0].lat;
            const lon = cityDetails[0].lon;
    
            const response2 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`);
            const data = await response2.json();
    
            if(!data.cnt){
                console.log("Something went wrong")
                return null;
            }
    
            const city = data.city.name;
            const country = data.city.country;
            const timeOffset = data.city.timezone;
    
            for(let dataItem of data.list){
                forecast.push({
                    city: city,
                    country: country,
                    timestamp: new Date((dataItem.dt + timeOffset)*1000),
                    temperature: dataItem.main,
                    weather: dataItem.weather[0],
                    wind: dataItem.wind,
                    pop: dataItem.pop,
                });
            }

            error = null; 

        } catch(e){
            error = e;
        }

        return {error,forecast};
    };

    return {getCurrentForecast};
})();

export default dataLoader;