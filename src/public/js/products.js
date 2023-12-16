const botones = document.querySelectorAll(".agregar");
const btnRestar = document.querySelectorAll(".restar");

const btnpay = document.getElementById("pay");

const btnCarro = document.getElementById("compra");

const carrito = document.getElementById("carro");

const seccionesCarro = document.querySelector(".carro__secciones");

const botonesCarro = document.querySelectorAll(".botones-carro");

let idCart;
// Ahi del carro del cliente que se obtiene con un fetch

const funcionalidades = async () => {
  await fetch(`/api/session/current`, {
    method: "GET",
    headers: { "content-type": "application/json; charset=UTF-8" },
  })
    .then((res) => res.json())
    .then((respuesta) => {
      idCart = respuesta.cart._id;
    })
    .catch((err) => console.log(err));
  // El proposito es obtener el identificador del carro del cliente y asi modificarlo

  for (let i = 0; i < botones.length; i++) {
    botones[i].addEventListener("click", () => {
      const cargar = document.createElement("div");
      btnCarro.classList.add('fa-shake');
      agregrarCargador(i,cargar);
      fetch(`/api/carts/${idCart}/product/${botones[i].id}`, {
        method: "PUT",
        body: JSON.stringify({}),
        headers: { "content-type": "application/json; charset=UTF-8" },
      })
        .then((res) => res.json())
        .then((respuesta) => {
          Toastify({
            text: "Producto agregado al carro",
            duration: 2000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00aae4, #c5e2f6)",
              color: "#000",
            },
          }).showToast();
          btnCarro.classList.remove('fa-shake');
          obtenerCarro(idCart);
          quitarCargador(i,cargar)
        })
        .catch((err) => console.log(err));
    });
  }

  for (let i = 0; i < btnRestar.length; i++) {
    btnRestar[i].addEventListener("click", () => {
        const cargar = document.createElement("div");
        agregrarCargador(i,cargar);
        btnCarro.classList.add('fa-shake');
      fetch(
        `/api/carts/subtract/${idCart}/product/${btnRestar[i].id}`,
        {
          method: "PUT",
          body: JSON.stringify({}),
          headers: { "content-type": "application/json; charset=UTF-8" },
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (typeof res == "object" && !Array.isArray(res)) {
            Toastify({
              text: "Una unidad descontada.",
              duration: 2000,
              destination: "https://github.com/apvarun/toastify-js",
              newWindow: true,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "linear-gradient(to right, #df0011, #ff7b6a)",
                color: "#000",
              },
            }).showToast();
            quitarCargador(i,cargar);
          } else if (Array.isArray(res)) {
            Toastify({
              text: "Producto eliminado del carro",
              duration: 2000,
              destination: "https://github.com/apvarun/toastify-js",
              newWindow: true,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "right", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "linear-gradient(to right, #df0011, #ff7b6a)",
                color: "#000",
              },
            }).showToast();
            quitarCargador(i,cargar);
          } else {
            Toastify({
              text: "El producto no se encuentra en el carro.",
              duration: 2000,
              destination: "https://github.com/apvarun/toastify-js",
              newWindow: true,
              close: true,
              gravity: "top", // `top` or `bottom`
              position: "center", // `left`, `center` or `right`
              stopOnFocus: true, // Prevents dismissing of toast on hover
              style: {
                background: "linear-gradient(to right, #ffff00, #d7d350)",
                color: "#000",
              },
            }).showToast();
            quitarCargador(i,cargar)
          }
          obtenerCarro(idCart);
          btnCarro.classList.remove('fa-shake');
        })
        .catch((error) => console.log(error));
    });
  }

  obtenerCarro(idCart);
};

const obtenerCarro = async (id) => {
  await fetch(`/api/carts/${id}`)
    .then((res) => res.json())
    .then((res) => {
      seccionesCarro.innerHTML = "";
      for (let i = 0; i < res.cart.products.length; i++) {
        const div = document.createElement("div");
        div.classList.add("carro__secciones-divs");
        if(res.cart.products[i].product.thumbnails){
            div.innerHTML = `
                    <div class="nombre_producto">${res.cart.products[i].product.title}</div>
                    <img class="imagenes" src="./images/${res.cart.products[i].product.thumbnails}">
                    <div class="cantidad">Cantidad: ${res.cart.products[i].quantity}</div>`;
        }else{
            div.innerHTML = `
                    <div class="nombre_producto">${res.cart.products[i].product.title}</div>
                    <img class="imagenes" src="./images/sin_producto.png">
                    <div class="cantidad">Cantidad: ${res.cart.products[i].quantity}</div>`;
        };
        seccionesCarro.appendChild(div);
      }
    })
    .catch((err) => console.log(err));
};

funcionalidades();

btnpay.addEventListener("submit", (e) => {
  e.preventDefault();
  btnpay.innerHTML = `
    <div class="spinner-border text-secondary" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
    `
  fetch(`/api/carts/${idCart}/purchase`, {
    method: "GET",
    headers: { "content-type": "application/json; charset=UTF-8" },
  })
    .then((res) => res.json())
    .then((res) => (location.href = "/pay"))
    .catch((err) => console.log(err));
});

// Abrir carro de compra

btnCarro.addEventListener("click", () => {
  if (carrito.classList.contains("ocultar")) {
    carrito.classList.remove("ocultar");
    carrito.classList.add("mostrar");
  } else {
    carrito.classList.remove("mostrar");
    carrito.classList.add("ocultar");
  }
});

const agregrarCargador = (index,div) => {
  div.innerHTML = `
            <div class="spinner-border text-secondary" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>`;
  botonesCarro[index].children[0].classList.add("ocultar");
  botonesCarro[index].children[1].classList.add("ocultar");
  botonesCarro[index].appendChild(div);
};

const quitarCargador = (index,div) => {
    botonesCarro[index].removeChild(div);
    botonesCarro[index].children[0].classList.remove("ocultar");
    botonesCarro[index].children[1].classList.remove("ocultar");
}
