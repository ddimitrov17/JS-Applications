async function getInfo() {
    const busesReference = document.getElementById('buses');
    let stopId = document.getElementById('stopId').value;
    const stopNameReference = document.getElementById('stopName');
    stopNameReference.value='';
    busesReference.innerHTML='';
    try {
        const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;
        const response = await fetch(url);
        const data = await response.json();
        stopNameReference.textContent = data.name;
        listItemCreating(data);
    } catch (error) {
        stopNameReference.textContent = 'Error';
    }
    function listItemCreating(data) {
        let timeAndBuses = Object.entries(data.buses);
        for (let [bus, time] of timeAndBuses) {
            let currentLi = document.createElement('li');
            currentLi.textContent = `Bus ${bus} arrives in ${time} minutes`;
            busesReference.appendChild(currentLi);
        }
    }
}
