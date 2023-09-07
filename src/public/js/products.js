const botones = document.querySelectorAll(".agregar");


for (let i = 0; i < botones.length; i++){
    botones[i].addEventListener('click', () => {
        fetch(`/api/carts/64ef91de4bf28e34d7d2b91e/product/${botones[i].id}`,{
            method: 'PUT',
            body: JSON.stringify({}),
            headers : {"content-type" : "application/json; charset=UTF-8" }
        })
        .then((res) => res.json())
        .then((respuesta) => console.log(respuesta))
        .catch(err => console.log(err))
    })
}
