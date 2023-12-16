const socketClient = io();
const contenedor = document.getElementById("contenedor__usuarios");
const formularioRole = document.getElementById("formulario_role");
const formularioEliminar = document.getElementById("formulario_eliminar");

// Buscar y mostrar en pantallas todos los usuarios.
const allUsers = () => {
  fetch("/api/users")
    .then((res) => res.json())
    .then((res) => {
      res.users.forEach((user) => {
        contenedor.innerHTML += `
            <div class="row">
                <div class="col">
                    ${user.id}
                </div>
                <div class="col">
                    ${user.name}
                </div>
                <div class="col">
                    ${user.email}
                </div>
                <div class="col">
                    ${user.age}
                </div>
                <div class="col">
                    ${user.role}
                </div>
            </div>`;
      });
    })
    .catch((err) => console.log(err));
};

allUsers();

// Elimina un usuario
formularioEliminar.addEventListener("click", (e) => {
  e.preventDefault();
  const uid = formularioEliminar[0].value;
  fetch(`/api/users/${uid}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      formularioEliminar.reset();
    })
    .catch((err) => console.log(err));
});

// Modificar el role de un usuario.
formularioRole.addEventListener("submit", (e) => {
  e.preventDefault();
  const obj = {
    id: formularioRole[0].value,
    role: formularioRole[1].value,
  };
  fetch("/api/users/changerole", {
    method: "PUT",
    body: JSON.stringify(obj),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      formularioRole.reset();
    })
    .catch((err) => console.log(err));
});

// Recibe los usuarios al modificar uno y los vuelve a imprimir en pantalla actualizados.
socketClient.on("users", (res) => {
  contenedor.innerHTML = `
    <div class="row">

      <div class="col">ID</div>
      <div class="col">Name</div>
      <div class="col">Email</div>
      <div class="col">Age</div>
      <div class="col">Role</div>

    </div>`;
  res.forEach((user) => {
    contenedor.innerHTML += `
      <div class="row">
          <div class="col">
              ${user.id}
          </div>
          <div class="col">
              ${user.name}
          </div>
          <div class="col">
              ${user.email}
          </div>
          <div class="col">
              ${user.age}
          </div>
          <div class="col">
              ${user.role}
          </div>
      </div>`;
  });
});
