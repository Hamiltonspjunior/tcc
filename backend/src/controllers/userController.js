const express = require('express');
const authMiddleware = require('../middlewares/auth');

const User = require('../models/user');

const router = express.Router();

// Utiliza o middleware pq a rota precisa ser autenticada
router.use(authMiddleware);

// Listar todos os usuários
router.get('/', async (req, res) => {
    try {
        const user = await User.find();
        console.log(req.userId);
        return res.send({ user: user });

    } catch (err) {
        return res.status(400).send({ error: 'Error loading markings-' });
    }
});

router.get('/user', async (req, res) => {
    try {
        const user = await User.find({ _id: req.userId });
        console.log(req.userId);
        return res.send({ user: user });

    } catch (err) {
        return res.status(400).send({ error: 'Error loading markings-' });
    }
});

module.exports = app => app.use('/users', router);