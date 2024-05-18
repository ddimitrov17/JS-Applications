async function attachEvents() {
    const getWeatherButton = document.getElementById('submit');
    getWeatherButton.addEventListener('click', getWeather);
    const url = 'http://localhost:3030/jsonstore/forecaster/locations';
    const forecastDiv = document.getElementById('forecast');
    const currentDiv = document.getElementById('current');
    const upcomingDiv = document.getElementById('upcoming');
    async function getWeather(e) {
        try {
            const locationInput = document.getElementById('location').value; // Move inside try block
            console.log('Location input:', locationInput); // Log input value for debugging
            const response = await fetch(url);
            const data = await response.json();
            let currentLocation = data.find(l => l.name === locationInput);
            forecastDiv.style.display = 'block';
            await todayForecast(currentLocation.code);
            await threeDayForecast(currentLocation.code);
        } catch (error) {
            forecastDiv.textContent = 'Error';
        }
    }
    async function todayForecast(code) {
        const todayUrl = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
        const res = await fetch(todayUrl);
        const todayData = await res.json(); // {name: , forecast: {low: , high: , condition: }}
        let forecastsDiv=document.createElement('div');
        currentDiv.appendChild(forecastsDiv);
        let conditionSymbolSpan=document.createElement('span');
        conditionSymbolSpan.classList.add('symbol');
        forecastsDiv.appendChild(conditionSymbolSpan);
        switch (todayData.forecast.condition) {
            case "Sunny": conditionSymbolSpan.innerHTML=`&#x2600`; break;
            case "Partly sunny": conditionSymbolSpan.innerHTML='&#x26C5'; break;
            case "Overcast": conditionSymbolSpan.innerHTML='&#x2601'; break;
            case "Rain": conditionSymbolSpan.innerHTML='&#x2614'; break;
            case "Degrees": conditionSymbolSpan.innerHTML='&#176'; break;
        }
        let conditionSpan=document.createElement('span');
        forecastsDiv.appendChild(conditionSpan);
        conditionSpan.classList.add('condition');
        for (i=0;i<3;i++) {
            let currentSpan=document.createElement('span');
            currentSpan.classList.add('forecast-data');
            conditionSpan.appendChild(currentSpan);
        }
        conditionSpan.children[0].textContent=todayData.name;
        conditionSpan.children[1].textContent=`${todayData.forecast.low}\xB0/${todayData.forecast.high}\xB0`;
        conditionSpan.children[2].textContent=todayData.forecast.condition;
    }
    async function threeDayForecast(code) {
        const threeDayUrl = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;
        const resp = await fetch(threeDayUrl);
        const threeDayData = await resp.json(); // []
        const forecastInfoDiv=document.createElement('div');
        forecastInfoDiv.classList.add('forecast-info');
        upcomingDiv.appendChild(forecastInfoDiv);
        for (j=0;j<3;j++) {
            let upcomingSpan=document.createElement('span');
            upcomingSpan.classList.add('upcoming');
            forecastInfoDiv.appendChild(upcomingSpan);
            let symbolSpan=document.createElement('span');
            symbolSpan.classList.add('symbol');
            switch (threeDayData.forecast[j].condition) {
                case "Sunny": symbolSpan.innerHTML=`&#x2600`; break;
                case "Partly sunny": symbolSpan.innerHTML='&#x26C5'; break;
                case "Overcast": symbolSpan.innerHTML='&#x2601'; break;
                case "Rain": symbolSpan.innerHTML='&#x2614'; break;
                case "Degrees": symbolSpan.innerHTML='&#176'; break;
            }
            upcomingSpan.appendChild(symbolSpan);
            let firstDataSpan=document.createElement('span');
            firstDataSpan.classList.add('forecast-data');
            firstDataSpan.innerHTML=`${threeDayData.forecast[j].low}\xB0/${threeDayData.forecast[j].high}\xB0`;
            upcomingSpan.appendChild(firstDataSpan);
            let secondDataSpan=document.createElement('span');
            secondDataSpan.classList.add('forecast-data');
            secondDataSpan.innerHTML=`${threeDayData.forecast[j].condition}`;
            upcomingSpan.appendChild(secondDataSpan);
        }
    }
}

attachEvents();