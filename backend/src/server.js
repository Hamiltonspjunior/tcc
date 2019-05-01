// importa o express para o nosso projeto. 
// O require acessa alguma depêndencia instalada na aplicação
const express = require('express');

// Importa a bibliotecaq mongoose, responsável por pormetir trabalhar
// com os dados do banco usando Js e não linguagem de banco
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket =>{
    socket.on('connectRoom', box =>{
        socket.join(box);
    });
});

mongoose.connect(
    'mongodb+srv://omnistack:omnistack@cluster0-re2z0.mongodb.net/omnistack?retryWrites=true', 
    { useNewUrlParser: true }
);

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

server.listen(443);