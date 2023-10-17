

const botones = document.querySelectorAll(".agregar");

const btnpay = document.getElementById("pay")

let idCart;

fetch(`http://localhost:8080/api/session/current`,{
    method: 'GET',
    headers : {"content-type" : "application/json; charset=UTF-8" }
})
.then((res) => res.json())
.then((respuesta) => {
    idCart = respuesta.cart._id;
    console.log(idCart)
})
.catch(err => console.log(err))
// El proposito es obtener el identificador del carro del cliente y asi modificarlo

for (let i = 0; i < botones.length; i++){
    botones[i].addEventListener('click', () => {
        fetch(`/api/carts/${idCart}/product/${botones[i].id}`,{
            method: 'PUT',
            body: JSON.stringify({}),
            headers : {"content-type" : "application/json; charset=UTF-8" }
        })
        .then((res) => res.json())
        .then((respuesta) => console.log(respuesta))
        .catch(err => console.log(err))
    })
};


btnpay.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/api/carts/${idCart}/purchase`, {
        method: 'GET',
        headers : {"content-type" : "application/json; charset=UTF-8" }
    })
    .then((res) => res.json())
    .then((res) => window.location.href = '/pay')
    .catch(err => console.log(err))
})


