function entrarHotel() {

    const intro = document.getElementById("intro");

    if (intro) {
        intro.classList.add("ocultar");
    }

}


/* =========================================================
   INFORMACIÓN DE LAS HABITACIONES
========================================================= */

const habitaciones = [

    {
        titulo: "Habitación Sencilla",
        descripcion: "Una habitación cómoda y acogedora para una estadía agradable.",
        precio: "$180.000",
        fotos: [
            "IMG/Habitacion sencilla1.png",
            "IMG/Habitacion sencilla2.png",
            "IMG/Habitacion sencilla3.png"
        ]
    },

    {
        titulo: "Habitación deluxe",
        descripcion: "Una habitación más amplia con mayor comodidad y excelentes servicios.",
        precio: "$240.000",
        fotos: [
            "IMG/Hab deluxe1.png",
            "IMG/Hab deluxe2.png",
            "IMG/Hab deluxe3.png"
        ]
    },

    {
        titulo: "Suite",
        descripcion: "Una suite amplia y elegante, perfecta para una estadía especial.",
        precio: "$380.000",
        fotos: [
            "IMG/Hab suite1.png",
            "IMG/Hab suite2.png",
            "IMG/Hab suite 3.png"
        ]
    },

    {
        titulo: "V.I.P",
        descripcion: "Una habitación con todos los lujos, amplia y elegante.",
        precio: "$550.000",
        fotos: [
            "IMG/Hab vip1.png",
            "IMG/Hab vip2.png",
            "IMG/Hab vip3.png"
        ]
    }

];


let habitacionActual = 0;
let fotoActual = 0;


/* =========================================================
   CAMBIAR INFORMACIÓN DE HABITACIÓN
========================================================= */

function cambiarInfo(numero) {

    habitacionActual = numero;
    fotoActual = 0;

    const titulo = document.getElementById("titulo");
    const descripcion = document.getElementById("descripcion");
    const precio = document.getElementById("precio");

    if (titulo) {
        titulo.textContent = habitaciones[numero].titulo;
    }

    if (descripcion) {
        descripcion.textContent = habitaciones[numero].descripcion;
    }

    if (precio) {
        precio.textContent = habitaciones[numero].precio;
    }

    cambiarFoto();
}


/* =========================================================
   SLIDER DE LA HABITACIÓN
========================================================= */

function cambiarFoto() {

    const imagen = document.getElementById("sliderHabitacion");

    if (!imagen) return;

    imagen.src =
        habitaciones[habitacionActual].fotos[fotoActual];
}


/* FOTO ANTERIOR */

function fotoAnterior() {

    fotoActual--;

    if (fotoActual < 0) {
        fotoActual =
            habitaciones[habitacionActual].fotos.length - 1;
    }

    cambiarFoto();
}


/* FOTO SIGUIENTE */

function fotoSiguiente() {

    fotoActual++;

    if (
        fotoActual >=
        habitaciones[habitacionActual].fotos.length
    ) {
        fotoActual = 0;
    }

    cambiarFoto();
}


/* =========================================================
   RESERVA
========================================================= */

const CLAVE_RESERVA = "bacataReserva";


function guardarReserva(datos) {

    localStorage.setItem(
        CLAVE_RESERVA,
        JSON.stringify(datos)
    );

}


function leerReserva() {

    const guardado =
        localStorage.getItem(CLAVE_RESERVA);

    return guardado
        ? JSON.parse(guardado)
        : null;

}


/* =========================================================
   LLENAR FORMULARIOS DE RESERVA
========================================================= */

function llenarFormularioReserva(form, datos) {

    if (!form || !datos) return;

    const llegada =
        form.querySelector('[name="llegada"]');

    const salida =
        form.querySelector('[name="salida"]');

    const adultos =
        form.querySelector('[name="adultos"]');

    const ninos =
        form.querySelector('[name="ninos"]');

    const huespedes =
        form.querySelector('[name="huespedes"]');


    if (llegada) {
        llegada.value = datos.llegada || "";
    }

    if (salida) {
        salida.value = datos.salida || "";
    }

    if (adultos) {
        adultos.value = datos.adultos || 1;
    }

    if (ninos) {
        ninos.value = datos.ninos || 0;
    }

    if (huespedes) {

        const total =
            (Number(datos.adultos) || 1) +
            (Number(datos.ninos) || 0);

        huespedes.value = total;
    }

}


/* =========================================================
   BOTÓN RESERVAR
========================================================= */

function irReservas() {

    const formPrincipal =
        document.querySelector(".form-reserva");

    if (!formPrincipal) return;


    const llegada =
        formPrincipal.querySelector('[name="llegada"]');

    const salida =
        formPrincipal.querySelector('[name="salida"]');

    const adultos =
        formPrincipal.querySelector('[name="adultos"]');

    const ninos =
        formPrincipal.querySelector('[name="ninos"]');


    /* Comprobar campos obligatorios */

    if (
        !llegada.value ||
        !salida.value ||
        !adultos.value
    ) {

        formPrincipal.reportValidity();
        return;
    }


    /* Guardar información */

    const datos = {

        llegada: llegada.value,

        salida: salida.value,

        adultos: adultos.value,

        ninos: ninos.value || 0

    };


    guardarReserva(datos);


    /* Ir a Habitaciones */

    window.location.href =
        "templates/Habitaciones.html";

}


