let hamburger = document.getElementById("hamburger");
let close = document.getElementById("close");
let navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", ()=>{
    navLinks.classList.toggle("active");
}); 
close.addEventListener("click", ()=>{
    navLinks.classList.remove("active");
}); 