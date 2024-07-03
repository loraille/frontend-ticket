document.querySelector('#search').addEventListener('click', function () {
    const entries = {
        departure: document.querySelector('#departure').value,
        arrival: document.querySelector('#arrival').value,
        date: document.querySelector('#date').value,
    }
   

    if (entries.departure === "" || entries.arrival === "" || entries.date === "") {
        console.log('test')
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
                    <div id='${trajet.id}' class='trajet'>
                    <div> ${trajet.departure}> ${trajet.arrival}</div>
                    <div>${trajet.date.substr(11, 5)}</div>
                    <div id="price">${trajet.price}</div>
                    <button id="book">Book</button>
                </div>`
                }  
        })
    }
        document.querySelector('#imgReponse').style.display = 'none'
        document.querySelector('#textReponse').style.display = 'none'

        
    }
)

// document.querySelectorAll('#book').addEventListener('click', function(){
//     // 1) window.location.assign('./cart.html')
//     //2) rentrer infos dans bdd cart 
//     fetch(`http://localhost:3000/cartTrip`,{
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(),
//     })
//     .then(response => response.json())
//     .then(

//     )
//     // for (let item of trajets) {
//     //         const id = this.parentNode.id//recupère l'id du parent
//     //         console.log('test')
//     //     })
//     })



    