/* =========================================================
   SLIDER DE TARJETAS DE HABITACIONES
========================================================= */

function cambiarSlide(boton, direccion) {

    const slider = boton.parentElement;

    const imagenes =
        slider.querySelectorAll("img");

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


    imagenes[imagenActual]
        .classList.add("activa");


    actualizarPuntos(
        slider,
        imagenActual
    );

}


function irASlide(punto, indice) {

    const slider =
        punto.closest(".habitacion-slider");

    if (!slider) return;


    const imagenes =
        slider.querySelectorAll(
            ".slider-imagenes img"
        );


    imagenes.forEach(imagen => {
        imagen.classList.remove("activa");
    });


    if (imagenes[indice]) {

        imagenes[indice]
            .classList.add("activa");
    }


    actualizarPuntos(
        slider,
        indice
    );

}


function actualizarPuntos(slider, indiceActivo) {

    const puntos =
        slider.querySelectorAll(".punto");


    puntos.forEach((punto, i) => {

        punto.classList.toggle(
            "activo",
            i === indiceActivo
        );

    });

}


/* =========================================================
   MENÚ AL HACER SCROLL
========================================================= */

window.addEventListener("scroll", function () {

    const nav =
        document.querySelector("nav");

    if (!nav) return;


    if (window.scrollY > 50) {

        nav.classList.add("scrolled");

    } else {

        nav.classList.remove("scrolled");

    }

});


/* =========================================================
   RESERVAS AL CARGAR LA PÁGINA
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const datosGuardados =
            leerReserva();


        /* Rellenar todos los formularios */

        document
            .querySelectorAll(
                ".form-reserva, .reserva-mini"
            )
            .forEach(function (form) {

                llenarFormularioReserva(
                    form,
                    datosGuardados
                );

            });


        /* Formularios pequeños de reserva */

        document
            .querySelectorAll(".reserva-mini")
            .forEach(function (form) {

                form.addEventListener(
                    "submit",
                    function (evento) {

                        evento.preventDefault();


                        const llegada =
                            form.querySelector(
                                '[name="llegada"]'
                            ).value;


                        const salida =
                            form.querySelector(
                                '[name="salida"]'
                            ).value;


                        const huespedes =
                            form.querySelector(
                                '[name="huespedes"]'
                            ).value;


                        guardarReserva({

                            llegada: llegada,

                            salida: salida,

                            adultos: huespedes,

                            ninos: 0

                        });


                        alert(
                            "¡Reserva registrada! Nos pondremos en contacto para confirmar tu estadía."
                        );

                    }
                );

            });

    }
);


/* =========================================================
   SLIDER DE EVENTOS
========================================================= */

(function () {

    const slider =
        document.getElementById("eventos-slider");


    /* Si la página no tiene el slider, no hacer nada */

    if (!slider) return;


    const slides =
        slider.querySelectorAll(".slide");

    const dots =
        slider.querySelectorAll(".dot");

    const prevBtn =
        slider.querySelector(".arrow.prev");

    const nextBtn =
        slider.querySelector(".arrow.next");


    if (
        !slides.length ||
        !dots.length ||
        !prevBtn ||
        !nextBtn
    ) {
        return;
    }


    let current = 0;

    let autoplayInterval = null;

    const AUTOPLAY_MS = 6000;


    function goTo(index) {

        slides[current]
            .classList.remove("active");

        dots[current]
            .classList.remove("active");


        current =
            (index + slides.length) %
            slides.length;


        slides[current]
            .classList.add("active");

        dots[current]
            .classList.add("active");

    }


    function next() {
        goTo(current + 1);
    }


    function prev() {
        goTo(current - 1);
    }


    function stopAutoplay() {

        if (autoplayInterval) {

            clearInterval(
                autoplayInterval
            );

            autoplayInterval = null;
        }

    }


    function startAutoplay() {

        stopAutoplay();

        autoplayInterval =
            setInterval(
                next,
                AUTOPLAY_MS
            );

    }


    nextBtn.addEventListener(
        "click",
        function () {

            next();
            startAutoplay();

        }
    );


    prevBtn.addEventListener(
        "click",
        function () {

            prev();
            startAutoplay();

        }
    );


    dots.forEach(function (dot) {

        dot.addEventListener(
            "click",
            function () {

                goTo(
                    parseInt(
                        dot.dataset.index,
                        10
                    )
                );

                startAutoplay();

            }
        );

    });


    slider.addEventListener(
        "mouseenter",
        stopAutoplay
    );


    slider.addEventListener(
        "mouseleave",
        startAutoplay
    );


    startAutoplay();

})();