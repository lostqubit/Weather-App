import dataLoader from './data.js';
import reloadIcon from './icons/reload.svg';
import rainIcon from './icons/rain.svg';
import windIcon from './icons/wind.svg';

const display = (() => {
    const container = document.querySelector("#content-body");
    
    const loadAnimation = () => {
        const div = document.createElement("div");
        div.classList.add("loader");
        container.innerHTML = "";
        container.appendChild(div);
    };

    const stopAnimation = () => {
        document.querySelector(".loader").remove();
    }

    const renderCurrentWeather = (currentWeather,currentPop) => {
        const wrapperDiv = document.createElement("div");
        wrapperDiv.classList.add("current-card");

        const card = document.createElement("div");
        card.classList.add("card-contents");
        
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        const h4 = document.createElement("h4");
        h4.innerText = "Current weather";
        const time = document.createElement("p");
        const currentTime = currentWeather.timestamp.split(" ")[4].split(":").slice(0,2);
        time.innerText = currentTime[0]+":"+currentTime[1];
        div2.appendChild(h4);
        div2.appendChild(time);
        const reloadButton = document.createElement("img");
        reloadButton.id = "reload-btn";
        reloadButton.src = reloadIcon;
        div1.appendChild(div2);
        div1.appendChild(reloadButton)
        card.appendChild(div1);

        const div3 = document.createElement("div");
        div3.id = "current-temperature";
        const currentIcon = document.createElement("img");
        currentIcon.id = "currentWeather-icon";
        currentIcon.src = `https://openweathermap.org/img/wn/${currentWeather.weather.icon}@2x.png`
        const div4 = document.createElement("div");
        const h1 = document.createElement("h1");
        //h1.innerText = currentWeather.main.temp;
        h1.innerText = currentWeather.temperature.temp;
        const h2 = document.createElement("h2");
        h2.innerText = "\u00B0C";
        const div5 = document.createElement("div");
        const weather = document.createElement("h3");
        weather.innerText = currentWeather.weather.main[0].toUpperCase() + currentWeather.weather.main.slice(1);
        const feelsLike = document.createElement("p");
        //feelsLike.innerText = `Feels like ${currentWeather.main.feels_like}`;
        feelsLike.innerText = `Feels like ${currentWeather.temperature.feels_like}\u00B0`;
        div5.appendChild(weather);
        div5.appendChild(feelsLike);
        div4.appendChild(h1);
        div4.appendChild(h2);
        div3.appendChild(currentIcon);
        div3.appendChild(div4);
        div3.appendChild(div5);
        card.appendChild(div3);

        const description = document.createElement("p");
        description.id = "description";
        description.innerText = currentWeather.weather.description[0].toUpperCase() + currentWeather.weather.description.slice(1);
        description.innerText += `. The Low will be ${currentWeather.temperature.temp_min}\u00B0C`
        card.appendChild(description)

        const dataDiv = document.createElement("div");
        dataDiv.id = "data";

        const windSpeedDiv = document.createElement("div");
        const windSpeedHeading = document.createElement("h4")
        windSpeedHeading.innerText = "Wind"
        const windSpeed = document.createElement("p");
        windSpeed.innerText = `${currentWeather.wind.speed} m/s`;
        windSpeedDiv.appendChild(windSpeedHeading);
        windSpeedDiv.appendChild(windSpeed);
        dataDiv.appendChild(windSpeedDiv);

        const humidityDiv = document.createElement("div");
        const humidityHeading = document.createElement("h4");
        humidityHeading.innerText = "Humidity";
        const humidity = document.createElement("p");
        humidity.innerText = `${currentWeather.temperature.humidity}%`;
        humidityDiv.appendChild(humidityHeading);
        humidityDiv.appendChild(humidity);
        dataDiv.appendChild(humidityDiv);

        const visibilityDiv = document.createElement("div");
        const visibilityHeading = document.createElement("h4");
        visibilityHeading.innerText = "Visibility";
        const visibility = document.createElement("p");
        visibility.innerText = `${currentWeather.visibility/1000} km`;
        visibilityDiv.appendChild(visibilityHeading);
        visibilityDiv.appendChild(visibility);
        dataDiv.appendChild(visibilityDiv);

        const pressureDiv = document.createElement("div");
        const pressureHeading = document.createElement("h4");
        pressureHeading.innerText = "Pressure";
        const pressure = document.createElement("p");
        pressure.innerText = `${currentWeather.temperature.pressure} mb`;
        pressureDiv.appendChild(pressureHeading);
        pressureDiv.appendChild(pressure);
        dataDiv.appendChild(pressureDiv);

        const popDiv = document.createElement("div");
        const popHeading = document.createElement("h4");
        popHeading.innerText = "Chance of rain";
        const pop = document.createElement("p");
        pop.innerText = `${currentPop*100}%`;
        popDiv.appendChild(popHeading);
        popDiv.appendChild(pop);
        dataDiv.appendChild(popDiv);

        card.appendChild(dataDiv);
        wrapperDiv.appendChild(card);

        return wrapperDiv;
    }

    const renderForecast = (currentWeather, forecasts) => {
        const currentPop = forecasts[0].pop;

        const heading1 = document.createElement("h3");
        heading1.innerText = `${forecasts[0].city}, ${forecasts[0].country}`
        
        const currentContent = renderCurrentWeather(currentWeather,currentPop);

        const heading2 = document.createElement("h3");
        heading2.innerText = "Forecast";

        const forecastContent = document.createElement("div");
        forecastContent.classList.add("forecast-card");
        const content = document.createElement("div");
        content.id = "forecast-content";

        const nav = document.createElement("div");
        const hourlyTab = document.createElement("p");
        hourlyTab.innerText = "Hourly";
        const dailyTab = document.createElement("p");
        dailyTab.innerText = "Daily";
        nav.appendChild(hourlyTab);
        nav.appendChild(dailyTab);
        content.appendChild(nav);

        const dataDiv = document.createElement("div");
        dataDiv.id = "forecast-data";
        
        for(let i=0;i<5;i++){
            const div = document.createElement("div");
            const weatherIcon = document.createElement("img");
            weatherIcon.classList.add("forecast-icon");
            weatherIcon.src = `https://openweathermap.org/img/wn/${forecasts[i].weather.icon}@2x.png`
            div.appendChild(weatherIcon);
            
            const forecastTemperature = document.createElement("h4");
            forecastTemperature.innerText = `${Math.round(forecasts[i].temperature.temp)}\u00B0`;
            div.appendChild(forecastTemperature);

            const forecastWeather = document.createElement("p");
            forecastWeather.innerText = forecasts[i].weather.main;
            div.appendChild(forecastWeather);

            const forecastDataDiv = document.createElement("div");
            const rainDiv = document.createElement("div");
            rainDiv.classList.add("rain-container");
            const rainImg = document.createElement("img");
            rainImg.classList.add("rain");
            rainImg.src = rainIcon;
            const rain = document.createElement("p");
            rain.innerText = `${forecasts[i].pop*100}%`;
            rainDiv.appendChild(rainImg);
            rainDiv.appendChild(rain);
            forecastDataDiv.appendChild(rainDiv);
            
            const windDiv = document.createElement("div");
            windDiv.classList.add("wind-container");
            const windImg = document.createElement("img");
            windImg.classList.add("wind");
            windImg.src = windIcon;
            const wind = document.createElement("p");
            wind.innerText = `${Math.round(forecasts[i].wind.speed)} m/s`;
            windDiv.appendChild(windImg);
            windDiv.appendChild(wind);
            forecastDataDiv.appendChild(windDiv);

            div.appendChild(forecastDataDiv);
            dataDiv.appendChild(div);
        }

        content.appendChild(dataDiv);

        const timeDiv = document.createElement("div");
        timeDiv.classList.add("forecast-time");
        for(let i=0;i<5;i++){
            const forecastTime = forecasts[i].timestamp.split(" ")[4].split(":").slice(0,2);
            const time = document.createElement("p");
            time.innerText = forecastTime[0]+":"+forecastTime[1];
            timeDiv.appendChild(time);
        }
        
        content.appendChild(timeDiv);

        forecastContent.appendChild(content);
        
        return {heading1,currentContent,heading2,forecastContent};
    };

    const init = async () => {
        loadAnimation();
        const form = document.querySelector("#search");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            loadAnimation();
            const formdata = new FormData(event.target);
            const query = formdata.get("search-query");
            const data = await dataLoader.getCurrentForecast(query);
            stopAnimation();
            if(data.error){
                console.log("API down! Please Try Again");
            }
            else{
                const {heading,currentContent} = renderForecast(data.currentWeather, data.forecast);
                container.appendChild(heading);
                container.appendChild(currentContent);
            }
            form.reset();
        });
        // const data = await dataLoader.getCurrentForecast("New Delhi");

        const test = {
            timestamp: "Thu May 23 2024 20:30:00 GMT+0530 (India Standard Time) {}",
            city: "New Delhi",
            country: "IN",
            pop: 0.24,
            visibility: 10000,
            temperature: {
                feels_like: 31.48,
                grnd_level: 991,
                humidity: 80,
                pressure: 1003,
                sea_level: 1003,
                temp: 27.75,
                temp_kf: 0,
                temp_max: 27.75,
                temp_min: 27.75,
            },
            weather:{
                description: "overcast clouds",
                icon: "04n",
                id: 804,
                main: "Clouds",
            } ,
            wind:{
                deg: 220,
                gust: 4.27,
                speed: 2.78,
            },
        }

        const testForecast = [];
        for(let i=0;i<40;i++) testForecast.push(test);

        const {heading1,currentContent,heading2,forecastContent} = renderForecast(test, testForecast);
        
        stopAnimation();
        container.appendChild(heading1);
        container.appendChild(currentContent);
        container.appendChild(heading2);
        container.appendChild(forecastContent);
    }

    return {init};
})();

export default display;