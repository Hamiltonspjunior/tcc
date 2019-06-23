const express = require('express'); // Express para tratar rotas
const bodyParser = require('body-parser'); // Body parser para tratar os dados enviados e recebidos nas requisições

const app = express();

app.use(bodyParser.json()); // Tratar os dados como Json
app.use(bodyParser.urlencoded({ extended: true })); // Tratar dados encode passados via url

require('./controllers/authController')(app);
require('./controllers/projectController')(app);

app.listen(3000);