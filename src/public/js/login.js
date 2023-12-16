const btnLogin = document.querySelector(".login");
const cargar = document.querySelector(".cargar");
const btnGitHub = document.getElementById("git-hub");

btnLogin.addEventListener('click', () => {
    cargar.classList.remove("ocultar")
});

btnGitHub.addEventListener('click', () => {
    cargar.classList.remove("ocultar");
});