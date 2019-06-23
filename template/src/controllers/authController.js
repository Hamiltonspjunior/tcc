const express = require('express');

const User = require('../models/User');

const router = express.Router();

// Definição de rota para registro de usuário
router.post('/Register', async(req, res) => {
    const { email } = req.body;

    try {
        if(await User.findOne({ email }))
            return res.status(400).send({ error: 'User alredy exists' })

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({ user })
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' })
    }
});

module.exports = app => app.use('/auth', router);