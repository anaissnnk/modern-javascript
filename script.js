import API from "./config.js";

const inputButton = document.querySelector('#submit-search');
const inputField = document.querySelector('#cityName');
const cityNameContainer = document.querySelector('.city-info')
const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const weekdaysAltDisplay = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// add eventlistener to input field
inputField.addEventListener('keyup', function(event) {
    if (event.code === "Enter") {

        // check if the value of the input field is not empty
    if (document.getElementById('cityName').value.trim()) {
        const cityName = document.getElementById('cityName').value.trim();
        fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + encodeURIComponent(cityName) + "&days=7&aqi=no&alerts=no")
        .then(response => response.json())
        .then(data => {

            // Check if data is received
            console.log(data)
            // check if the data is not giving back an error
            if(data.error) {
                return alert("Hey are you sure you are not holding up your map upside down?")
            } else {
                // continue with the code if there are no errors
                const container = document.querySelector(".container");
                // Remove existing children if there are any in the <element class="container">
                while (container.lastChild) {
                    container.removeChild(container.lastChild);
                };
        
                // Display the location in the browser as "City, Country"
                cityNameContainer.textContent = data.location.name + ", " + data.location.country;

                // Create cards for each days (first 5 days) of the week.
                // if I want to have 7 days, I just need to augment the number in the loop condition from 5 to 7
                for(let i= 0; i < 5; i++) {

                    // get the container again for add the cards
                    const div = document.querySelector('.container');

                    // d = date
                    const date = new Date()
                    // console.log(weekdays[(d.getDay() + i) % 7])
                    const dateOfWeek = weekdays[(date.getDay() + i) % 7]
                
                    // Create the elements with Data
                    const card = document.createElement('div');
                    card.classList.add("card");
                    
                    // if it's the first element (index === 0), add a second class: "main-card" for unique styling
                    if (i === 0) card.classList.add("main-card");
                
                    div.appendChild(card);
                
                    const initialContentBeforeSlideAnimation = document.createElement('div');
                    initialContentBeforeSlideAnimation.classList.add("imgBx");
                    card.appendChild(initialContentBeforeSlideAnimation);
                    

                    const cardImg = document.createElement('img');
                    cardImg.src = data.forecast.forecastday[i].day.condition.icon;
                    cardImg.alt = "Icon describing the following weather: " + data.forecast.forecastday[i].day.condition.text;
                    initialContentBeforeSlideAnimation.appendChild(cardImg);



                    
                    const contentBox = document.createElement("div");
                    contentBox.classList.add("contentBx");
                    card.appendChild(contentBox);
                
                    const dateOfWeekContentBeforeSliderAnimation = document.createElement("h2");
                    dateOfWeekContentBeforeSliderAnimation.innerHTML = dateOfWeek;
                    contentBox.appendChild(dateOfWeekContentBeforeSliderAnimation);
                
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
                
                    const currentT = document.createElement("span");
                    currentT.classList.add("current-temp");

                    // OLD structure from different API
                    // let averageTemp = (result.daily.temperature_2m_min[i] + result.daily.temperature_2m_max[i]) / 2;
                    // if(i === 0) averageTemp = result.current.temperature_2m;

                // NEW structure:
                currentT.innerHTML = data.forecast.forecastday[i].day.avgtemp_c + "°C";
                currentTempBox.appendChild(currentT);
            
                const minMax = document.createElement("div");
                minMax.classList.add("details");
                contentBox.appendChild(minMax);
            
                const minMaxTempHeader = document.createElement("h3");
                minMaxTempHeader.innerHTML = "More:"
                minMax.appendChild(minMaxTempHeader);
            
                const minT = document.createElement("span");
                minT.classList.add("min-temp")
                minT.innerHTML = data.forecast.forecastday[i].day.mintemp_c  + "°C";
                minMax.appendChild(minT);
            
                const maxT = document.createElement("span");
                maxT.classList.add("max-temp")
                maxT.innerHTML = data.forecast.forecastday[i].day.maxtemp_c + "°C";
                minMax.appendChild(maxT);
                }
            }
        }).catch(err => {
            //not working
            // alert("Hey are you sure you are not holding up your map upside down?")
        })
    }
    }
})

// add eventlistener to button
inputButton.addEventListener('click', function() {
    const cityName = document.querySelector("#cityName").value;
    console.log("clicked")
    fetch("http://api.weatherapi.com/v1/forecast.json?key=" + API.key + "&q=" + cityName + "&days=7&aqi=no&alerts=no")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if(data.error) {
            return alert("Hey are you sure you are not holding up your map upside down?")
            console.log("check if code stops")
        } else {
            const container = document.querySelector(".container");
            while (container.lastChild) {
                container.removeChild(container.lastChild);
            };

            container.innerHTML = ""
            // container.children.forEach(child => {
            //     container.remove(child);
            // })
            
            cityNameContainer.textContent = data.location.name + ", " + data.location.country;

            for(let i= 0; i < 5; i++) {
                const container = document.querySelector('.container');

                const date = new Date()
                // console.log(weekdays[(date.getDay() + i) % 7])
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

                // OLD structure from different API
                // let averageTemp = (result.daily.temperature_2m_min[i] + result.daily.temperature_2m_max[i]) / 2;
                // if(i === 0) averageTemp = result.current.temperature_2m;
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
    })
    .catch(err => {
        //not working
        // alert("Hey are you sure you are not holding up your map upside down?")
    })
})