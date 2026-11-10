function mostrarServicio(servicio) {
    const mensaje = document.getElementById("mensaje-servicio");

    if (servicio === "tenis") {
        mensaje.textContent =
            "Tenemos clases de tenis para diferentes niveles Contamos con canchas de polvo de ladrillo pista dura azul y césped Ofrecemos clases para diferentes niveles entrenamientos y torneos.";
    }

    else if (servicio === "idiomas") {
        mensaje.textContent =
            "Aprende más de 20 idiomas, como inglés,francés, italiano, portugués, alemán,japonés y chino mandarín.Tenemos cursos para diferentes niveles";
    }

    else if (servicio === "fitness") {
        mensaje.textContent =
            "Disfruta de gimnasio, piscina, jacuzzi,entrenamiento personalizado,boxeo y clases de combate bailado.";
    }
}
function responderIA(opcion) {
    const respuesta = document.getElementById("respuesta");

    if (opcion === "tenis") {
        respuesta.textContent =
            "Te recomendamos nuestras clases de tenis. Puedes comenzar desde el nivel básico.";
    }

    else if (opcion === "idiomas") {
        respuesta.textContent =
            "Puedes comenzar con nuestros cursos de idiomas y practicar poco a poco.";
    }

    else if (opcion === "fitness") {
        respuesta.textContent =
            "Fitness puede ayudarte a mantenerte activo y mejorar tu condición física.";
    }
}
function preguntar() {
    const pregunta = document.getElementById("pregunta").value.toLowerCase();
    const respuesta = document.getElementById("respuesta");

    if (pregunta.trim() === "") {
        respuesta.textContent = "Por favor, escribe la palabra.";
    }

    else if (pregunta.includes("tenis")) {
        respuesta.textContent =
            "En Club Infinity Te recomendamos las clases de tenis de Club Infinity.Podrás aprender a jugar,mejorar tus habilidades y divertirte haciendo deporte.";
    }

    else if (pregunta.includes("idioma") || pregunta.includes("inglés")) {
        respuesta.textContent =
            "Te recomendamos nuestros cursos de idiomas. Podrás aprender inglés, frances, aleman, mas de 20 idiomas para comunicarte mejor y tener nuevas oportunidades.";
    }

    else if (pregunta.includes("fitness") || pregunta.includes("ejercicio")) {
        respuesta.textContent =
            "Te recomendamos nuestras actividades de fitness.Podrás mantenerte activo, mejorar tu condición física y cuidar tu bienestar.";
    }

    else {
        respuesta.textContent =
            "Puedo orientarte sobre tenis, idiomas y fitness. ¿Cuál te interesa?";
    }

    document.getElementById("pregunta").value = "";
}
async function enviarFormulario(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const correo = document.getElementById("correo").value;
    const servicio = document.getElementById("servicio-contacto").value;
    const mensaje = document.getElementById("mensaje-contacto").value;

    const resultado = document.getElementById("resultado-formulario");

    try {
        const respuesta = await fetch('/api/solicitudes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nombre,
                correo,
                servicio,
                mensaje
            })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(datos.error || 'Error al enviar');
        }

        resultado.textContent =
            'Gracias, ' + nombre + '. Tu solicitud fue recibida correctamente.';

        resultado.style.color = 'green';

        event.target.reset();

    } catch (error) {
        resultado.textContent =
            'No se pudo enviar la solicitud. Inténtalo nuevamente.';

        resultado.style.color = 'red';

        console.error(error);
    }
}
async function iniciarSesion(event) {
    console.log("SE EJECUTÓ LA FUNCIÓN DE INICIO DE SESIÓN");
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const clave = document.getElementById("clave").value;
    const mensaje = document.getElementById("mensaje-login");

    try {
        const respuesta = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ usuario, clave })
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            throw new Error(datos.error || "Datos incorrectos");
        }

        window.location.href = "/admin.html";

    } catch (error) {
        mensaje.textContent = error.message;
    }
}
console.log("SCRIPT.JS SE CARGÓ CORRECTAMENTE");



