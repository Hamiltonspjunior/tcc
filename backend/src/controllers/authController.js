const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth')

const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}) {
    return token = jwt.sign(params, authConfig.secret, {
        expiresIn: 86400, // Tempo de expiração do token: 1 dia
    })
}

// Rota de registro de usuário
router.post('/Register', async(req, res) => {
    const { email } = req.body;

    try {
        if(await User.findOne({ email }))
            return res.status(400).send({ error: 'User alredy exists' })

        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id })
        })

    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' })
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    // Busca um usuário pelo email
    const user = await User.findOne({ email }).select('+password');

    // Verifica se o usuário não foi encontrado
    if(!user) {
        return res.status(400).send({ error: 'User not found' });
    }

    // Verifica se a senha do login e a senha do banco não batem
    if(!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid password' });

    user.password = undefined;

    res.send({ 
        user, 
        token: generateToken({ id: user.id }),
    });
});

module.exports = app => app.use('/auth', router);