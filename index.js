import API from "./config.js";
import {createCard} from './script.js';

const cityNameContainer = document.querySelector('.city-info')

const inputField = document.querySelector('#cityName');
inputField.addEventListener('keyup', async function(event) {
    if (event.code === "Enter") {
        if (document.getElementById('cityName').value.trim()) {
            clearContainer();
            const cityName = document.getElementById('cityName').value.trim();
            const data = await fetchApiData(cityName);
            cityNameContainer.textContent = data.location.name + ", " + data.location.country;
            await createCard(cityName, data);
        }
    } 
});

const inputButton = document.querySelector('#submit-search');
inputButton.addEventListener('click', async function() {
    clearContainer();
    const cityName = document.querySelector("#cityName").value;
    const data = await fetchApiData(cityName);
    cityNameContainer.textContent = data.location.name + ", " + data.location.country;
    createCard(cityName, data);
});

const fetchApiData = async (cityName) => {
    const weatherApi = "http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + encodeURIComponent(cityName) + "&days=7&aqi=no&alerts=no";
    try {
        const weatherApiInformation = await fetch(weatherApi);
        const weatherInformation = await weatherApiInformation.json();
        return weatherInformation;
    } catch (error) {
        console.error("Hey are you sure you are not holding up your map upside down?");
    }
}

const clearContainer = () => {
    const container = document.querySelector(".container");
    while (container.lastChild) {
        container.removeChild(container.lastChild);
}
}