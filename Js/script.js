const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");

let index = 0;

function cambiarImagen() {

    index++;

    if (index >= images.length) {
        index = 0;
    }

    slides.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(cambiarImagen, 4000);



/**Habitaciones*/

const habitaciones = [
    {
        titulo: "Habitación estándar",
        descripcion: "Una habitación cómoda y acogedora para una estadía agradable.",
        precio: "$120.000"
    },
    {
        titulo: "Habitación deluxe",
        descripcion: "Una habitación más amplia con mayor comodidad y excelentes servicios.",
        precio: "$180.000"
    },
    {
        titulo: "Suite premium",
        descripcion: "Una suite amplia y elegante, perfecta para una estadía especial.",
        precio: "$250.000"
    },
    {
        titulo: "V.I.P",
        descripcion: "Una habitacion con todos los lujos, amplia y elegante.",
        precio: "$350.000"
    }
];

function cambiarInfo(numero) {
    document.getElementById("titulo").textContent =
        habitaciones[numero].titulo;

    document.getElementById("descripcion").textContent =
        habitaciones[numero].descripcion;

    document.getElementById("precio").textContent =
        habitaciones[numero].precio;

    document.getElementById("precio").textContent =
        habitaciones[numero].precio;
}













function cambiarImagen(boton, direccion) {

    // Busca el slider donde está el botón
    const slider = boton.parentElement;

    // Busca todas las imágenes del slider
    const imagenes = slider.querySelectorAll("img");

    let imagenActual = 0;

    // Busca cuál imagen está activa
    imagenes.forEach((imagen, index) => {

        if (imagen.classList.contains("activa")) {
            imagenActual = index;
        }

        imagen.classList.remove("activa");

    });


    // Cambia la posición
    imagenActual += direccion;


    // Si llega al final vuelve al principio
    if (imagenActual >= imagenes.length) {
        imagenActual = 0;
    }


    // Si está al principio y retrocede va al final
    if (imagenActual < 0) {
        imagenActual = imagenes.length - 1;
    }


    // Muestra la nueva imagen
    imagenes[imagenActual].classList.add("activa");

}               
