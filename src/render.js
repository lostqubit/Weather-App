import dataLoader from './data.js';
import cityIcon from './icons/city.svg';
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

    const renderCurrentWeather = (currentWeather,currentPop,units) => {
        const wrapperDiv = document.createElement("div");
        wrapperDiv.classList.add("current-card");
        if(currentWeather.weather.main === "Thunderstorm"){
            wrapperDiv.style.backgroundImage = "url(https://images.unsplash.com/photo-1571951842145-f204944c5674?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
        }
        else if (currentWeather.weather.main === "Drizzle"){
            wrapperDiv.style.backgroundImage = "url(https://images.unsplash.com/photo-1654262306933-6a8df67b5c35?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
        }
        else if(currentWeather.weather.main === "Rain"){
            wrapperDiv.style.backgroundImage = "url(https://images.unsplash.com/photo-1498847559558-1e4b1a7f7a2f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
        }
        else if(currentWeather.weather.main === "Snow"){
            wrapperDiv.style.backgroundImage = "url(https://images.unsplash.com/photo-1457269449834-928af64c684d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
        }
        else if(currentWeather.weather.icon === "50d"){
            wrapperDiv.style.backgroundImage = "url(https://plus.unsplash.com/premium_photo-1669411924415-b951905f8943?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
        }
        else if(currentWeather.weather.icon === "50n"){
            wrapperDiv.style.backgroundImage = "url(https://images.unsplash.com/photo-1531124320343-0b7949580211?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
        }
        else if(currentWeather.weather.main === "Clear"){
            if(currentWeather.weather.icon[currentWeather.weather.icon.length-1]==="d"){
                wrapperDiv.style.backgroundImage = "url(https://images.unsplash.com/photo-1601297183305-6df142704ea2?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
            }
            else{
                wrapperDiv.style.backgroundImage = "url(https://images.unsplash.com/photo-1608356349386-74c5e961fd37?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
            }
        }
        else{
            if(currentWeather.weather.icon[currentWeather.weather.icon.length-1]==="d"){
                wrapperDiv.style.backgroundImage = "url(https://images.unsplash.com/photo-1626019866260-d9e0bb648634?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
            }
            else{
                wrapperDiv.style.backgroundImage = "url(https://images.unsplash.com/photo-1531124320343-0b7949580211?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)";
            }
        }

        const card = document.createElement("div");
        card.classList.add("card-contents");
        
        const div1 = document.createElement("div");
        const div2 = document.createElement("div");
        const h4 = document.createElement("h4");
        h4.innerText = "Current weather";
        const time = document.createElement("p");
        const currentTime = currentWeather.timestamp.split(" ");
        time.innerText = currentTime[1]+" "+currentTime[2];
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
        h1.innerText = Math.round(currentWeather.temperature.temp*100)/100;
        const h2 = document.createElement("h2");
        if(units==="metric"){
            h2.innerText = "\u00B0C";
        }
        else{
            h2.innerText = "\u00B0F";
        }
        const div5 = document.createElement("div");
        const weather = document.createElement("h3");
        weather.innerText = currentWeather.weather.main[0].toUpperCase() + currentWeather.weather.main.slice(1);
        const feelsLike = document.createElement("p");
        feelsLike.innerText = `Feels like ${Math.round(currentWeather.temperature.feels_like*100)/100}\u00B0`;
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
        if(units==="metric"){
            description.innerText += `. The Low will be ${Math.round(currentWeather.temperature.temp_min*100)/100}\u00B0C.`
        }
        else{
            description.innerText += `. The Low will be ${Math.round(currentWeather.temperature.temp_min*100)/100}\u00B0F.`
        }
        card.appendChild(description)

        const dataDiv = document.createElement("div");
        dataDiv.id = "data";

        const windSpeedDiv = document.createElement("div");
        const windSpeedHeading = document.createElement("h4")
        windSpeedHeading.innerText = "Wind"
        const windSpeed = document.createElement("p");
        if(units==="metric"){
            windSpeed.innerText = `${Math.round(currentWeather.wind.speed*100)/100} m/s`;
        }
        else{
            windSpeed.innerText = `${Math.round(currentWeather.wind.speed*100)/100} mph`;
        }
        windSpeedDiv.appendChild(windSpeedHeading);
        windSpeedDiv.appendChild(windSpeed);
        dataDiv.appendChild(windSpeedDiv);

        const humidityDiv = document.createElement("div");
        const humidityHeading = document.createElement("h4");
        humidityHeading.innerText = "Humidity";
        const humidity = document.createElement("p");
        humidity.innerText = `${Math.round(currentWeather.temperature.humidity)}%`;
        humidityDiv.appendChild(humidityHeading);
        humidityDiv.appendChild(humidity);
        dataDiv.appendChild(humidityDiv);

        const visibilityDiv = document.createElement("div");
        const visibilityHeading = document.createElement("h4");
        visibilityHeading.innerText = "Visibility";
        const visibility = document.createElement("p");
        visibility.innerText = `${Math.round(currentWeather.visibility/1000)} km`;
        visibilityDiv.appendChild(visibilityHeading);
        visibilityDiv.appendChild(visibility);
        dataDiv.appendChild(visibilityDiv);

        const pressureDiv = document.createElement("div");
        const pressureHeading = document.createElement("h4");
        pressureHeading.innerText = "Pressure";
        const pressure = document.createElement("p");
        pressure.innerText = `${Math.round(currentWeather.temperature.pressure)} mb`;
        pressureDiv.appendChild(pressureHeading);
        pressureDiv.appendChild(pressure);
        dataDiv.appendChild(pressureDiv);

        const popDiv = document.createElement("div");
        const popHeading = document.createElement("h4");
        popHeading.innerText = "Chance of rain";
        const pop = document.createElement("p");
        pop.innerText = `${Math.round(currentPop*100)}%`;
        popDiv.appendChild(popHeading);
        popDiv.appendChild(pop);
        dataDiv.appendChild(popDiv);

        card.appendChild(dataDiv);
        wrapperDiv.appendChild(card);

        return wrapperDiv;
    }

    const loadHourlyForecast = (dataDiv,timeDiv,forecasts,units) => {
        
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
            rain.innerText = `${Math.round(forecasts[i].pop*100)}%`;
            rainDiv.appendChild(rainImg);
            rainDiv.appendChild(rain);
            forecastDataDiv.appendChild(rainDiv);
            
            const windDiv = document.createElement("div");
            windDiv.classList.add("wind-container");
            const windImg = document.createElement("img");
            windImg.classList.add("wind");
            windImg.src = windIcon;
            const wind = document.createElement("p");
            if(units==="metric"){
                wind.innerText = `${Math.round(forecasts[i].wind.speed)} m/s`;
            }
            else{
                wind.innerText = `${Math.round(forecasts[i].wind.speed)} mph`;
            }
            windDiv.appendChild(windImg);
            windDiv.appendChild(wind);
            forecastDataDiv.appendChild(windDiv);

            div.appendChild(forecastDataDiv);
            dataDiv.appendChild(div);
        }

        for(let i=0;i<5;i++){
            const forecastTime = forecasts[i].timestamp.split(" ");
            const time = document.createElement("p");
            time.innerText = forecastTime[1]+" "+forecastTime[2];
            timeDiv.appendChild(time);
        }
    };

    const loadDailyForecast = (dataDiv,timeDiv,forecasts,units) => {
        for(let i=0;i<forecasts.length;i+=8){
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
            rain.innerText = `${Math.round(forecasts[i].pop*100)}%`;
            rainDiv.appendChild(rainImg);
            rainDiv.appendChild(rain);
            forecastDataDiv.appendChild(rainDiv);
            
            const windDiv = document.createElement("div");
            windDiv.classList.add("wind-container");
            const windImg = document.createElement("img");
            windImg.classList.add("wind");
            windImg.src = windIcon;
            const wind = document.createElement("p");
            if(units==="metric"){
                wind.innerText = `${Math.round(forecasts[i].wind.speed)} m/s`;
            }
            else{
                wind.innerText = `${Math.round(forecasts[i].wind.speed)} mph`;
            }
            windDiv.appendChild(windImg);
            windDiv.appendChild(wind);
            forecastDataDiv.appendChild(windDiv);

            div.appendChild(forecastDataDiv);
            dataDiv.appendChild(div);
        }

        for(let i=0;i<forecasts.length;i+=8){
            const time = document.createElement("p");
            time.innerText = forecasts[i].timestamp.split(" ")[0];
            timeDiv.appendChild(time);
        }
    };

    const renderForecast = (currentWeather, forecasts, units) => {
        const currentPop = forecasts[0].pop;

        const heading1 = document.createElement("h3");
        const cityImg = document.createElement("img");
        cityImg.src = cityIcon;
        heading1.appendChild(cityImg);
        const span = document.createElement("span");
        span.innerText = `${forecasts[0].city}, ${forecasts[0].country}`
        heading1.appendChild(span);

        const currentContent = renderCurrentWeather(currentWeather,currentPop,units);

        const forecastContent = document.createElement("div");
        forecastContent.classList.add("forecast-card");

        const content = document.createElement("div");
        content.id = "forecast-content";

        const nav = document.createElement("div");
        const navDiv = document.createElement("div");
        const hourlyTab = document.createElement("p");
        hourlyTab.innerText = "Hourly";
        const dailyTab = document.createElement("p");
        dailyTab.innerText = "Daily";
        navDiv.appendChild(hourlyTab);
        navDiv.appendChild(dailyTab);
        const navHeading = document.createElement("p");
        navHeading.innerText = "Forecast";
        nav.appendChild(navDiv);
        nav.appendChild(navHeading);
        content.appendChild(nav);

        const dataDiv = document.createElement("div");
        dataDiv.id = "forecast-data";

        const timeDiv = document.createElement("div");
        timeDiv.classList.add("forecast-time");
        
        loadHourlyForecast(dataDiv,timeDiv,forecasts,units);
        content.appendChild(dataDiv);
        content.appendChild(timeDiv);
        
        forecastContent.appendChild(content);

        hourlyTab.addEventListener("click", () => {
            hourlyTab.style.borderBottom = "2px solid white";
            dailyTab.style.borderBottom = "none";
            dataDiv.innerHTML = "";
            timeDiv.innerHTML = "";
            loadHourlyForecast(dataDiv,timeDiv,forecasts,units);
        });

        dailyTab.addEventListener("click", () => {
            dailyTab.style.borderBottom = "2px solid white";
            hourlyTab.style.borderBottom = "none";
            dataDiv.innerHTML = "";
            timeDiv.innerHTML = "";
            loadDailyForecast(dataDiv,timeDiv,forecasts,units);
        });
        
        return {heading1,currentContent,forecastContent};
    };

    const addReload = (query,units) => {
        const button = document.querySelector("#reload-btn");

        button.addEventListener("click", async () => {
            loadAnimation();
            const data = await dataLoader.getCurrentForecast(query,units);
            if(data===-1){
                stopAnimation();
                loadError("City not found! Please check spelling and try again with proper spacing");
            }
            else if(data===-2){
                stopAnimation();
                loadError("Something went wrong! Please try again.")
            }
            else if(data.error){
                stopAnimation();
                loadError("API down! Please Try Again");
            }
            else{
                const {heading1,currentContent,forecastContent} = renderForecast(data.currentWeather, data.forecast,units);
                stopAnimation();
                container.appendChild(heading1);
                container.appendChild(currentContent);
                container.appendChild(forecastContent);
            }
        });
    };

    const loadError = (errorStatement) => {
        const heading = document.createElement("h2");
        heading.classList.add("error");
        heading.innerText = errorStatement;
        container.appendChild(heading);
    };

    const init = async () => {
        loadAnimation();
        const cButton = document.querySelector("header>div:last-child>div:first-child");
        const fButton = document.querySelector("header>div:last-child>div:last-child");
        const form = document.querySelector("#search");
        let units = "metric";
        let searchQuery ="New Delhi";

        cButton.addEventListener("click", async () => {
            fButton.style.border = "none";
            cButton.style.border = "2px solid white";
            const location = document.querySelector("#content-body>h3:first-child");
            if(location){
                if(units==="imperial"){
                    loadAnimation();
                    units = "metric";
                    const data = await dataLoader.getCurrentForecast(searchQuery,units);
                    if(data===-1){
                        stopAnimation();
                        loadError("City not found! Please check spelling and try again with proper spacing.");
                    }
                    else if(data===-2){
                        stopAnimation();
                        loadError("Something went wrong! Please try again.")
                    }
                    else if(data.error){
                        stopAnimation();
                        loadError("API down! Please Try Again.");
                    }
                    else{
                        const {heading1,currentContent,forecastContent} = renderForecast(data.currentWeather, data.forecast, units);
                        stopAnimation();
                        container.appendChild(heading1);
                        container.appendChild(currentContent);
                        container.appendChild(forecastContent);
                        addReload(searchQuery,units);
                    }
                }
            }
            else units = "metric";
        });

        fButton.addEventListener("click", async () => {
            cButton.style.border = "none";
            fButton.style.border = "2px solid white";
            const location = document.querySelector("#content-body>h3:first-child");
            if(location){
                if(units==="metric"){
                    loadAnimation();
                    units = "imperial";
                    const data = await dataLoader.getCurrentForecast(searchQuery,units);
                    if(data===-1){
                        stopAnimation();
                        loadError("City not found! Please check spelling and try again with proper spacing.");
                    }
                    else if(data===-2){
                        stopAnimation();
                        loadError("Something went wrong! Please try again.")
                    }
                    else if(data.error){
                        stopAnimation();
                        loadError("API down! Please Try Again.");
                    }
                    else{
                        const {heading1,currentContent,forecastContent} = renderForecast(data.currentWeather, data.forecast, units);
                        stopAnimation();
                        container.appendChild(heading1);
                        container.appendChild(currentContent);
                        container.appendChild(forecastContent);
                        addReload(searchQuery,units);
                    }
                }
            }
            else units = "imperial";
        })

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            loadAnimation();
            const formdata = new FormData(event.target);
            const query = formdata.get("search-query");
            const data = await dataLoader.getCurrentForecast(query,units);
            searchQuery = query;
            if(data===-1){
                stopAnimation();
                loadError("City not found! Please check spelling and try again with proper spacing.");
            }
            else if(data===-2){
                stopAnimation();
                loadError("Something went wrong! Please try again.")
            }
            else if(data.error){
                stopAnimation();
                loadError("API down! Please Try Again.");
            }
            else{
                const {heading1,currentContent,forecastContent} = renderForecast(data.currentWeather, data.forecast,units);
                stopAnimation();
                container.appendChild(heading1);
                container.appendChild(currentContent);
                container.appendChild(forecastContent);
                addReload(searchQuery,units);
            }
            form.reset();
        });

        const data = await dataLoader.getCurrentForecast("New Delhi",units);
        
        if(data===-1){
            stopAnimation();
            loadError("City not found! Please check spelling and try again with proper spacing.");
        }
        else if(data===-2){
            stopAnimation();
            loadError("Something went wrong! Please try again.")
        }
        else if(data.error){
            stopAnimation();
            loadError("API down! Please Try Again.");
        }
        else{
            const {heading1,currentContent,forecastContent} = renderForecast(data.currentWeather, data.forecast,units);
            stopAnimation();
            container.appendChild(heading1);
            container.appendChild(currentContent);
            container.appendChild(forecastContent);
            addReload(searchQuery,units);
        }
    }

    return {init};
})();

export default display;