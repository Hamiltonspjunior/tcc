const express = require('express');
const multer = require('multer');
const multerConfig = require('./config/multer');

const routes = express.Router();

const BoxController = require('./controllers/BoxController');
const ExpedienteController = require('./controllers/ExpedienteController');

// Define uma rota
/*routes.post('/boxes', BoxController.store);
routes.get('/boxes/:id', BoxController.show);
routes.post(
    '/boxes/:id/files', 
    multer(multerConfig).single('file'),
    FileController.store
);*/

routes.get('/expediente/:name',ExpedienteController.show);
routes.post('/expediente',ExpedienteController.store);
routes.post('/expediente/:name',ExpedienteController.update)
module.exports = routes;