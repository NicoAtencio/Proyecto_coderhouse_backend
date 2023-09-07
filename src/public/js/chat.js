const socketClient = io();

const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = formulario[0].value;
    const message = formulario[1].value;
    fetch(`http://localhost:8080/api/chats/64f0f89bcccc069ea5c3eb38`, {
        method: 'POST',
        body: JSON.stringify({
            user,
            message
        }),
        headers : {"content-type" : "application/json; charset=UTF-8" }
    })
})

const respuesta = document.getElementById('respuestas');


socketClient.on('allMessages', (messages) => {
    respuesta.innerHTML = '';
    messages.forEach(element => {
        respuesta.innerHTML += `<p>${element.user}: ${element.message}</p>`
    });
})