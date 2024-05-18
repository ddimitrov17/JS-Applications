function solve() {

    const infoBarReference = document.querySelector('#info span');
    const departButtonReference = document.getElementById('depart');
    const arriveButtonReference = document.getElementById('arrive');

    const url = "http://localhost:3030/jsonstore/bus/schedule/";
    const stop = {
        currentStop: "",
        nextStop: "depot"
    }

    async function depart() {
        try {
            const response = await fetch(url + stop.nextStop);
            const data = await response.json();
            stop.currentStop = data.name;
            stop.nextStop = data.next;
            infoBarReference.textContent = `Next stop ${stop.currentStop}`;
            departButtonReference.disabled = true;
            arriveButtonReference.disabled = false;   
        } catch (error) {
            infoBarReference.textContent=`Error`;
            departButtonReference.disabled=true;
            arriveButtonReference.disabled=true;
        }
    }

    function arrive() {
        infoBarReference.textContent = `Arriving at ${stop.currentStop}`;
        departButtonReference.disabled = false;
        arriveButtonReference.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();