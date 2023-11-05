const menu = document.querySelector("#menu")
const navbar = document.querySelector(".navbar")

if(menu){
menu.addEventListener("click", (e) =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
})
}