document.querySelector('#search').addEventListener('click', function () {
    const entries = {
        departure: document.querySelector('#departure').value,
        arrival: document.querySelector('#arrival').value,
        date: document.querySelector('#date').value,
    }

    if (entries.departure === "" || entries.arrival === "" || entries.date === "") {
        document.querySelector('#imgReponse').src = './images/notfound.png'
        document.querySelector('#textReponse').textContent = 'No trip found.'
    } else {
        fetch(`http://localhost:3000/searchTrip`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entries),
        })
        .then(response => response.json())
        .then(data => {
            data.trips.forEach(trip =>{
                let date = trip.date
                date = moment(date).format('HH:mm'); 
                document.querySelector('#zoneDeReponse').innerHTML += `
                        <div class='trajet'>
                            <div> ${trip.departure} > ${trip.arrival}</div>
                            <div>${date}</div>
                            <div>${trip.price}</div>
                            <button id="book">Book</button>
                        </div> `
            
        })
    })
        document.querySelector('#imgReponse').style.display = 'none'
        document.querySelector('#textReponse').style.display = 'none'
    }
})

    