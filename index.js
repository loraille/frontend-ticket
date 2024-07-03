document.querySelector('#search').addEventListener('click', function () {
    document.querySelector('#zoneDeReponse').innerHTML = '';
    const entries = {
        departure: document.querySelector('#departureZ').value,
        arrival: document.querySelector('#arrivalZ').value,
        date: document.querySelector('#dateZ').value,
    }

    if (entries.departure === "" || entries.arrival === "" || entries.date === "") {
        document.querySelector('#imgReponse').src = "./images/notfound.png"
        document.querySelector('#textReponse').textContent = 'No trip found.'
    } else {
        fetch(`http://localhost:3000/searchTrip`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entries),
        })
            .then(response => response.json())
            .then(data => {
                for (let trajet of data.trips) {
                    document.querySelector('#zoneDeReponse').innerHTML += `
                        <div class='trajet'>
                            <div id ="departure"> ${trajet.departure} </div>
                            <div id='arrival'>${trajet.arrival}</div>
                            <div id="date">${moment(trajet.date).format('HH:mm')} </div>
                            <div id="price">${trajet.price}</div>
                            <button class="book">Book</button>
                        </div>`

                    //Boutton pour ajouter à cart
                    const bookButtons = document.querySelectorAll('.book')
                    for (const button of bookButtons) {
                        button.addEventListener('click', function () {
                            const trip = this.parentNode
                           
                            const dateElement = trip.querySelector('#date').textContent;
                            const parsedDate = moment(dateElement, 'HH:mm').toDate();
                            const tripTest = {
                                price: trip.querySelector('#price').textContent,
                                departure: trip.querySelector('#departure').textContent,
                                arrival: trip.querySelector('#arrival').textContent,
                                date: parsedDate,
                            }
                            fetch(`http://localhost:3000/cart/cartTrip`, {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify(tripTest),
                            })
                                .then(response => response.json())
                                .then(data => {
                                    if (data) {
                                        window.location.assign('./cart.html')
                                    }
                                }

                                )
                        })
                    }
                }
            })  
            document.querySelector('#imgReponse').style.display = 'none'
            document.querySelector('#textReponse').style.display = 'none'
        }
    })

    

// moment(element.trip.date).fromNow('HH::MM')
//trajet.date.substr(11, 5)
    




