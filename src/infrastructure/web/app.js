const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware para parsear JSON
app.use(bodyParser.json());

// Habilitar CORS
app.use(cors());

// Servir archivos estáticos desde downloads
app.use('/downloads', express.static(path.join(__dirname, '../../../downloads')));

// Rutas del API
app.use('/api', userRoutes);

module.exports = app;