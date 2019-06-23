// importa o express para o nosso projeto. 
// O require acessa alguma depêndencia instalada na aplicação
const express = require('express');
const bodyParser = require('body-parser'); // Body parser para tratar os dados enviados e recebidos nas requisições

// Importa a bibliotecaq mongoose, responsável por pormetir trabalhar
// com os dados do banco usando Js e não linguagem de banco
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Tratar os dados como Json
app.use(bodyParser.urlencoded({ extended: true })); // Tratar dados encode passados via url

require('./controllers/authController')(app);
require('./controllers/projectController')(app);

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket =>{
    socket.on('connectRoom', box =>{
        socket.join(box);
    });
});

app.use((req, res, next) => {
    req.io = io;

    return next();
});

// Trabalhar com dados Json
app.use(express.json());
// Trabalhar com envio de arquivos
app.use(express.urlencoded( { extended: true } ));
app.use('/files', express.static(path.resolve(__dirname, '..', 'temp')))


// Importa o arquivo routes separado
app.use(require('./routes'));

server.listen(8000);