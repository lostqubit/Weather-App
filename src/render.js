import dataLoader from './data.js';

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

    const init = async () => {
        loadAnimation();
        const form = document.querySelector("#search");
        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formdata = new FormData(event.target);
            const query = formdata.get("search-query");
            const data = await dataLoader.getCurrentForecast(query);
            if(data.error){
                console.log("API down! Please Try Again");
            }
            else{
                const forecasts = data.forecast;
                console.log(forecasts);
            }
        });
        // const coordinates = await dataLoader.getCurrentForecast("New Delhi");
        // console.log(coordinates);
        stopAnimation();
    }

    const renderForecast = () => {

    };

    return {init};
})();

export default display;