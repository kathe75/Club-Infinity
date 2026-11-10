require('dotenv').config();

const express = require('express');
const path = require('path');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3001;

// Conexión con MongoDB
const cliente = new MongoClient(process.env.MONGODB_URI);

let solicitudesCollection;

// Configuración para recibir datos
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mostrar las peticiones recibidas
app.use((req, res, next) => {
    console.log('PETICIÓN RECIBIDA:', req.method, req.url);
    next();
});

// Ruta para comprobar el servidor
app.get('/api/estado', (req, res) => {
    res.json({
        mensaje: 'API de Club Infinity funcionando correctamente'
    });
});

// Inicio de sesión del administrador
app.post('/api/login', (req, res) => {
    console.log('INTENTO DE INICIO DE SESIÓN:', req.body.usuario);

    const { usuario, clave } = req.body;

    if (
        usuario === 'admin@clubinfinity.com' &&
        clave === 'ClubInfinity2026'
    ) {
        return res.json({
            mensaje: 'Inicio de sesión correcto'
        });
    }

    return res.status(401).json({
        error: 'Correo o contraseña incorrectos'
    });
});

// Consultar solicitudes guardadas en MongoDB
app.get('/api/solicitudes', async (req, res) => {
    try {
        const solicitudes = await solicitudesCollection
            .find()
            .sort({ fecha: -1 })
            .toArray();

        res.json(solicitudes);

    } catch (error) {
        console.error('ERROR AL CONSULTAR:', error.message);

        res.status(500).json({
            error: 'No se pudieron consultar las solicitudes'
        });
    }
});

// Recibir y guardar solicitudes de contacto
app.post('/api/solicitudes', async (req, res) => {
    console.log('DATOS RECIBIDOS:', req.body);

    const { nombre, correo, servicio, mensaje } = req.body;

    if (!nombre || !correo || !servicio || !mensaje) {
        return res.status(400).json({
            error: 'Todos los campos son obligatorios'
        });
    }

    try {
        const nuevaSolicitud = {
            nombre: nombre.trim(),
            correo: correo.trim(),
            servicio,
            mensaje: mensaje.trim(),
            fecha: new Date()
        };

        const resultado = await solicitudesCollection.insertOne(
            nuevaSolicitud
        );

        console.log(
            'SOLICITUD GUARDADA EN MONGODB. ID:',
            resultado.insertedId
        );

        return res.status(201).json({
            mensaje: 'Solicitud guardada correctamente en MongoDB',
            id: resultado.insertedId
        });

    } catch (error) {
        console.error('ERROR AL GUARDAR:', error.message);

        return res.status(500).json({
            error: 'No se pudo guardar la solicitud en MongoDB'
        });
    }
});

// Mostrar la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Mostrar los archivos del proyecto
app.use(express.static(__dirname));

// Conectar a MongoDB e iniciar el servidor
async function iniciarServidor() {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error('No se encontró MONGODB_URI en el archivo .env');
        }

        console.log('Conectando con MongoDB Atlas...');

        await cliente.connect();

        const db = cliente.db('club_infinity');

        solicitudesCollection = db.collection('solicitudes');

        console.log('¡CONEXIÓN A MONGODB ATLAS EXITOSA!');

        app.listen(PORT, () => {
            console.log(
                `Club Infinity funcionando en http://localhost:${PORT}`
            );
        });

    } catch (error) {
        console.error('ERROR AL INICIAR EL SERVIDOR:', error.message);
        process.exit(1);
    }
}

iniciarServidor();






