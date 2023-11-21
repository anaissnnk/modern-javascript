import API from "./config.js";

const inputButton = document.querySelector('#submit-search');
const inputField = document.querySelector('#cityName');
const cityNameContainer = document.querySelector('.city-info')
//const weekdaysAltDisplay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// add eventlistener to input field
inputField.addEventListener('keyup', async function(event) {
    if (event.code === "Enter") {
        // check if the value of the input field is not empty
        if (document.getElementById('cityName').value.trim()) {
            const cityName = document.getElementById('cityName').value.trim();
            const data = await fetchApiData(cityName);
            //console.log(data);
            // Display the location in the browser as "City, Country"
            cityNameContainer.textContent = data.location.name + ", " + data.location.country;
            createCards(cityName);
            clearContainer();
        }
    } 
});

// add eventlistener to button
inputButton.addEventListener('click', async function() {
    const cityName = document.querySelector("#cityName").value;
    const data = await fetchApiData(cityName);
    cityNameContainer.textContent = data.location.name + ", " + data.location.country;
    createCards(cityName);
    clearContainer();
});

//anais fetch data
async function fetchApiData(cityName) {
    const weatherApi = "http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + encodeURIComponent(cityName) + "&days=7&aqi=no&alerts=no";
    try {
        const weatherApiInformation = await fetch(weatherApi);
        const weatherInformation = await weatherApiInformation.json();
        return weatherInformation;
    } catch (error) {
        return console.log("Hey are you sure you are not holding up your map upside down?");
    }
}

//anais clear container
function clearContainer() {
    const container = document.querySelector(".container");
    while (container.lastChild) {
        container.removeChild(container.lastChild);
}
}

//anais create card
async function createCards(cityName) {
    const data = await fetchApiData(cityName);
    console.log(data);
    for(let i= 0; i < 5; i++) {
        const container = document.querySelector('.container');
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const date = new Date()
        const dayOfTheWeek = weekdays[(date.getDay() + i) % 7]
    
        // Create the elements with Data
        const card = document.createElement('div');
        card.classList.add("card");
    
        if (i === 0) card.classList.add("main-card");
    
        container.appendChild(card);
    
        const imageBox = document.createElement('div');
        imageBox.classList.add("imgBx");
        card.appendChild(imageBox);
    
        const cardImg = document.createElement('img');
        cardImg.src = data.forecast.forecastday[i].day.condition.icon;
        imageBox.appendChild(cardImg);
        
        const contentBox = document.createElement("div");
        contentBox.classList.add("contentBx");
        card.appendChild(contentBox);
    
        const cardHeader = document.createElement("h2");
        cardHeader.innerHTML = dayOfTheWeek;
        contentBox.appendChild(cardHeader);
    
        console.log(data.forecast.forecastday[i].day.condition.text);
        const tempDescription = document.createElement("h4");
        tempDescription.innerHTML = data.forecast.forecastday[i].day.condition.text;
        contentBox.appendChild(tempDescription);
    
        const currentTempBox = document.createElement("div");
        currentTempBox.classList.add("color");
        contentBox.appendChild(currentTempBox)
    
        const currentTempHeader = document.createElement("h3");
        currentTempHeader.innerHTML = "Temp:"
        currentTempBox.appendChild(currentTempHeader);
    
        const currentTemp = document.createElement("span");
        currentTemp.classList.add("current-temp");

        currentTemp.innerHTML = data.forecast.forecastday[i].day.avgtemp_c + "°C";
        currentTempBox.appendChild(currentTemp);
    
        const minMaxTemperatures = document.createElement("div");
        minMaxTemperatures.classList.add("details");
        contentBox.appendChild(minMaxTemperatures);
    
        const minMaxTempHeader = document.createElement("h3");
        minMaxTempHeader.innerHTML = "More:"
        minMaxTemperatures.appendChild(minMaxTempHeader);
    
        const minTemp = document.createElement("span");
        minTemp.classList.add("min-temp")
        minTemp.innerHTML = data.forecast.forecastday[i].day.mintemp_c  + "°C";
        minMaxTemperatures.appendChild(minTemp);
    
        const maxTemp = document.createElement("span");
        maxTemp.classList.add("max-temp")
        maxTemp.innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "°C";
        minMaxTemperatures.appendChild(maxTemp);
    }
}

//TODO: alert message when error
//TODO: check for variables global vs local