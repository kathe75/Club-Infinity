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
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", cargarSolicitudes);

