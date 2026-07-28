const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");

let index = 0;

function cambiarImagen(){
    index++;

    if(index >= images.length){
        index = 0;
    }

    slides.style.transform = `translateX(-${index * 100}%)`;
    slides.style.transition = "0.8s";
}

setInterval(cambiarImagen, 3000);