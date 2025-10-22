const express = require('express');
const UserController = require('../controllers/UserController');
const ImageController = require('../controllers/ImageController');

const router = express.Router();

// Rutas de usuarios
router.get('/users', UserController.fetchUsers);
router.get('/users/:id', UserController.getUserById);

// Rutas para descargar imágenes
router.post('/users/:id/download-image', ImageController.downloadUserImage);
router.post('/users/download-multiple', ImageController.downloadMultipleImages);
router.get('/downloads', ImageController.listDownloadedImages);
router.get('/downloads/:fileName', ImageController.serveDownloadedImage);

module.exports = router;