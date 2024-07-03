const euroSymbol = '\u20AC'

fetch('http://localhost:3000/booking/checkBooking')
    .then(response => response.json())
    .then(data => {
        if (data.result) {
            document.querySelector('#booking').innerHTML += `
             <div id="infoCart">
                 <p>No tickets in your cart.</p>
                 <p>Why not plan a trip?</p>
             </div>`
        } else {
            console.log('test')
            for (let booking of data.data) {
                document.querySelector('#booking').innerHTML += `
            <div class='trajet'>
                <div id ="departure"> ${booking.departure} </div>
                <div id='arrival'>${booking.arrival}</div>
                <div id="date"><span>departure in </span>${moment(booking.date).fromNow('HH:mm')} </div>
                <div id="price">${booking.price}<span>${euroSymbol}</span></div>
            </div>
            `
            }
        }
    })

