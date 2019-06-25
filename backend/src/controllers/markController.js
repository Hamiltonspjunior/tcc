const express = require('express');

const Mark = require('../models/mark');

const router = express.Router();

// Rota de registro de usuário
router.post('/mark', async(req, res) => {
    //const { email } = req.body;

    try {
        const mark = await Mark.create(req.body);

        return res.send({ mark })

    } catch (err) {
        return res.status(400).send({ error: 'Erro!' })
    }
});

module.exports = app => app.use('/', router);