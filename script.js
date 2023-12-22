const createCard = async (cityName, data) => {
    for(let i= 0; i < 3; i++) {
        const container = document.querySelector('.container');
        const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        const getDate = new Date()
        const dayOfTheWeek = weekdays[(getDate.getDay() + i) % 7]
    
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

export {createCard}; 