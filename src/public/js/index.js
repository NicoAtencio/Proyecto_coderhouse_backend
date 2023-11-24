const socketClient = io();

const formulario = document.getElementById('formulario');
const contenedor = document.querySelector('.actualizar');
const formularioEliminar = document.getElementById('eliminar');

formulario.addEventListener('submit', (e) => {
    const imagen = formulario[7].value || '';
    const newProduct = {
        title: formulario[0].value,
        description: formulario[1].value,
        code: parseInt(formulario[2].value),
        price: parseInt(formulario[3].value),
        status: formulario[4].value,
        stock: parseInt(formulario[5].value),
        category: formulario[6].value,
        thumbnails: formulario[7].value
    };
    e.preventDefault();
    enviarDatos(newProduct);
    formulario.reset();
});

formularioEliminar.addEventListener('submit', (e) => {
    e.preventDefault();
    const id = formularioEliminar[0].value;
    fetch(`http://localhost:8080/api/products/${id}`,{
        method: "DELETE",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
    .then(res => res.json())
    .then(res=> console.log(res))
    .catch(err => console.log(err))
});


const enviarDatos = async (obj) => {
    await fetch("http://localhost:8080/api/products", {
        method:"POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
    .then(res => res.json())
    .then(res => {
        alert('Producto agregado con exito')
    })
    .catch(err => console.log(err))
}


socketClient.on('datos', datos => {
    contenedor.innerHTML = ''
    for (const dato of datos) {
        contenedor.innerHTML += `
        <div class = row>
            <div class = col>${dato._doc._id}</div>
            <div class = col>${dato._doc.title}</div>
            <div class = col>${dato._doc.description}</div>
            <div class = col>${dato._doc.price}</div>
            <div class = col>${dato._doc.stock}</div>
        </div>`
    }
});

socketClient.on('eliminar', datos => {
    contenedor.innerHTML = ''
    for (const dato of datos) {
        contenedor.innerHTML += `
        <div class = row>
            <div class = col>${dato._doc._id}</div>
            <div class = col>${dato._doc.title}</div>
            <div class = col>${dato._doc.description}</div>
            <div class = col>${dato._doc.price}</div>
            <div class = col>${dato._doc.category}</div>
        </div>`
    }
});