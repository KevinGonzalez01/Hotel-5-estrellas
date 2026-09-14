/* =========================================================
   SLIDER DEL HERO (imagen grande de fondo, se autorota)
========================================================= */

const slidesHero = document.querySelector(".slides");
const imagenesHero = document.querySelectorAll(".slides img");

let indiceHero = 0;

function avanzarSlideHero() {

    if (!slidesHero || imagenesHero.length === 0) return;

    indiceHero++;

    if (indiceHero >= imagenesHero.length) {
        indiceHero = 0;
    }

    slidesHero.style.transform = `translateX(-${indiceHero * 100}%)`;
}

setInterval(avanzarSlideHero, 4000);



/* =========================================================
   FICHA DE HABITACIÓN (sección "fotos" de Index.html)
========================================================= */

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
}



/* =========================================================
   SLIDER DE CADA TARJETA DE HABITACIÓN (flechas y puntos)
========================================================= */

function cambiarSlide(boton, direccion) {

    const slider = boton.parentElement;
    const imagenes = slider.querySelectorAll("img");

    let imagenActual = 0;

    imagenes.forEach((imagen, index) => {

        if (imagen.classList.contains("activa")) {
            imagenActual = index;
        }

        imagen.classList.remove("activa");
    });

    imagenActual += direccion;

    if (imagenActual >= imagenes.length) {
        imagenActual = 0;
    }

    if (imagenActual < 0) {
        imagenActual = imagenes.length - 1;
    }

    imagenes[imagenActual].classList.add("activa");

    actualizarPuntos(slider, imagenActual);
}


function irASlide(punto, indice) {

    const slider = punto.closest(".habitacion-slider");

    if (!slider) return;

    const imagenes = slider.querySelectorAll(".slider-imagenes img");

    imagenes.forEach((imagen) => imagen.classList.remove("activa"));

    if (imagenes[indice]) {
        imagenes[indice].classList.add("activa");
    }

    actualizarPuntos(slider, indice);
}


function actualizarPuntos(slider, indiceActivo) {

    const contenedorSlider = slider.closest(".habitacion-slider");

    if (!contenedorSlider) return;

    const puntos = contenedorSlider.querySelectorAll(".punto");

    puntos.forEach((punto, i) => {
        punto.classList.toggle("activo", i === indiceActivo);
    });
}



/* =========================================================
   MENÚ: sombra/fondo al hacer scroll
========================================================= */

window.addEventListener("scroll", function () {

    const nav = document.querySelector("nav");

    if (!nav) return;

    if (window.scrollY > 50) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }

});



/* =========================================================
   RESERVA: guardar los datos del formulario principal
   (Index) y mostrarlos en todos los formularios de reserva
   de la página (incluidos los de cada habitación)
========================================================= */

const CLAVE_RESERVA = "bacataReserva";

function guardarReserva(datos) {
    localStorage.setItem(CLAVE_RESERVA, JSON.stringify(datos));
}

function leerReserva() {
    const guardado = localStorage.getItem(CLAVE_RESERVA);
    return guardado ? JSON.parse(guardado) : null;
}

function llenarFormularioReserva(form, datos) {

    if (!datos) return;

    const llegada = form.querySelector('[name="llegada"]');
    const salida = form.querySelector('[name="salida"]');
    const adultos = form.querySelector('[name="adultos"]');
    const ninos = form.querySelector('[name="ninos"]');
    const huespedes = form.querySelector('[name="huespedes"]');

    if (llegada) llegada.value = datos.llegada || "";
    if (salida) salida.value = datos.salida || "";
    if (adultos) adultos.value = datos.adultos || 1;
    if (ninos) ninos.value = datos.ninos || 0;

    if (huespedes) {
        const total = (Number(datos.adultos) || 1) + (Number(datos.ninos) || 0);
        huespedes.value = total;
    }
}

document.addEventListener("DOMContentLoaded", function () {

    const datosGuardados = leerReserva();

    document.querySelectorAll(".form-reserva, .reserva-mini").forEach(function (form) {
        llenarFormularioReserva(form, datosGuardados);
    });

    const formPrincipal = document.querySelector(".form-reserva");

    if (formPrincipal) {

        formPrincipal.addEventListener("submit", function (evento) {

            evento.preventDefault();

            const datos = {
                llegada: formPrincipal.querySelector('[name="llegada"]').value,
                salida: formPrincipal.querySelector('[name="salida"]').value,
                adultos: formPrincipal.querySelector('[name="adultos"]').value,
                ninos: formPrincipal.querySelector('[name="ninos"]').value
            };

            guardarReserva(datos);

            const yaEnHabitaciones = window.location.pathname
                .toLowerCase()
                .endsWith("habitaciones.html");

            if (yaEnHabitaciones) {
                document.querySelectorAll(".reserva-mini").forEach(function (form) {
                    llenarFormularioReserva(form, datos);
                });
            } else {
                window.location.href = "Habitaciones.html";
            }

        });
    }

    document.querySelectorAll(".reserva-mini").forEach(function (form) {

        form.addEventListener("submit", function (evento) {

            evento.preventDefault();

            const llegada = form.querySelector('[name="llegada"]').value;
            const salida = form.querySelector('[name="salida"]').value;
            const huespedes = form.querySelector('[name="huespedes"]').value;

            guardarReserva({
                llegada: llegada,
                salida: salida,
                adultos: huespedes,
                ninos: 0
            });

            alert("¡Reserva registrada! Nos pondremos en contacto para confirmar tu estadía.");
        });
    });

});