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
            <button class="delete">Delete</button>
        </div>`

    }
    document.querySelector('#infoCart').style.display = 'none'
})

// function suppress(deletes) {
//     for (let item of deletes) {
//         item.addEventListener('click', function () {
//             const remove = this.parentNode.remove()//suppression affichage
               
//             //on retire le document de la collection carts
//             //fetch deleteOne