//function
function totalPrice(){
    const listPrice = document.querySelectorAll('#price')
    let total = 0
    for(let price of listPrice){
    
        let test = Number(price.textContent)
        total+=test
    }
    return total
}


fetch ('http://localhost:3000/cart/checkCart')
.then(response =>response.json())
.then(data =>  { 
    if(data.result){
        document.querySelector('#cart').innerHTML += `
            <div id="infoCart">
                <p>No tickets in your cart.</p>
                <p>Why not plan a trip?</p>
            </div>`
    }else{
        for (let cart of data.data) {
        document.querySelector('#cart').innerHTML += `
            <div class='trajet'>
                <div id ="departure"> ${cart.departure} </div>
                <div id='arrival'>${cart.arrival}</div>
                <div id="date">${moment(cart.date).format('HH:mm')} </div>
                <div id="price">${cart.price}</div>
                <button class="delete" id=${cart._id}>Delete</button>
            </div>
            `
        }
        document.querySelector('#cart').innerHTML += `
                <div id="cartList">
                    <div id="total">Total ${totalPrice()}</div>
                    <button class="purchase">Purchase</button>
                </div> `

        //Boutton delete
        const deleteButtons = document.querySelectorAll('.delete')
        for (const deleteCart of deleteButtons) {
            deleteCart.addEventListener('click', function(){
                fetch(`http://localhost:3000/cart/${this.id}`, {
                    method: 'DELETE',
                    })
                .then(response => response.json())
                .then(data => {                    
                    if(!data.error){
                    this.parentNode.remove();

                    }
                })
            })
        }

        //Boutton purchase
        const purchaseButton = document.querySelector('.purchase')
        purchaseButton.addEventListener('click', function(){

            const dateElement = document.querySelector('#date').textContent
            const parsedDate = moment(dateElement, 'HH:mm').toDate();

            const number = document.querySelector('#price').textContent
            const nb = Number(number)
            
            const entries = {
                departure: document.querySelector('#departure').textContent,
                arrival: document.querySelector('#arrival').textContent,
                date: parsedDate,
                price: nb,
            }
            fetch(`http://localhost:3000/booking/purchase`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entries),
            })
                .then(response => response.json())
                .then(data => {
                    if (data) {
                        window.location.assign('./booking.html')
                    }
                })
        
        })
    }
})
