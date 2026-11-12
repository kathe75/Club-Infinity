window.addEventListener("DOMContentLoaded", () => {
    if (sessionStorage.getItem("adminAutenticado") === "true") {
        mostrarPanel();
    }
});

function mostrarPanel() {
    document.getElementById("seccion-login").style.display = "none";
    document.getElementById("seccion-panel").style.display = "block";
    cargarSolicitudes();
}

async function realizarLogin(event) {
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

        if (respuesta.ok) {
            sessionStorage.setItem("adminAutenticado", "true");
            mostrarPanel();
        } else {
            mensaje.textContent = datos.error || "Correo o contraseña incorrectos";
        }

    } catch (error) {
        mensaje.textContent = "Error al conectar con el servidor";
        console.error(error);
    }
}

async function cargarSolicitudes() {
    const lista = document.getElementById("lista-solicitudes");

    try {
        const respuesta = await fetch("/api/solicitudes");

        if (!respuesta.ok) {
            throw new Error("No se pudieron cargar las solicitudes.");
        }

        const solicitudes = await respuesta.json();

        lista.innerHTML = "";

        if (solicitudes.length === 0) {
            lista.textContent = "No hay solicitudes registradas.";
            return;
        }

        solicitudes.forEach((solicitud) => {
            const tarjeta = document.createElement("div");
            tarjeta.className = "tarjeta-solicitud";

            tarjeta.innerHTML = `
                <h3>${solicitud.nombre}</h3>
                <p><strong>Correo:</strong> ${solicitud.correo}</p>
                <p><strong>Servicio:</strong> ${solicitud.servicio}</p>
                <p><strong>Mensaje:</strong> ${solicitud.mensaje}</p>
            `;

            lista.appendChild(tarjeta);
        });

    } catch (error) {
        lista.textContent = error.message;
        console.error("ERROR DEL PANEL:", error);
    }
}

function cerrarSesion() {
    
    sessionStorage.removeItem("adminAutenticado");
    window.location.href = "index.html";
}