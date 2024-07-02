
/////////URL fetch///////////////////////////////////////////////////////////
//const url = 'http://localhost:3000'
/////////SIGNUP//////////////////////////////////////////////////////////////
document.querySelector('#search').addEventListener('click', function () {
    const entries = {
        departure: document.querySelector('#departure').value,
        arrival: document.querySelector('#arrival').value,
        date: document.querySelector('#date').value,
    }

    fetch(`${url}/searchTrip`, {
        // method: 'POST',
        // headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify(entries),
    })
        .then(response => response.json())
        .then(data => {
            if (data.result) {

                document.querySelector('#imgReponse').style.display = 'none'
                document.querySelector('#textReponse').style.display = 'none'

                document.querySelector('zoneDeReponse').innerHTML += `
                    <div class='trajet'>
                         <div> ${data.departure}> ${data.arrival}</div>
                        <div>${data.date}</div>
                          <div>${data.prix}</div>
                          <button id="book">Book</button>
                    </div>
                    `
            } else {
                document.querySelector('#imgReponse').src = '/frontend_ticketshacks/images/notfound.png'
                document.querySelector('#textReponse').textContent = 'No trip found.'
            }
        });
});

////////////////test
// document.querySelector('#search').addEventListener('mouseover', function () {
//     document.querySelector('#imgReponse').src = '/frontend_ticketshacks/images/notfound.png'
//     document.querySelector('#textReponse').textContent = 'No trip found.'
// })

// document.querySelector('#search').addEventListener('mouseover', function () {
//     document.querySelector('#imgReponse').style.display = 'none'
//     document.querySelector('#textReponse').style.display = 'none'
// })



document.querySelector('#search').addEventListener('mouseover', function () {
    const date = document.querySelector('#date').value
    console.log(date)

})


console.log('ttertertert')