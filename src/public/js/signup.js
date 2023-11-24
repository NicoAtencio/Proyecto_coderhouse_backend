console.log('Hola desde JS');


const formulario = document.getElementById('formulario');
// console.log(formulario);

formulario.addEventListener('submit',(e) => {
    e.preventDefault();
    const newUser = {
        first_name: formulario[0].value,
        last_name: formulario[1].value,
        user_name: formulario[2].value,
        password: formulario[3].value,
        age: formulario[4].value,
        email: formulario[5].value
    }
    createdUser(newUser);
});

const createdUser = async (user) => {
    await fetch('http://localhost:8080/api/users/signup', {
        method: 'POST',
        body: JSON.stringify(user),
        headers : {"content-type" : "application/json; charset=UTF-8" }
    })
    .then(res => res.json())
    .then(res => window.location.href = `/login?username=${user.user_name}`)
    .catch(err => console.log(err))
}