//si tu as qqchoise en bdd alorsq affiche le moi sinon affiche page par default

fetch ('http://localhost:3000/cart/checkCart')
.then(response =>response.json())
.then(data =>  {
    for (let cart of data.data) {
    document.querySelector('#cart').innerHTML += `
        <div class='trajet'>
            <div id ="departure"> ${cart.departure} </div>
            <div id='arrival'>${cart.arrival}</div>
            <div id="date">${cart.date} </div>
            <div id="price">${cart.price}</div>
            <button class="delete" id=${cart._id}>Delete</button>
        </div>
        `
    document.querySelector('#infoCart').style.display = 'none'
    }

    document.querySelector('#cart').innerHTML += `
    <div class = "zoneTotal">
            <div class = "total">Total: <span></span> </div>
           <button class="purchase">Purchase</button>
    </div>`
        const deleteButtons = document.querySelectorAll('.delete')
        for (const deleteCart of deleteButtons) {
            deleteCart.addEventListener('click', function(){

                // const cartElement = this.parentNode;
                
                // const departure = cartElement.querySelector('#departure').textContent.trim();
                // const arrival = cartElement.querySelector('#arrival').textContent.trim();
                // const date = cartElement.querySelector('#date').textContent.trim();
                // const price = cartElement.querySelector('#price').textContent.trim();
                console.log(this.id)
                fetch(`http://localhost:3000/cart/${this.id}`, {
                    method: 'DELETE',
                    // headers: { 'Content-Type': 'application/json' },
                    // body: JSON.stringify(cartDelete),
                 })
                .then(response => response.json())
                .then(data => {                    
                  if(!data.error){
                    this.parentNode.remove();
                    // window.location.assign('./booking.html') seulement quand on fait un purchase!!!
                  }
                }
            
                )
            })
        
        }
})

// const cartDelete= {
//     price : cart.querySelector('#price').textContent,
//     departure : cart.querySelector('#departure').textContent,
//     arrival : cart.querySelector('#arrival').textContent,
//     date : cart.querySelector('#date').textContent,
//     }